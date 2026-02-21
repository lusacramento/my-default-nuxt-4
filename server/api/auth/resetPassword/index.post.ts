import { useSecurity } from "~/composables/domain/security";
import { useValidations } from "~/composables/domain/validations";
import { UserSchema } from "~~/server/models/user.schema";
import { Messages } from "~~/types/enums/Messages";

export default defineEventHandler(async (event) => {
  const { token, password, repeatPassword } = await readBody(event);

  try {
    if (!token && !password && !repeatPassword)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.BLANK_FORM,
      });

    if (!token)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.ID_NOT_PROVIDER,
      });

    if (!password)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.PASSWORD_NOT_PROVIDER,
      });

    if (!repeatPassword)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.REPEAT_PASSWORD_NOT_PROVIDER,
      });

    // Fields verification

    if (!useValidations().password(password))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_PASSWORD_FORMAT,
      });

    if (!useValidations().areEqualsTwoStrings(password, repeatPassword))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NOT_EQUALS_PASSWORDS,
      });

    const { decoded, error } = useSecurity().decodeToken(
      token,
      useRuntimeConfig().secret
    );

    if (error && error?.name !== "TokenExpiredError")
      throw createError({
        statusCode: 400,
        statusMessage: "Bad credentials",
        message: Messages.INVALID_CREDENTIALS,
      });

    if(error?.name === "TokenExpiredError") throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.EXPIRED_TOKEN,
      });

    const payload = decoded as {email: string}

    const user = await UserSchema.findOne({email: payload.email});

    if (!user)
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: Messages.NOT_REGISTERED_EMAIL,
      });

    const newPayload = {
      id: user._id as unknown as string,
      email: user.email,
      password: password,
    };
    const newToken = await useSecurity().createUserToken(
      newPayload,
      useRuntimeConfig().secret
    );

    await UserSchema.findByIdAndUpdate(user._id, {
      token: newToken,
      rescueToken: "",
    });
    return {
      token: token,
      message: Messages.UPDATED_PASSWORD,
    };
  } catch (error) {
    return { error };
  }
});

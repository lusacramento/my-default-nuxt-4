import { useSecurity } from "~/composables/domain/security";
import { useValidations } from "~/composables/domain/validations";
import { UserSchema } from "~~/server/models/user.schema";
import { Messages } from "~~/types/enums/Messages";

export default defineEventHandler(async (event) => {
  const { token } = await getQuery(event);
  try {
    if (!token)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.TOKEN_NOT_PROVIDER,
      });

    const { error, decoded } = useSecurity().decodeToken(
      token as string,
      useRuntimeConfig().secret
    );

    if (error && error?.name !== "TokenExpiredError")
      throw createError({
        statusCode: 400,
        statusMessage: "Bad credentials",
        message: Messages.INVALID_CREDENTIALS,
      });

    if (error?.name === "TokenExpiredError")
      throw createError({
        statusCode: 400,
        statusMessage: "Bad credentials",
        message: Messages.EXPIRED_TOKEN,
      });

    const payload = decoded as { email: string };

    if (!useValidations().email(payload.email))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad credentials",
        message: Messages.INCOMPATIBLE_EMAIL_FORMAT,
      });

    const user = await UserSchema.findOne({email: payload.email})
    
    if(!user) throw createError({
        statusCode: 400,
        statusMessage: "Bad credentials",
        message: Messages.ERROR_TOKEN,
      });

      setResponseStatus(event, 200, 'OK')
    return {
      message: Messages.VALIDATED_TOKEN_RESET_PASSWORD
    }

  } catch (error) {
    return { error };
  }

  return "Hello Nitro";
});

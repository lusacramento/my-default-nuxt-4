import type { User } from "~~/types/User";
import { UserSchema } from "~~/server/models/user.schema";
import { useValidations } from "~/composables/domain/validations";
import { Messages } from "~~/types/enums/Messages";
import { useSecurity } from "~/composables/domain/security";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  try {
    // Payload verification
    if(!email && !password) 
       throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.BLANK_FORM,
      });

    if (!email)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.EMAIL_NOT_PROVIDER,
      });

    if (!password)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.PASSWORD_NOT_PROVIDER,
      });

    // Fields verification
    if (!useValidations().email(email))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_EMAIL_FORMAT,
      });

    if (!useValidations().password(password))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_PASSWORD_FORMAT,
      });

    // Get user
    const user = (await UserSchema.findOne({ email: email })) as User;

    if (!user)
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: Messages.NOT_REGISTERED_EMAIL,
      });

    if (!user.isVerified)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NOT_REGISTER_CONFIRM,
      });

    // Token verification
    const { decoded } = useSecurity().decodeToken(
      user.token as string,
      useRuntimeConfig().secret
    );  

    // Password verification
    const payload = decoded as { password: string };
    if(! payload || payload.password !== password)
      throw createError({
        statusCode: 401,
        statusMessage: "Bad credentials",
        message: Messages.INVALID_CREDENTIALS,
      });

    // update token
    const token = await useSecurity().createUserToken(
      { id: user._id as unknown as string, email: email, password: password },
      useRuntimeConfig().secret
    );

    await UserSchema.findByIdAndUpdate(user._id, {
      token: token,
    });

    // start a session
    await useSecurity().setSession(event, user._id as unknown as string, token);

    return {
      message: Messages.SUCESS_LOGIN,
      token: token,
    };
    
  } catch (error) {
    return { error };
  }
});

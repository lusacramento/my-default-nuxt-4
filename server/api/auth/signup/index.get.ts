import { useSecurity } from "~/composables/domain/security";
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

    // Token verification
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

       if(error?.name === "TokenExpiredError") throw createError({
        statusCode: 400,
        statusMessage: "Bad credentials",
        message: Messages.EXPIRED_TOKEN,
      });

    const payload = decoded as { id: string };

    const user = await UserSchema.findById(payload.id);

    if(!user)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INVALID_CREDENTIALS,
      });

    if (user && !user.isVerified) {
      await UserSchema.findByIdAndUpdate(user._id, {
        isVerified: true,
      });

    }
      sendRedirect(event, `/entrar?email=${user.email}&eVerificado=true`);
      return;
      
  } catch (error) {
    return error;
  }
});

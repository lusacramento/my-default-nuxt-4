import { useSecurity } from "~/composables/domain/security";
import type { UserDTO } from "~~/types/UserDTO";
import type { User } from "~~/types/User";
import { useValidations } from "~/composables/domain/validations";
import { UserSchema } from "~~/server/models/user.schema";
import { Messages } from "~~/types/enums/Messages";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const user = (await readBody(event)) as UserDTO;

  try {
    // Payload verification
    if (!user)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.BLANK_FORM,
      });

    if (!user.name)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NAME_NOT_PROVIDER,
      });

    if (!user.email)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.EMAIL_NOT_PROVIDER,
      });

    if (!user.password)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.PASSWORD_NOT_PROVIDER,
      });

    if (!user.repeatPassword)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.REPEAT_PASSWORD_NOT_PROVIDER,
      });

    // Fields verification
    if (!useValidations().isMoreTwoCaracters(user.name))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: `O nome ${Messages.MORE_2_CHARS}`,
      });

    if (!useValidations().email(user.email))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_EMAIL_FORMAT,
      });

    if (!useValidations().password(user.password))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_PASSWORD_FORMAT,
      });

    if (
      !useValidations().areEqualsTwoStrings(user.password, user.repeatPassword)
    )
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NOT_EQUALS_PASSWORDS,
      });

    // user verification
    const isAlreadyUser = await UserSchema.exists({ name: user.name });
    if (isAlreadyUser)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NAME_ALREADY_EXISTS,
      });

    const isAlreadyEmail = await UserSchema.exists({ email: user.email });
    if (isAlreadyEmail)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.EMAIL_ALREADY_REGISTER,
      });

    // Post user
    const ObjectId = mongoose.Types.ObjectId;
    const id = new ObjectId();
    const newUser = {
      _id: id,
      name: user.name,
      email: user.email,
      token: await useSecurity().createUserToken(
        {
          id: id as unknown as string,
          email: user.email,
          password: user.password,
        },
        useRuntimeConfig().secret
      ),
    } as User;

    await UserSchema.create(newUser);

    return {
      message: Messages.SUCCESS_REGISTERED_USER,
      token: newUser.token,
    };
  } catch (error) {
    return error;
  }
});

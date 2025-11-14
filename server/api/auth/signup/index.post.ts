import { useConfirmRegister } from "~/composables/mail/confirmRegister";
import { useSecurity } from "~/composables/domain/security";
import type { UserDTO } from "~~/types/UserDTO";
import type { User } from "~~/types/User";
import { useValidations } from "~/composables/domain/validations";
import { UserSchema } from "~~/server/models/user.schema";
import { Messages } from "~~/types/enums/Messages";
import mongoose from "mongoose";
import { createTransport } from "nodemailer";

export default defineEventHandler(async (event) => {
  const userDTO = (await readBody(event)) as UserDTO;

  try {
    // Payload verification
    if (!userDTO)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.BLANK_FORM,
      });

    if (!userDTO.name)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NAME_NOT_PROVIDER,
      });

    if (!userDTO.email)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.EMAIL_NOT_PROVIDER,
      });

    if (!userDTO.password)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.PASSWORD_NOT_PROVIDER,
      });

    if (!userDTO.repeatPassword)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.REPEAT_PASSWORD_NOT_PROVIDER,
      });

    // Fields verification
    if (!useValidations().isMoreTwoCaracters(userDTO.name))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: `O nome ${Messages.MORE_2_CHARS}`,
      });

    if (!useValidations().email(userDTO.email))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_EMAIL_FORMAT,
      });

    if (!useValidations().password(userDTO.password))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_PASSWORD_FORMAT,
      });

    if (
      !useValidations().areEqualsTwoStrings(
        userDTO.password,
        userDTO.repeatPassword
      )
    )
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NOT_EQUALS_PASSWORDS,
      });

    // user verification
    const isAlreadyUser = await UserSchema.exists({ name: userDTO.name });
    if (isAlreadyUser)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.NAME_ALREADY_EXISTS,
      });

    const isAlreadyEmail = await UserSchema.exists({ email: userDTO.email });
    if (isAlreadyEmail)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.EMAIL_ALREADY_REGISTER,
      });

    // Post user
    const ObjectId = mongoose.Types.ObjectId;
    const id = new ObjectId();
    const user = {
      _id: id,
      name: userDTO.name,
      email: userDTO.email,
      token: await useSecurity().createUserToken(
        {
          id: id as unknown as string,
          email: userDTO.email,
          password: userDTO.password,
        },
        useRuntimeConfig().secret
      ),
    } as User;

    const newUser = await UserSchema.create(user);
    if (!newUser)
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: Messages.INSERT_DB_ERROR,
      });

    const url = `${
      useRuntimeConfig().public.baseURL
    }/confirmar-registro?token=${user.token}`;

    const { html, text } = useConfirmRegister().generateEmailContent(
      user.name,
      url
    );

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `${
      useRuntimeConfig().public.appName
    } - Confirmação de Registro`;

    const info = transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: subject,
      text: text,
      html: html,
    });

    if (!info)
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: Messages.EMAIL_SERVER_ERROR,
      });

    return {
      message: Messages.CONFIRM_REGISTER,
      token: user.token,
    };
  } catch (error) {
    return { error };
  }
});

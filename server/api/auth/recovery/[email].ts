import { useRescuePassword } from '~/composables/mail/rescuePassword';
import { createTransport } from "nodemailer";
import { useSecurity } from "~/composables/domain/security";
import { useValidations } from "~/composables/domain/validations";
import { UserSchema } from "~~/server/models/user.schema";
import { Messages } from "~~/types/enums/Messages";

export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");
  
  try {
    if (!email)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.EMAIL_NOT_PROVIDER,
      });

    if (!useValidations().email(email))
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: Messages.INCOMPATIBLE_EMAIL_FORMAT,
      });

    const user = await UserSchema.findOne({ email: email });
    if (!user)
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: Messages.NOT_REGISTERED_EMAIL,
      });

    const token = await useSecurity().createRescuePasswordToken(
      email,
      useRuntimeConfig().secret
    );

    if (!token)
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: Messages.ERROR_TOKEN,
      });

    await UserSchema.findByIdAndUpdate(user.id, { rescueToken: token });

    const url = `${
      useRuntimeConfig().public.baseURL
    }/redefinir-senha?token=${token}`;

    const { html, text } = useRescuePassword().generateEmailContent(
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
    } - Recuperação sua senha`;

    const info = await transporter.sendMail({
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
      url: url,
      message: Messages.RECOVERY_PASSWORD_EMAIL_SENT 
    };
  } catch (error) {
    return { error };
  }
});

import type { H3Event } from "h3";
import jwt from "jsonwebtoken";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const useSecurity = () => {
  interface ResponseToken {
    decoded: string | undefined | JwtPayload;
    error: VerifyErrors | null;
  }

  async function createUserToken(
    payload: { id: string; email: string; password: string },
    secret: string
  ) {
    return await jwt.sign(payload, secret, { expiresIn: "1d" });
  }

  async function createRescuePasswordToken(payload: string, secret: string) {
    return await jwt.sign({ payload: payload }, secret, { expiresIn: "10m" });
  }

  function decodeToken(token: string, secret: string) {
    const response = {} as ResponseToken;
    jwt.verify(token, secret, async (error, decoded) => {
      response.error = error;
      response.decoded = decoded as JwtPayload;
    });
    return response;
  }

  async function setSession(event: H3Event, id: string, token: string) {
    try {
      await setUserSession(event, {
        user: {
          id: id,
        },
        secure: {
          apiToken: token,
        },
        loggedInAt: new Date(),
      });
      return true;
    } catch (error) {
      return error;
    }
  }

  return {
    createUserToken,
    createRescuePasswordToken,
    decodeToken,
    setSession,
  };
};

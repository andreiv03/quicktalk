import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../../constants";

class JsonWebToken {
  signToken(subject: any, expiresIn: string): Promise<string>  {
    return new Promise((resolve, reject) => {
      if (!JWT_SECRET) throw new Error("Secret Token not found!");
  
      const data = {
        sub: subject,
        iat: Date.now()
      };
  
      jwt.sign(data, JWT_SECRET, { expiresIn }, (error, token) => {
        if (error) reject(error);
        resolve(token!);
      });
    });
  }

  verifyToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      if (!JWT_SECRET) throw new Error("Secret Token not found!");
  
      jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) reject(error);
        resolve(payload as JwtPayload);
      });
    });
  }
};

const jsonWebToken = new JsonWebToken();
export default jsonWebToken;
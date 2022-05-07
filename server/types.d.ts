declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    CLIENT_URL: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
  }
}

declare namespace Express {
  export interface Request {
    userId: string;
  }
}
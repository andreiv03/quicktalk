export const constants = {
  JWT_SECRET: process.env["JWT_SECRET"] as string,
  MONGODB_URI: process.env["MONGODB_URI"] as string
};

Object.entries(constants).forEach(([key, value]) => {
  if (typeof value === "undefined") throw new Error(`${key} not found!`);
});

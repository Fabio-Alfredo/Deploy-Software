import "dotenv/config";

const validateEnv = (variable, name) => {
  if (!variable) throw new Error(`Environment variable ${name} is not defined`);
  return variable;
};

export const config = {
  port: validateEnv(process.env.PORT, "PORT"),
  monogodb: validateEnv(process.env.MONGODB_URI, "MONGODB_URI"),
  jwSecret: validateEnv(process.env.JWT_SECRET, "JWT_SECRET"),
  salt: validateEnv(process.env.SALT_ROUNDS, "SALT_ROUNDS"),
  prefix: validateEnv(process.env.PREFIX_TOKEN, "PREFIX"),
};

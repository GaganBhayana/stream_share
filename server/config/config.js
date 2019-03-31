let env = process.env.NODE_ENV || "development";

if (env === "development") {
  const env = require('./config.json').development;
  Object.keys(env).forEach(key => {
    process.env[key] = env[key];
  });
}

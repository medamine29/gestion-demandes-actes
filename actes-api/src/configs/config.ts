/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadEnv } from '../helpers/load-env'

loadEnv()
const env = process.env as Record<string, string>

const Config = {
  SERVER: {
    DOMAIN: env.DOMAIN,
    ENV: env.NODE_ENV,
    PORT: env.PORT || 3000,
    TIMEZONE: env.TZ,
  },
  DEFAULT: {
  },
  DB: {
    CONNECTION_STRING: env.DB_CONNECTION_STRING,
  },
  TERRITORY: {
    MUNICIPALITIES_API_URL: env.MUNICIPALITIES_API_URL,
    COUNTRIES_API_URL: env.COUNTRIES_API_URL 
  },
  AUTH: {
    JWT_SECRET: env.JWT_SECRET,
    JWT_EXP: env.JWT_EXP,
    PWD_SALT: +env.PWD_SALT
  },
  MAIL: {
    SENDER_EMAIL: env.SENDER_EMAIL,
    EMAIL_PASSWORD: env.EMAIL_PASSWORD
  }
}

export const { SERVER, DEFAULT, DB, TERRITORY, AUTH, MAIL } = Config

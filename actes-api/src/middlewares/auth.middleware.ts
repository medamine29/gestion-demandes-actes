import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AUTH } from '../configs/config'
import { AUTH_ERRORS, SERVER_ERRORS } from '../constants/errors.constant'
import AuthorizationError from '../errors/authorization.error'
import BaseError from '../errors/base.error'
import { Role, AuthData } from '../constants/global.constant'

export const auth = (...permittedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      return next(new AuthorizationError(AUTH_ERRORS.PERMISSION_DENIED))

    const secret = AUTH.JWT_SECRET
    if (!secret)
      return next(
        new BaseError(
          500,
          SERVER_ERRORS.INTERNAL_SERVER_ERROR.code,
          SERVER_ERRORS.INTERNAL_SERVER_ERROR.message
        )
      )

    try {
      const bearerToken = req.headers.authorization.split(' ')
      const token = bearerToken[1]

      const user = jwt.verify(token, secret) as AuthData

      if (!permittedRoles.includes(user.role))
        return next(new AuthorizationError(AUTH_ERRORS.PERMISSION_DENIED))

      next()
    } catch (err) {
      return next(new AuthorizationError(AUTH_ERRORS.EXPIRED_TOKEN))
    }
  }
}

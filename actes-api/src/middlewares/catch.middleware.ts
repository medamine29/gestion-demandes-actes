import { Handler, NextFunction, Request, Response } from 'express'

export const catchMiddleware =
  (callback: Handler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (error: unknown) {
      next(error)
    }
  }
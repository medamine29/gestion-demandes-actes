declare namespace Express {
  interface Request {
    user: any
    role: Role
    validBody: any
    validParams: any
    validQuery: any
  }
}

import { Role } from "../constants/global.constant"
import jwt, { Secret } from 'jsonwebtoken' 
import { AUTH } from "../configs/config"
import { Types } from "mongoose"

class TokenService {

  async createToken(payload: { _id: Types.ObjectId; role: Role }) {
    return jwt.sign(payload, AUTH.JWT_SECRET as Secret, {
      expiresIn: AUTH.JWT_EXP,
    })
  }

}

export default new TokenService()

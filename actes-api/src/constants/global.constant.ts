import { Types } from 'mongoose'

export enum Civility {
  MALE = 'male',
  FEMALE = 'female'
}

export enum Role {
  ADMIN = 'admin'
}

export interface AuthData {
  _id: string
  role: Role
}

export const frenchPostalCodeRegex = /^[0-9]{5}$/

export const frenchPhoneNumberRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
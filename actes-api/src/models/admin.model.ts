import { model, Schema, Types } from 'mongoose'
import {
  ADMIN,
  defaultSchemaOptions,
} from '../constants/database.constant'

export interface IAdmin {
  _id: Types.ObjectId
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface IWriteAdmin {
  email: IAdmin['email']
  password: IAdmin['password']
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    }
  },
  defaultSchemaOptions
)

export const Admin = model<IAdmin>(
  ADMIN.model,
  adminSchema,
  ADMIN.collection
)

import { model, Schema, Types } from 'mongoose'
import {
  MESSAGE,
  defaultSchemaOptions,
} from '../constants/database.constant'

export interface IMessage {
  _id: Types.ObjectId,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
  content: string
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IWriteMessage {
  firstName: IMessage['firstName']
  lastName: IMessage['lastName']
  email: IMessage['email']
  phone: IMessage['phone']
  content: IMessage['content']
}

const messageSchema = new Schema<IMessage>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  defaultSchemaOptions
)

export const Message = model<IMessage>(
  MESSAGE.model,
  messageSchema,
  MESSAGE.collection
)

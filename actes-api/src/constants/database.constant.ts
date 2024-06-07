import { SchemaOptions } from 'mongoose'

const ModelName = {
  ACT: {
    model: 'Act',
    collection: 'acts'
  },
  MESSAGE: {
    model: 'Message',
    collection: 'messages'
  },
  ADMIN: {
    model: 'Admin',
    collection: 'admins'
  },
  MUNICIPALITY: {
    model: 'Municipality',
    collection: 'municipalities'
  }
}

export const defaultSchemaOptions: SchemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v
    },
  },
}

export const {
  ACT,
  MESSAGE,
  ADMIN,
  MUNICIPALITY
} = ModelName

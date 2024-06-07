import { model, Schema, Types } from 'mongoose'
import {
  MUNICIPALITY,
  defaultSchemaOptions,
} from '../constants/database.constant'

export interface IMunicipality {
  _id: Types.ObjectId
  name: string
  address: string | string[]
  postalCode: string
  email: string
  url: string
}

export interface IWriteMunicipality {
  name: IMunicipality['name']
  address: IMunicipality['address']
  postalCode: IMunicipality['postalCode']
  email: IMunicipality['email']
  url: IMunicipality['url']
}

const municipalitySchema = new Schema<IMunicipality>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    }
  },
  defaultSchemaOptions
)

export const Municipality = model<IMunicipality>(
  MUNICIPALITY.model,
  municipalitySchema,
  MUNICIPALITY.collection
)

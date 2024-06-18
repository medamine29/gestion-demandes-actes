import { model, Schema, Types } from 'mongoose'
import {
  MUNICIPALITY,
  defaultSchemaOptions,
} from '../constants/database.constant'
import { number } from 'joi'

export interface IMunicipality {
  _id: Types.ObjectId
  name: string
  address: string
  coordinates: {
    lon: number
    lat: number
  }
  city: string
  department: string
  region: string
  departmentCode: string
  postalCode: string
  email: string
  webSite: string
}

export interface IWriteMunicipality {
  name: IMunicipality['name']
  address: IMunicipality['address']
  postalCode: IMunicipality['postalCode']
  email: IMunicipality['email']
  webSite: IMunicipality['webSite']
  coordinates: IMunicipality['coordinates']
  department: IMunicipality['department']
  region: IMunicipality['region']
  city: IMunicipality['city']
  departmentCode: IMunicipality['departmentCode']
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
    coordinates: {
      type: {
        lon: Number,
        lat: Number,
      },
      required: false
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
    webSite: {
      type: String,
      required: false
    },
    department: {
      type: String,
      required: false
    },
    departmentCode: {
      type: String,
      required: false
    },
    region: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
  },
  defaultSchemaOptions
)

export const Municipality = model<IMunicipality>(
  MUNICIPALITY.model,
  municipalitySchema,
  MUNICIPALITY.collection
)

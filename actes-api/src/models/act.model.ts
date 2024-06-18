import { model, Schema, Types } from 'mongoose'
import {
  ACT,
  defaultSchemaOptions,
} from '../constants/database.constant'
import { Civility } from '../constants/global.constant'
import { boolean } from 'joi'

export enum ActType {
  MARRIAGE = "marriage",
  DEATH = "death",
  BIRTH = "birth"
}

export interface BirthInfo {
  civility: Civility,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
  birthDate: Date,
  lastName: string,
  firstName: string,
  country: string,
  birthPlace: string,
  unknownFather: boolean,
  fathersFirstName: string,
  fathersLastName: string,
  unknownMother: boolean,
  mothersFirstName: string,
  mothersLastName: string
}

export interface Person  {
  civility: Civility,
  lastName: string,
  usageLastName?: string,
  firstName: string,
  birthDate: string,
  unknownFather: boolean,
  fathersFirstName: string,
  fathersLastName: string,
  unknownMother: boolean,
  mothersFirstName: string,
  mothersLastName: string
}

export interface MarriageInfo {
  marriageDate: Date,
  country: string,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
  marriagePlace: string,
  firstPerson: Person,
  secondPerson: Person
}

export interface DeathInfo {
  civility: Civility,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
  lastName: string,
  firstName: string,
  country: string,
  deathPlace: string,
  deathDate: string
}

export enum Relationship {
  CONCERNED_PERSON = "La personne concernée",
  PARENT = "Son père ou sa mère",
  SPOUSE = "Son conjoint",
  CHILD = "Son fils ou sa fille",
  GRAND_PARENT = "Son grand-père ou sa grand-mère",
  GRAND_CHILD = "Son petit-fils ou sa petite-fille",
  LEGAL_REPRESENTANT = "Son représentant légal",
  HEIR = "Son héritier",
  OTHER = "Autre"
}

export enum RequestReason {
  MARRIAGE_FILE = "constitution d'un dossier de mariage",
  ID = "carte nationale d'identité",
  PASSPORT = "Passeport",
  SUCCSSION = "succesion",
  SOCIAL_SECURITY_BENEFITS = "Prestations sociales",
  RETIREMENT = "retraite",
  PACS = "Constitution d'un dossier de PACS",
  GENEALOGY = "Généalogie (Acte de naissance à partir de 1922)",
  NATIONALITY_CERTIFICATE = "Certificat de nationalité française",
  LITIGATION = "contentieux",
  PENSION = "Pension",
  OTHER = "autre"
}

export enum ActFormat {
  INTEGRAL_COPY = "Copie intégrale",
  EXTRACT_WITH_FILIATION = "Extrait avec filiation",
  EXTRACT_WITHOUT_FILIATION = "Extrait sans filiation",
  EXTRAIT_PLURILINGUE = "Extrait plurilingue"
}

export interface ActAddressInfo {
  civility: Civility,
  firstName: string,
  lastName: string,
  country: string,
  address: string,
  postalCode: string,
  city: string,
  email: string,
  phone: string
}

export interface IAct {
  _id: Types.ObjectId,
  actType: ActType,
  actAddressInfo: ActAddressInfo,
  birthInfo: BirthInfo,
  marriageInfo: MarriageInfo
  deathInfo: DeathInfo
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IWriteAct {
  actType: IAct['actType']
  actAddressInfo: IAct['actAddressInfo']
  birthInfo: IAct['birthInfo']
  marriageInfo: IAct['marriageInfo']
  deathInfo: IAct['deathInfo']
}

// DETAILS MODELS

export interface PersonDetails {
  user: string,
  father: string,
  mother: string
}

export interface BirthInfoDetails {
  user: string,
  birthDetails: string,
  father: string,
  mother: string,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
}

export interface DeathInfoDetails {
  user: string,
  deathDetails: string,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
}

export interface MarriageInfoDetails {
  marriageDetails: string,
  firstPerson: PersonDetails,
  secondPerson: PersonDetails,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
}

export interface ActClientDetails {
  user: string,
  address: string,
  email: string,
  phone: string,
}
export interface ActDetails {
  _id: Types.ObjectId,
  actType: ActType,
  formattedActType: string,
  client: ActClientDetails,
  createdAt: string,
  isArchived: boolean,
  birthInfo?: BirthInfoDetails,
  deathInfo?: DeathInfoDetails,
  marriageInfo?: MarriageInfoDetails
}

const actSchema = new Schema<IAct>(
  {
    actType: {
      type: String,
      enum: Object.values(ActType),
      required: true
    },
    actAddressInfo: {
      civility: {
        type: String,
        enum: Object.values(Civility),
        required: true
      },
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
      country: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
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
      }
    },
    birthInfo: {
      type: {
        civility:  {
          type: String,
          enum: Object.values(Civility),
          required: true
        },
        relationship: {
          type: String,
          enum: Object.values(Relationship),
          required: true
        },
        actFormat: {
          type: String,
          enum: Object.values(ActFormat),
          required: true
        },
        requestReason: {
          type: String,
          enum: Object.values(RequestReason),
          required: true
        },
        birthDate: Date,
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
        birthPlace: {
          type: String,
          required: true,
          trim: true,
        },
        unknownFather: {
          type: Boolean,
          default: false
        },
        fathersFirstName: {
          type: String,
          trim: true,
        },
        fathersLastName: {
          type: String,
          trim: true,
        },
        unknownMother: {
          type: Boolean,
          default: false
        },
        mothersFirstName: {
          type: String,
          trim: true,
        },
        mothersLastName: {
          type: String,
          trim: true,
        }
      },
      required: false
    },
    marriageInfo: {
      type: {
        marriageDate: Date,
        country: {
          type: String,
          trim: true,
          required: true
        },
        relationship: {
          type: String,
          enum: Object.values(Relationship),
          required: true
        },
        actFormat: {
          type: String,
          enum: Object.values(ActFormat),
          required: true
        },
        requestReason: {
          type: String,
          enum: Object.values(RequestReason),
          required: true
        },
        marriagePlace: {
          type: String,
          required: true
        },
        firstPerson: {
          civility: {
            type: String,
            enum: Object.values(Civility),
            required: true
          },
          lastName: {
            type: String,
            trim: true
          },
          usageLastName: {
            type: String,
            trim: true
          },
          firstName: {
            type: String,
            trim: true,
            required: true
          },
          birthDate: Date,
          unknownFather: {
            type: Boolean,
            default: false
          },
          fathersFirstName: {
            type: String,
            trim: true
          },
          fathersLastName: {
            type: String,
            trim: true
          },
          unknownMother: {
            type: Boolean,
            default: false
          },
          mothersFirstName: {
            type: String,
            trim: true
          },
          mothersLastName: {
            type: String,
            trim: true
          }
        },
        secondPerson: {
          civility: {
            type: String,
            enum: Object.values(Civility),
            required: true
          },
          lastName: {
            type: String,
            trim: true
          },
          usageLastName: {
            type: String,
            trim: true
          },
          firstName: {
            type: String,
            trim: true,
            required: true
          },
          birthDate: Date,
          unknownFather: {
            type: Boolean,
            default: false
          },
          fathersFirstName: {
            type: String,
            trim: true
          },
          fathersLastName: {
            type: String,
            trim: true
          },
          unknownMother: {
            type: Boolean,
            default: false
          },
          mothersFirstName: {
            type: String,
            trim: true
          },
          mothersLastName: {
            type: String,
            trim: true
          }
        }
      },
      required: false
    },
    deathInfo: {
      type: {
        civility: {
          type: String,
          enum: Object.values(Civility),
          required: true
        },
        relationship: {
          type: String,
          enum: Object.values(Relationship),
          required: true
        },
        actFormat: {
          type: String,
          enum: Object.values(ActFormat),
          required: true
        },
        requestReason: {
          type: String,
          enum: Object.values(RequestReason),
          required: true
        },
        lastName: {
          type: String,
          trim: true,
          required: true
        },
        firstName: {
          type: String,
          trim: true,
          required: true
        },
        country: {
          type: String,
          trim: true,
          required: true
        },
        deathPlace: {
          type: String,
          trim: true,
          required: true
        },
        deathDate: Date
      },
      required: false
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  defaultSchemaOptions
)

export const Act = model<IAct>(
  ACT.model,
  actSchema,
  ACT.collection
)

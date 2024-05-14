import { ReadConcernLevel, ReadPreference, WriteConcern } from 'mongodb'

export const transactionOptions = {
  readPreference: ReadPreference.primary,
  readConcern: ReadConcernLevel.local,
  writeConcern: WriteConcern.fromOptions({ w: 'majority' }),
}
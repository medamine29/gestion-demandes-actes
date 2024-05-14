import { Types } from 'mongoose'

interface UpdateQueryResult {
  matchedCount: number // Number of documents matched
  modifiedCount: number // Number of documents modified
  acknowledged: boolean // Boolean indicating everything went smoothly.
  upsertedId: Types.ObjectId | null // null or an id containing a document that had to be upserted.
  upsertedCount: number // Number indicating how many documents had to be upserted. Will either be 0 or 1.
}
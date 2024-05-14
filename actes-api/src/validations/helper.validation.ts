import { ObjectId } from 'mongodb'

export const isMongoId = (id: any, helpers: any) => {
  if (!ObjectId.isValid(id)) {
    const path = helpers?.state?.path

    if (path.length > 1)
      return helpers.message(`${path[0]}.${path[1]} is invalid`)

    return helpers.message(`${path[0]} is invalid`)
  }
  return id
}

import {
  AggregateOptions,
  ClientSession,
  DocumentDefinition,
  FilterQuery,
  ProjectionType,
  PipelineStage,
  QueryOptions,
  SaveOptions,
  startSession,
  Types,
  UpdateQuery,
  // _UpdateQueryDef,
} from 'mongoose'
import { UpdateQueryResult } from '../@types/mongoose'
import { transactionOptions } from '../configs/db.config'

export default class BaseRepository<IReadDoc, IWriteDoc> {
  model: any // TODO:

  static async createTransaction(
    fn: (session: ClientSession) => Promise<unknown>,
    options = transactionOptions
  ) {
    const session = await startSession()
    await session.withTransaction(async () => fn(session), options)
    session.endSession()
  }

  async create(
    document: DocumentDefinition<IWriteDoc>,
    options: SaveOptions = {}
  ) {
    return this.model.create([document], options)
  }

  async createMany(
    documents: DocumentDefinition<IWriteDoc>[],
    options: SaveOptions = {}
  ) {
    return this.model.create(documents, options)
  }

  async findOne(
    filterQuery: FilterQuery<IReadDoc>,
    projectionQuery: ProjectionType<IReadDoc> | null = {},
    queryOptions: QueryOptions = {}
  ): Promise<IReadDoc> {
    filterQuery = { deletedAt: null, ...filterQuery }
    queryOptions = { lean: true, ...queryOptions }
    return this.model.findOne(filterQuery, projectionQuery, queryOptions)
  }

  async find(
    filterQuery: FilterQuery<IReadDoc>,
    projectionQuery: ProjectionType<IReadDoc> | null = {},
    queryOptions: QueryOptions = {}
  ): Promise<IReadDoc[]> {
    filterQuery = { deletedAt: null, ...filterQuery }
    queryOptions = { lean: true, ...queryOptions }
    return this.model.find(filterQuery, projectionQuery, queryOptions)
  }

  async findById(
    id: Types.ObjectId | string,
    projectionQuery: ProjectionType<IReadDoc> | null = {},
    queryOptions: QueryOptions = {}
  ): Promise<IReadDoc> {
    const filterQuery = { deletedAt: null, _id: id }
    queryOptions = { lean: true, ...queryOptions }
    return this.model.findOne(filterQuery, projectionQuery, queryOptions)
  }

  async updateOne(
    filterQuery: FilterQuery<IReadDoc>,
    updateQuery: UpdateQuery<IWriteDoc>, // | _UpdateQueryDef<IWriteDoc>,
    queryOptions: QueryOptions = {}
  ): Promise<UpdateQueryResult> {
    filterQuery = { deletedAt: null, ...filterQuery }
    const result = await this.model.updateOne(
      filterQuery,
      updateQuery,
      queryOptions
    )
    return result
  }

  async updateById(
    id: Types.ObjectId | string,
    updateQuery: UpdateQuery<IWriteDoc>, // | _UpdateQueryDef<IWriteDoc>,
    queryOptions: QueryOptions = {}
  ): Promise<UpdateQueryResult> {
    const filterQuery = { _id: id, deletedAt: null }
    const result = await this.model.updateOne(
      filterQuery,
      updateQuery,
      queryOptions
    )
    return result
  }

  async updateMany(
    filterQuery: FilterQuery<IReadDoc>,
    updateQuery: UpdateQuery<IWriteDoc>, // | _UpdateQueryDef<IWriteDoc>,
    queryOptions: QueryOptions = {}
  ): Promise<UpdateQueryResult> {
    filterQuery = { deletedAt: null, ...filterQuery }
    const result = await this.model.updateMany(
      filterQuery,
      updateQuery,
      queryOptions
    )
    return result
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<IReadDoc>,
    updateQuery: UpdateQuery<IWriteDoc>, // | _UpdateQueryDef<IWriteDoc>,
    queryOptions: QueryOptions = {}
  ): Promise<IReadDoc> {
    filterQuery = { deletedAt: null, ...filterQuery }
    queryOptions = { lean: true, new: true, ...queryOptions }

    return this.model.findOneAndUpdate(filterQuery, updateQuery, queryOptions)
  }

  async deleteById(id: Types.ObjectId | string, queryOptions?: QueryOptions) {
    const updateResult = await this.model.updateOne(
      { _id: id },
      { deletedAt: Date.now() },
      queryOptions
    )
    return !!updateResult?.modifiedCount
  }

  async deleteOne(
    filterQuery: FilterQuery<IReadDoc>,
    queryOptions?: QueryOptions
  ) {
    const updateResult = await this.model.updateOne(
      filterQuery,
      { $set: { deletedAt: Date.now() } },
      queryOptions
    )
    return !!updateResult?.modifiedCount
  }

  async deleteMany(
    filterQuery: FilterQuery<IReadDoc>,
    queryOptions?: QueryOptions
  ) {
    const updateResult = await this.model.updateMany(
      filterQuery,
      { $set: { deletedAt: Date.now() } },
      queryOptions
    )
    return !!updateResult?.modifiedCount
  }

  async aggregate(pipeline: PipelineStage[], options?: AggregateOptions) {
    return this.model.aggregate(pipeline, options)
  }

  async exists(filterQuery: FilterQuery<IReadDoc>) {
    filterQuery = { deletedAt: null, ...filterQuery }
    return this.model.exists(filterQuery)
  }

  async countDocuments(filterQuery: FilterQuery<IReadDoc>) {
    filterQuery = { deletedAt: null, ...filterQuery }
    return this.model.countDocuments(filterQuery)
  }

  async bulkWrite(updateQueries: any, queryOptions: QueryOptions = {}) {
    return this.model.bulkWrite(updateQueries, queryOptions)
  }
}

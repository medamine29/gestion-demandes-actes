import { FilterQuery, ProjectionType, Types } from 'mongoose'
import NotFoundError from '../errors/not-found.error'
import { ActType, IAct, IWriteAct } from '../models/act.model'
import ActRepository from '../repositories/act.repository'
import BadRequestError from '../errors/bad-request.error'
import { DB_ERRORS, ACT_ERRORS } from '../constants/errors.constant'
import { formatDate } from "../helpers/date.helper"
import { formatAct, formatBirthInfo, formatDeathInfo, formatMarriageInfo, translateActType } from '../helpers/util.helper'
import { Civility } from '../constants/global.constant'

class ActService {
  private readonly actRepository = ActRepository

  async createAct(actData: IWriteAct) {
    const act = await this.actRepository.create(actData)
    return act
  }

  async getActs(actType: ActType, showArchived: boolean, page: number = 1, perPage: number = 20) {

    const matchQuery: FilterQuery<IAct> = {}

    if (actType) matchQuery.actType = actType
    if (!showArchived) {
      matchQuery.isArchived = { $ne: true }
    }

    const projectionQuery: ProjectionType<IAct> = {
      actType: true, actAddressInfo: true, createdAt: true, isArchived: true
    }

    const promises: any[] = []

    const actsCountPromise = this.actRepository.countDocuments(matchQuery)

    const actsPromise = this.actRepository.aggregate([
      { $match: matchQuery },
      { $project: projectionQuery as { [k: string]: boolean } },
      { $sort: { createdAt: 1 } },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ])

    promises.push(actsPromise, actsCountPromise)

    let [acts, actsCount] = await Promise.all(promises)

    acts = acts.map((actElem: IAct) => {
      const address = actElem.actAddressInfo
      const newAct = {
        _id: actElem._id,
        formattedActType: translateActType(actElem.actType),
        actType: actElem.actType,
        createdAt: formatDate(actElem.createdAt.toISOString()),
        user: `${address.firstName} ${address.lastName}`,
        address: `${address.address}, ${address.postalCode}, ${address.city}, ${address.country}`,
        isArchived: actElem.isArchived
      }

      return newAct
    })

    return { acts, actsCount }
  }

  async getActDetails(actId: Types.ObjectId) {
    const act = await this.actRepository.findOne({ _id: actId }, {}, { lean: true })
    if (!act) throw new NotFoundError(ACT_ERRORS.ACT_NOT_FOUND)

    const formattedAct = formatAct(act)

    return formattedAct
  }

  async deleteAct(actId: string) {
    const { acknowledged, modifiedCount } = await this.actRepository.updateOne({ _id: actId }, { isArchived: true }, { lean: true })
    if (!acknowledged || !modifiedCount) throw new BadRequestError(DB_ERRORS.UPDATE_ERROR)
  }

}

export default new ActService()

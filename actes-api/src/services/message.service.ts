import { FilterQuery, ProjectionType } from 'mongoose'
import { IMessage, IWriteMessage } from '../models/message.model'
import MessageRepository from '../repositories/message.repository'
import BadRequestError from '../errors/bad-request.error'
import { DB_ERRORS } from '../constants/errors.constant'
import { formatDate } from '../helpers/date.helper'

class MessageService {
  private readonly messageRepository = MessageRepository

  async createMessage(messageData: IWriteMessage) {
    const message = await this.messageRepository.create(messageData)
    return message
  }

  async getMessages(showArchived: boolean, page: number = 1, perPage: number = 20) {

    const matchQuery: FilterQuery<IMessage> = {}

    if (!showArchived) {
      matchQuery.isArchived = { $ne: true }
    }

    const promises: any[] = []

    const messagesCountPromise = this.messageRepository.countDocuments(matchQuery)

    const messagesPromise = this.messageRepository.aggregate([
      { $match: matchQuery },
      { $sort: { createdAt: 1 } },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ])

    promises.push(messagesPromise, messagesCountPromise)

    let [messages, messagesCount] = await Promise.all(promises)

    messages = messages.map((messageElem: IMessage) => {
      const newMessage = {
        _id: messageElem._id,
        user: `${messageElem.firstName} ${messageElem.lastName}`,
        email: messageElem.email,
        phone: messageElem.phone,
        content: messageElem.content,
        createdAt: formatDate(messageElem.createdAt.toISOString()),
        isArchived: messageElem.isArchived
      }

      return newMessage
    })

    return { messages, messagesCount }
  }

  async deleteMessage(messageId: string) {
    const { acknowledged, modifiedCount } = await this.messageRepository.updateOne({ _id: messageId }, { isArchived: true }, { lean: true })
    if (!acknowledged || !modifiedCount) throw new BadRequestError(DB_ERRORS.UPDATE_ERROR)
  }

}

export default new MessageService()

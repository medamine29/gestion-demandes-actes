import { IMessage, IWriteMessage, Message } from '../models/message.model'
import BaseRepository from './base.repository'

class ActRepository extends BaseRepository<IMessage, IWriteMessage> {
  model = Message
}

export default new ActRepository()

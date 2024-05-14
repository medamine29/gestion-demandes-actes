import { SERVER } from '../configs/config'
import { Environment } from '../constants/server.constant'

export const isEnvInProduction = () => SERVER.ENV === Environment.PRODUCTION
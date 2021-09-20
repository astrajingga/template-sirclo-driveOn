import { getWhatsAppOTPSetting } from '@sirclo/nexus'
import { GRAPHQL_URI } from '../Constants'
import { IncomingMessage } from 'http'

export const useWhatsAppOTPSetting = async (req: IncomingMessage) => {
  return await getWhatsAppOTPSetting(GRAPHQL_URI(req))
}
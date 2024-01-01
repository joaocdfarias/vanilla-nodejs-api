import { IncomingMessage, ServerResponse } from 'node:http'

export type Request = IncomingMessage
export type Response = ServerResponse<IncomingMessage> & {
  req: Request
}

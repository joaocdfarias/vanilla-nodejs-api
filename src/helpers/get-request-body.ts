import { Request } from "../types"

export const getRequestBody = (request: Request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      request.on('data', (chunk) => {
        body += chunk.toString()
      })

      request.on('end', () => {
        resolve(body)
      })
    } catch (error) {
      reject(error)
    }
  })
}

import { createServer } from 'node:http'

export class Router {
  constructor() {
    this.routes = []
  }

  addRoute(method, url, handler) {
    this.routes.push({ method, url, handler })
  }

  findRoute(method, url) {
    return this.routes.find(
      (route) => route.method === method && route.url === url
    )
  }

  get(route, handler) {
    this.addRoute('get', route, handler)
  }

  post(route, handler) {
    this.addRoute('post', route, handler)
  }

  listen(port, callback) {
    createServer((request, response) => {
      const method = request.method.toLowerCase()
      const url = request.url.toLowerCase()
      const found = this.findRoute(method, url)

      if (found) {
        response.send = (content) => {
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end(content)
        }

        return found.handler(request, response)
      }

      response.writeHead(404, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'Route not found' }))
    }).listen(port, callback)
  }
}

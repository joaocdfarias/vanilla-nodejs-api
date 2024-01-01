import { createServer } from 'node:http'

export class Router {
  constructor() {
    this.routes = []
  }

  addRoute(method, url, handler) {
    this.routes.push({ method, url, handler })
  }

  findRoute(method, url) {
    const { pathname } = new URL(url, 'http://localhost')

    return this.routes.find((route) => {
      if (route.method.toLowerCase() === method.toLowerCase()) {
        const routePathSegments = route.url.split('/')
        const requestPathSegments = pathname.split('/')

        if (routePathSegments.length !== requestPathSegments.length) {
          return false
        }

        return routePathSegments.every((segment, index) => {
          if (segment.startsWith(':')) {
            route.params = route.params || {}
            const paramName = segment.slice(1)
            route.params[paramName] = requestPathSegments[index]
            return true
          }
          return segment === requestPathSegments[index]
        })
      }

      return false
    })
  }

  get(route, handler) {
    this.addRoute('get', route, handler)
  }

  post(route, handler) {
    this.addRoute('post', route, handler)
  }

  put(route, handler) {
    this.addRoute('put', route, handler)
  }

  delete(route, handler) {
    this.addRoute('delete', route, handler)
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

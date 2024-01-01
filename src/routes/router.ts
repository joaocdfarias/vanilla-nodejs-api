import { createServer } from 'node:http'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

type Routes = {
  method: Method
  url: string
  handler: any
  params?: any
}[]

export class Router {
  private routes: Routes

  constructor() {
    this.routes = []
  }

  addRoute(method: Method, url: string, handler: any) {
    this.routes.push({ method, url, handler })
  }

  findRoute(method: Method, url: string) {
    const { pathname } = new URL(url, 'http://localhost')

    return this.routes.find((route) => {
      if (route.method.toLowerCase() === method.toLowerCase()) {
        const routePathSegments = route.url.split('/')
        const requestPathSegments = pathname.split('/')

        if (routePathSegments.length !== requestPathSegments.length) {
          return false
        }

        return routePathSegments.every((segment: string, index: number) => {
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

  get(route: string, handler: any) {
    this.addRoute('GET', route, handler)
  }

  post(route: string, handler: any) {
    this.addRoute('POST', route, handler)
  }

  put(route: string, handler: any) {
    this.addRoute('PUT', route, handler)
  }

  delete(route: string, handler: any) {
    this.addRoute('DELETE', route, handler)
  }

  listen(port: string | number | undefined, callback: any) {
    createServer((request, response) => {
      const method = request.method?.toLowerCase()
      const url = request.url?.toLowerCase()
      const found = this.findRoute(method as Method, url as string)

      if (found) {
        ;(response as any).send = (content: any) => {
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

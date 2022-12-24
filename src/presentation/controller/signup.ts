import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'
export class SingUpController {
  handle (request: HttpRequest): HttpResponse {
    if (!request.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!request.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return {
      statusCode: 200,
      body: {}
    }
  }
}

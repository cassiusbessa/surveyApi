
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount, Validation } from './signup-protocols'
export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  constructor (emailValidor: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidor
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

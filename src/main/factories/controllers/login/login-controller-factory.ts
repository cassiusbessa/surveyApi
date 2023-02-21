import { makeLogControllerDecorator } from './../../decorators/log-controller-decorator-factory'
import { LoginController } from '../../../../presentation/controller/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
}

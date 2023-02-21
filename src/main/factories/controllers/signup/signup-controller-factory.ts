import { makeLogControllerDecorator } from './../../decorators/log-controller-decorator-factory'
import { SingUpController } from '../../../../presentation/controller/signup/signup'
import { Controller } from '../../../../presentation/protocols'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSingUpController = (): Controller => {
  return makeLogControllerDecorator(new SingUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication()))
}

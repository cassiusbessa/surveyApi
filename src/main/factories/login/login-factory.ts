import env from '../../config/env'
import { LoginController } from '../../../presentation/controller/login/login-controller'
import { DbAuthentication } from './../../../data/usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accoutMongoRepository = new AccountMongoRepository()
  const validation = makeLoginValidation()
  const dbAuthentication = new DbAuthentication(accoutMongoRepository, bcryptAdapter, jwtAdapter, accoutMongoRepository)
  const loginController = new LoginController(dbAuthentication, validation)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}

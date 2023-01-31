import { SingUpController } from './../../presentation/controller/signup/signup'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'

export const makeSingUpController = (): SingUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SingUpController(emailValidatorAdapter, dbAddAccount)
}

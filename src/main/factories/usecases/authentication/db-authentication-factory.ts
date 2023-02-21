import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accoutMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accoutMongoRepository, bcryptAdapter, jwtAdapter, accoutMongoRepository)
}

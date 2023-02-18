import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollections('accounts')
    const result = await accountCollection.insertOne({ _id: new ObjectId(), ...accountData })
    const account = { id: result.insertedId.toString(), ...accountData }
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = MongoHelper.getCollections('accounts')
    const result = await accountCollection.findOne({ email }) as any
    const account = { id: result?._id, ...result }
    return account
  }
}

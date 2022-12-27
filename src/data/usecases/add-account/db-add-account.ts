import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'
import { AccountModel } from '../../../domain/models/account'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const newAccount = {
      id: 'valid_id',
      name: accountData.name,
      email: accountData.email,
      password: accountData.password
    }
    await this.encrypter.encrypt(accountData.password)
    return await new Promise(resolve => resolve(newAccount))
  }
}

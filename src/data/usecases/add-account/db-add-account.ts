import { AddAccount, AddAccountModel, Encrypter, AccountModel } from './db-add-account-protocols'

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

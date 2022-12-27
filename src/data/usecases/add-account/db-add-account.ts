import { AddAccount, AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const newAccount = {
      name: accountData.name,
      email: accountData.email,
      password: accountData.password
    }
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({ ...newAccount, password: hashedPassword })
    return await new Promise(resolve => resolve({ ...newAccount, id: account.id }))
  }
}

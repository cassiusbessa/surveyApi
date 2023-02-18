import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'jest')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollections('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid_email@email.com')
    expect(account.password).toBe('valid_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await sut.add({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    })
    const account = await sut.loadByEmail('valid_email@email.com')
    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('valid_name')
    expect(account?.email).toBe('valid_email@email.com')
    expect(account?.password).toBe('valid_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('invalid_email')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const result = await accountCollection.insertOne({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    })
    let account = await accountCollection.findOne({ _id: result.insertedId })
    expect(account?.accessToken).toBeFalsy()
    await sut.updateAccessToken(result.insertedId.toString(), 'any_token')
    account = await accountCollection.findOne({ _id: result.insertedId })
    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe('any_token')
  })
})

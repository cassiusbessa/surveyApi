import { MongoHelper } from './mongo-helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    return await MongoHelper.connect(process.env.MONGO_URL ?? 'jest')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = MongoHelper.getCollections('accounts')
    expect(accountCollection).toBeTruthy()
    await MongoHelper.disconnect()
    accountCollection = MongoHelper.getCollections('accounts')
    expect(accountCollection).toBeTruthy()
  })
})

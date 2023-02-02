import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('LogMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'jest')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const errorCollection = MongoHelper.getCollections('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_stack')
    const count = await MongoHelper.getCollections('errors').countDocuments()
    expect(count).toBe(1)
  })
})

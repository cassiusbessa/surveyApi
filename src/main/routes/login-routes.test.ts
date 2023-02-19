import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('POST /SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'jest')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollections('accounts')
    await accountCollection.deleteMany({})
  })
  test('Should return 200 on sigunup success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Cássius',
        email: 'cassiusbessa@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})

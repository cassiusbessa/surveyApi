import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('POST /SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'jest')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollections('accounts')
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
  test('Should return 200 on login success', async () => {
    const password = await hash('123', 12)
    await accountCollection.insertOne({
      name: 'Cássius',
      email: 'cassius@gmail.com',
      password
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'cassius@gmail.com',
        password: '123'
      })
      .expect(200)
  })
})

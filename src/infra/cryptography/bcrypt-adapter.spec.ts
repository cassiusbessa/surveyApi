import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}))

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const defaultSalt = 12
    const sut = new BcryptAdapter(defaultSalt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', defaultSalt)
  })

  test('Should return a hash on success', async () => {
    const defaultSalt = 12
    const sut = new BcryptAdapter(defaultSalt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })
})

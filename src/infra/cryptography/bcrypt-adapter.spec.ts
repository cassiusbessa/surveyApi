import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const defaultSalt = 12
    const sut = new BcryptAdapter(defaultSalt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', defaultSalt)
  })
})

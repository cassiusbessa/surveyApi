import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('any_field', 'other_field')
}

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if field is not provided', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value', other_field: 'other_value' })
    expect(error).toEqual(new InvalidParamError('other_field'))
  })
  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value', other_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})

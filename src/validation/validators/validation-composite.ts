import { Validation } from '../../presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: Validation[]) {}

  validate (input: any): Error | null {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }
}

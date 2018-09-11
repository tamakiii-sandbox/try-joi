import * as Joi from 'joi'
import * as assert from 'power-assert'
import { Validator } from '../../../src/joi/resource'

describe('Single resource', () => {
  it('should be valid', () => {
    const schema = Validator.object()
    const data = { id: 1234, name: 'hoge' }
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error, null)
  })
})

describe('Multiple resources', () => {
  const schema = Joi.array().items(Validator.object())

  it('should be valid', () => {
    const data = [
      { id: 1234, name: 'hoge' },
      { id: 5678, name: 'fuga' },
    ]
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error, null)
  })

  it('should not be valid', () => {
    const data = [
      { id: 1234 },
    ]
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error.details.length, 1)
  })

  it('should not be valid', () => {
    const data = [
      { id: 1234 },
    ]
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error.details[0].type, "any.required");
  })
})

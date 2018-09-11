import * as Joi from 'joi'
import * as assert from 'power-assert'
import { Validator } from '../../../src/joi/split'

describe('Split and resource()', () => {
  const resources = {
    123: {id: 123, name: 'hoge'},
    456: {id: 456, name: 'fuga'},
  }

  it('should be valid', () => {
    const schema = Validator.string().resources(resources)
    const data = '123, 456'
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error, null)
  })

  it('should not be valid', () => {
    const schema = Validator.string().resources(resources)
    const data = '123, 789'
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error.details.length, 1)
  })
})

describe('Split and resources and unique', () => {
  const resources = {
    123: {id: 123, name: 'hoge'},
    456: {id: 456, name: 'fuga'},
  }
  const schema = Validator.string().resources(resources).unique()

  it('should be valid', () => {
    const data = '123, 456'
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error, null)
  })

  it('should not be valid', () => {
    const data = '123, 123'
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error.details.length, 1)
  })

  it('should not be valid', () => {
    const data = '123, 789'
    const actual = Joi.validate(data, schema)
    assert.equal(actual.error.details.length, 1)
  })
})

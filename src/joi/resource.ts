import * as Joi from 'joi'

export interface Type {
  id: number;
  name: string;
}

interface Schema extends Joi.ArraySchema {
  object: () => this;
}

export const Validator: Schema = Joi.extend({
  name: 'object',
  base: Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
  })
})

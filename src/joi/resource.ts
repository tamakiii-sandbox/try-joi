import * as Joi from 'joi'

export interface Type {
  id: number;
  name: string;
  email?: string;
}

interface Schema extends Joi.ArraySchema {
  object: () => this;
  email: () => this;
}

export const Validator: Schema = Joi.extend([
  {
    name: 'object',
    language: {
      email: "error: "
    },
    base: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string(),
    }),
    rules: [
      {
        name: 'email',
        validate(params, value: Type, state, options) {
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!regex.test(String(value.email).toLowerCase())) {
            return this.createError(
              "object.email",
              {},
              state,
              options
            )
          }
          return value;
        }
      }
    ]
  }
])

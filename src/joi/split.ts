import * as Joi from 'joi'

export interface Type {
  id: number;
  name: string;
}

interface Schema extends Joi.ArraySchema {
  string: () => this;
  resources: (params: { [key: string]: Type }) => this;
  unique: () => this;
}

export const Validator: Schema = Joi.extend(
  {
    name: 'string',
    language: {
      resources: "error: {{e}}",
      unique: "error: {{e}}",
    },
    pre(value, state, options) {
      return value
        .split(/,/)
        .map((x: string) => x.trim())
        .filter((x: string) => !!x)
    },
    rules: [
      {
        name: 'resources',
        params: {
          choices: Joi.any()
        },
        validate(params, value: string[], state, options) {
          const errors: string[] = [];
          const results: Type[] = [];
          value.forEach(x => {
            const param = params.choices[x]
            if (param) {
              results.push(param)
            } else {
              errors.push(x)
            }
          })
          if (errors.length) {
            return this.createError(
              "string.resources",
              {},
              state,
              options
            )
          }
          return results;
        }
      },
      {
        name: 'unique',
        validate(params, value: Type[], state, options) {
          const duplicated = new Set();
          const unique = new Set();
          for (const resource of value) {
            if (unique.has(resource.id)) {
              duplicated.add(`${resource.id}: ${resource.name}`);
            }
            unique.add(resource.id);
          }
          if (duplicated.size) {
            return this.createError(
              "string.unique",
              { e: [...duplicated.values()].join(", ") },
              state,
              options
            );
          }

          return value;
        }
      }
    ]
  }
)

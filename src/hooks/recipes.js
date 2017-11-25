// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const Ajv = require('ajv');
const ajv = new Ajv();
const schema = {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$id": "http://example.com/example.json",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "name": {
      "type": "string",
      "maxLength": 256
    },
    "imageUrl": {
      "type": "string"
    },
    "ingredients": {
      "type": "array",
      "minItems": 1,
      "maxItems": 10,
      "items": {
        "type": "string",
        "maxLength": 256
      }
    },
    "description": {
      "type": "string",
      "maxLength": 256
    }
  },
  "required": [
    "name",
    "imageUrl",
    "ingredients",
    "description"
  ]
};

const validate = ajv.compile(schema);

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function recipes (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    const isValid = validate(hook.data);
    if(!isValid) {
      throw new Error('Invalid json');
    }
    hook.data = Object.assign({}, hook.data, {
      createdAt: new Date().getTime(),
      createdBy: hook.params.user._id
    });
    return Promise.resolve(hook);
  };
};

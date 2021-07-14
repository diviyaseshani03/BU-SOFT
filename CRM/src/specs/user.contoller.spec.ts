import {SchemaObject} from '@loopback/openapi-v3';

export const credentialSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },

    password: {
      type: 'string',
      minLength: 8,
    },

  },
};


export const CredentialsRequestBody = {
  description: 'Login Credential Info',
  required: true,
  content: {
    'application/json': {
      schema: credentialSchema,
    },
  },
};


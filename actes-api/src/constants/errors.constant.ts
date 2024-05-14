const ERRORS = {
  DB_ERRORS: {
    UPDATE_ERROR: {
      code: 'update_error',
      message: 'Error when updating'
    }
  },
  SERVER_ERRORS: {
    INTERNAL_SERVER_ERROR: {
      code: 'internal_server_error',
      message: 'Internal server error'
    },
  },
  AUTH_ERRORS: {
    INVALID_REQUEST: {
      code: 'invalid_request',
      message: 'Invalid request'
    },
    EXPIRED_TOKEN: {
      code: 'expired_token',
      message: 'The access token is expired'
    },
    PERMISSION_DENIED: {
      code: 'permission_denied',
      message: 'You are not authorized to access this resource'
    },
    INVALID_LOGIN: {
      error: 'invalid_login',
      message: 'Incorrect email or password'
    },
  },
  ACT_ERRORS: {
    ACT_NOT_FOUND: {
      code: 'act_not_found',
      message: "demande d'acte introuvable"
    },
  }
}

export const {
  DB_ERRORS,
  SERVER_ERRORS,
  AUTH_ERRORS,
  ACT_ERRORS
} = ERRORS

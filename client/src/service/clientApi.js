import fetch from 'isomorphic-fetch'
import env from 'dotenv'
// env.config()

const { API_HOST: 'localhost:9000' } = process.env

export const ERROR_UNSUPPORTED_BLOCK = Error('error-unsupported-block')
export const ERROR_HAS_WELCOME_SCREEN = Error('error-has-welcome-screen')
export const ERROR_MISSING_FORM_ID = Error('Missing form id')

export async function getForm (uid, apiKey) {
  if (uid == null) {
    throw ERROR_MISSING_FORM_ID
  }

  let headers = {}

  if (apiKey != null) {
    headers['x-typeform-key'] = apiKey
  }

  const url = `${API_HOST}/forms/${uid}`

  let resp = await fetch(url, { headers })
  const form = await resp.json()

  resp = await fetch(form.theme.href, { headers })
  const theme = await resp.json()

  return {
    form: {
      ...form,
      theme
    },
    err: unsupportedReason(form)
  }
}

export function unsupportedReason (form) {
  if (containsWelcomeScreen(form)) {
    return ERROR_HAS_WELCOME_SCREEN
  }

  const block = getFirstBlock(form)

  if (!isBlockSupported(block)) {
    return ERROR_UNSUPPORTED_BLOCK
  }

  return null
}

export function getFirstBlock (form) {
  if (!form || !form.fields || !form.fields.length) {
    return null
  }

  return form.fields[0]
}

function isBlockSupported (block) {
  return block && SUPPORTED_BLOCKS.includes(block.type)
}

function containsWelcomeScreen (form) {
  return form && form.welcome_screens && form.welcome_screens.length > 0
}

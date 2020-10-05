import { promises as fs } from 'fs'
import { google } from 'googleapis'
import credentials from '../../credentials.json'

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
]

const { client_id, client_secret, redirect_uris } = credentials.web
const client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
)

export const getUrl = () => {
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
}

export const authorize = (code: string) => {
  return fs
    .readFile('token.json')
    .then((tokens) => {
      client.setCredentials(JSON.parse(tokens.toString()))
    })
    .catch(async () => {
      const { tokens } = await client.getToken(code)
      client.setCredentials(tokens)
      return fs.writeFile('token.json', JSON.stringify(tokens))
    })
}

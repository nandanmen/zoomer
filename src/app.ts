import express from 'express'
import bodyParser from 'body-parser'
import { authorize } from './auth'

const app = express()

app.set('port', process.env.PORT)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const { code } = req.query
  authorize(code as string).then(() => res.send('Token saved'))
})

export default app

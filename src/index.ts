import { config } from 'dotenv'
config()

import app from './app'
import { getUrl } from './auth'

app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
  console.log(`  Visit this url to authorize: ${getUrl()}`)
})

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback')

app = express()
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
)
app.use(serveStatic(path.join(__dirname, 'www/dist')))
const port = process.env.PORT || 8080
app.listen(port)

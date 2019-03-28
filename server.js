'use strict'

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
const history = require('connect-history-api-fallback')
app.use(history())
app.use(serveStatic(path.join(__dirname, 'www/dist')))

const port = process.env.PORT || 8080

app.listen(port)

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const uuid = require('uuid/v4')
const app = express()
const port = process.env.PORT || 5000

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const authorsRouter = require('./src/routes/authors')
const booksRouter = require('./src/routes/books')
app.use('/books/:bookid/authors', authorsRouter)
app.use('/books', booksRouter)

app.use((req, res, next) => {
  next({ status: 404, message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err)
  const errorToReturn = {}
  errorToReturn.status = err.status || 500
  errorToReturn.message = err.message || 'Something went wrong'
  if (process.env.NODE_ENV !== 'production') errorToReturn.stack = err.stack
  res.status(errorToReturn.status).json(errorToReturn)
})

const listener = () => { console.log(`Listening on port ${port}`) }
app.listen(port, listener)

module.exports = app

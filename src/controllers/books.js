const model = require('../models/book')

function getAll (req, res, next) {
  const books = model.getAll()
  res.status(200).json({ books })
}

function getOne (req, res, next) {
  const { id }  = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  const book = model.getOne(id)[0]
  if (book === undefined) return next({ status: 404, message: `No book with ID ${id}` })

  res.status(200).json({ book })
}

function create (req, res, next) {
  const { name, borrowed, description, authors } = req.body
  if (!name || !(borrowed === true || borrowed === false)) return next({ status: 400, message: `Book name, borrowed are all required.` })

  const book = model.create(name, borrowed, description, authors)
  res.status(201).json({ book })
}

function update (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  const { name, borrowed, description, authors } = req.body
  if (!name || !(borrowed === true || borrowed === false) || !description || !authors) return next({ status: 400, message: `Book name, borrowed, description, author(s) are all required.` })

  let book = model.getOne(id)
  if (book === undefined) return next({ status: 404, message: `No book with ID ${id}` })

  book = model.update(book[0], name, borrowed, description, authors)
  res.status(200).json({ book })
}

function remove (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  const book = model.getOne(id)[0]
  if (book === undefined) return next({ status: 404, message: `No book with ID ${id}` })

  model.remove(book)
  res.status(204).json()
}

module.exports = { getAll, getOne, create, update, remove }

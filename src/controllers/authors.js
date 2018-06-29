const Author = require('../models/author')
const Book = require('../models/book')

function getAll (req, res, next) {
  const { bookid }  = req.params
  if (!bookid) return next({ status: 400, message: `Book ID required` })

  const book = Book.getOne(bookid)[0]
  if (book === undefined) return next({ status: 404, message: `No book with ID ${bookid}` })

  const authors = Author.getAll(book.authors)
  res.status(200).json({ authors })
}

function getOne (req, res, next) {
  const { id, bookid }  = req.params
  if (!id || !bookid) return next({ status: 400, message: `Book and Author IDs required` })

  const book = Book.getOne(bookid)[0]
  if (book === undefined) return next({ status: 404, message: `No book with ID ${bookid}` })

  const author = Author.getOne(book.authors, id)
  if (Object.keys(author).length === 0) return next({ status: 404, message: `This book has no author with ID ${id}` })

  res.status(200).json({ author })
}

function create (req, res, next) {
  const { bookid }  = req.params
  if (!bookid) return next({ status: 400, message: `Book ID required` })

  const book = Book.getOne(bookid)[0]
  if (book === undefined) return next({ status: 404, message: `No book with ID ${bookid}` })

  const { firstName, lastName } = req.body
  if (!firstName || !lastName) return next({ status: 400, message: `Author first and last names are required.` })

  const author = Author.create(firstName, lastName, book)
  res.status(201).json({ author })
}

function update (req, res, next) {
  const { id, bookid }  = req.params
  if (!id || !bookid) return next({ status: 400, message: `Book and Author IDs required` })

  const book = Book.getOne(bookid)[0]
  if (book === undefined) return next({ status: 404, message: `No book with ID ${bookid}` })

  const { firstName, lastName } = req.body
  if (!firstName || !lastName) return next({ status: 400, message: `Author first and last names are required.` })

  let author = Author.getOne(book.authors, id)[0]
  if (author === undefined) return next({ status: 404, message: `No author with ID ${id}` })

  author = Author.update(author, firstName, lastName, book)
  res.status(200).json({ author })
}

function remove (req, res, next) {
  const { id, bookid }  = req.params
  if (!id || !bookid) return next({ status: 400, message: `Book and Author IDs required` })

  const book = Book.getOne(bookid)[0]
  if (book === undefined) return next({ status: 404, message: `No book with ID ${bookid}` })

  let author = Author.getOne(book.authors, id)[0]
  if (author === undefined) return next({ status: 404, message: `No author with ID ${id}` })

  Author.remove(author, book)
  res.status(204).json()
}

module.exports = { getAll, getOne, create, update, remove }

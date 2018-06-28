const books = require('../../data/books')
const fs = require('fs')
const uuid = require('uuid/v4')

function getAll () {
  return books.data
}

function getOne (id) {
  return books.data.filter(book => book.id === id)
}

function create (name, borrowed, description='', authors=[]) {
  const book = { id: uuid().slice(0, 8), name, borrowed, description, authors }

  const booksFile = fs.readFileSync('./data/books.json')
  const library = JSON.parse(booksFile)
  library.data.push(book)

  fs.writeFileSync('./data/books.json', JSON.stringify(library), 'utf-8')

  return book
}

function update (book, name, borrowed, description, authors) {
  const booksFile = fs.readFileSync('./data/books.json')
  let library = JSON.parse(booksFile)
  let updatedBook = []

  library.data.forEach(publication => {
    if (publication.id === book.id) {
      publication.name = name
      publication.borrowed = borrowed
      publication.description = description
      publication.authors = authors
    }
    updatedBook.push(publication)
  })

  library.data = updatedBook
  fs.writeFileSync('./data/books.json', JSON.stringify(library), 'utf-8')

  return book
}

function remove (book) {
  const booksFile = fs.readFileSync('./data/books.json')
  let library = JSON.parse(booksFile)
  let updatedLibrary = []

  library.data.forEach(publication => { if (publication.id !== book.id) updatedLibrary.push(publication) })

  library.data = updatedLibrary
  fs.writeFileSync('./data/books.json', JSON.stringify(library), 'utf-8')

  return book
}

module.exports = { getAll, getOne, create, update, remove }

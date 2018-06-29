const authors = require('../../data/authors')
const fs = require('fs')
const uuid = require('uuid/v4')

function getAll (authorsArr) {
  let matchingAuthors = []

  authors.data.forEach(author => {
    authorsArr.forEach(authorId => {
      if (author.id === authorId) matchingAuthors.push(author)
    })
  })

  return matchingAuthors
}

function getOne (bookAuthorIds, authorId) {
  let author = {}

  bookAuthorIds.forEach(bookAuthorId => {
    if (bookAuthorId === authorId) {
      author = authors.data.filter(author => author.id === authorId)
    }
  })

  return author
}

function create (firstName, lastName, book) {
  const author = { id: uuid().slice(0, 8), firstName, lastName }
  let authorsArr = book.authors
  authorsArr.push(author.id)

  const booksFile = fs.readFileSync('./data/books.json')
  let library = JSON.parse(booksFile)
  library.data.forEach(publication => {
    if (publication.id === book.id) publication.authors = authorsArr
  })

  fs.writeFileSync('./data/books.json', JSON.stringify(library), 'utf-8')

  const authorsFile = fs.readFileSync('./data/authors.json')
  const authors = JSON.parse(authorsFile)
  authors.data.push(author)

  fs.writeFileSync('./data/authors.json', JSON.stringify(authors), 'utf-8')

  return author
}

function update (author, firstName, lastName, book) {
  const authorsFile = fs.readFileSync('./data/authors.json')
  let allAuthors = JSON.parse(authorsFile)
  let updatedAuthor = []

  allAuthors.data.forEach(writer => {
    if (writer.id === author.id) {
      writer.firstName = firstName
      writer.lastName = lastName
    }
    updatedAuthor.push(writer)
  })

  allAuthors.data = updatedAuthor
  fs.writeFileSync('./data/authors.json', JSON.stringify(allAuthors), 'utf-8')

  return allAuthors.data.filter(writer => writer.id === author.id)
}

function remove (author, book) {
  const authorsFile = fs.readFileSync('./data/authors.json')
  let authors = JSON.parse(authorsFile)
  let updatedAuthor = []
  let authorsArr = book.authors
  authorsArr.splice(authorsArr.indexOf(author.id), 1)

  const booksFile = fs.readFileSync('./data/books.json')
  let library = JSON.parse(booksFile)
  library.data.forEach(publication => {
    if (publication.id === book.id) publication.authors = authorsArr
  })

  fs.writeFileSync('./data/books.json', JSON.stringify(library), 'utf-8')

  authors.data.forEach(publication => { if (publication.id !== author.id) updatedAuthor.push(publication) })

  authors.data = updatedAuthor
  fs.writeFileSync('./data/authors.json', JSON.stringify(authors), 'utf-8')

  return author
}

module.exports = { getAll, getOne, create, update, remove }

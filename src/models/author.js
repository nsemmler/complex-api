const authors = require('../../data/authors')
const fs = require('fs')
const uuid = require('uuid/v4')

function getAll () {
  return authors.data
}

function getOne (id) {
  return authors.data.filter(author => author.id === id)
}

function create (firstName, lastName) {
  const author = { id: uuid().slice(0, 8), firstName, lastName }

  const authorsFile = fs.readFileSync('./data/authors.json')
  const library = JSON.parse(authorsFile)
  authors.data.push(author)

  fs.writeFileSync('./data/authors.json', JSON.stringify(authors), 'utf-8')

  return author
}

function update (author, firstName, lastName) {
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

  return author
}

function remove (author) {
  const authorsFile = fs.readFileSync('./data/authors.json')
  let authors = JSON.parse(authorsFile)
  let updatedAuthor = []

  authors.data.forEach(publication => { if (publication.id !== author.id) updatedAuthor.push(publication) })

  authors.data = updatedAuthor
  fs.writeFileSync('./data/authors.json', JSON.stringify(authors), 'utf-8')

  return author
}

module.exports = { getAll, getOne, create, update, remove }

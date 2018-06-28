const model = require('../models/author')

function getAll (req, res, next) {
  const data = model.getAll()
  res.status(200).json({ data })
}

function getOne (req, res, next) {
  const { id }  = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  const author = model.getOne(id)[0]
  if (author === undefined) return next({ status: 404, message: `No author with ID ${id}` })

  res.status(200).json({ author })
}

function create (req, res, next) {
  const { firstName, lastName } = req.body
  if (!firstName || !lastName) return next({ status: 400, message: `Author first and last names are required.` })

  const author = model.create(firstName, lastName)
  res.status(201).json({ author })
}

function update (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  const { firstName, lastName } = req.body
  if (!firstName || !lastName) return next({ status: 400, message: `Author first and last names are required.` })

  let author = model.getOne(id)[0]
  if (author === undefined) return next({ status: 404, message: `No author with ID ${id}` })

  author = model.update(author, firstName, lastName)
  res.status(200).json({ author })
}

function remove (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  let author = model.getOne(id)[0]
  if (author === undefined) return next({ status: 404, message: `No author with ID ${id}` })

  model.remove(author)
  res.status(204).json()
}

module.exports = { getAll, getOne, create, update, remove }

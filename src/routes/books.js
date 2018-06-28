const express = require('express')
const router = express.Router()
const cont = require('../controllers/books')

router.get('/', cont.getAll)
router.get('/:id', cont.getOne)
router.post('/', cont.create)
router.put('/:id', cont.update)
router.delete('/:id', cont.remove)

module.exports = router

const express = require('express')
const router = express.Router({ mergeParams: true })
const cont = require('../controllers/authors')

router.get('/', cont.getAll)
router.get('/:id', cont.getOne)
router.post('/', cont.create)
router.put('/:id', cont.update)
router.delete('/:id', cont.remove)

module.exports = router

const router = require('express').Router();

const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote
} = require('../controllers/notes.controller')

const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.get('/', getAllNotes);
router.post('/', createNewNote);
router.patch('/', updateNote);
router.delete('/', deleteNote);

module.exports = router;

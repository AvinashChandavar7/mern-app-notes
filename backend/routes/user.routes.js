const router = require('express').Router();

const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller')

const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);


router.get('/', getAllUsers);
router.post('/', createNewUser);
router.patch('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;

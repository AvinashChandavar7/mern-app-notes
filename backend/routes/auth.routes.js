const router = require('express').Router();
const loginLimiter = require('../middleware/loginLimiter');
const { login, refresh, logout } = require('../controllers/auth.controller.js');

router.post('/', loginLimiter, login)
router.get('/refresh', refresh)
router.post('/logout', logout)


module.exports = router;



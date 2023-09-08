const router = require('express').Router();
const path = require('path');



router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

module.exports = router;


//! Notes

//* nice thing the express is that recognize regex
//* ^ that say begging of the string only
//* / then $ that say end of the string only
//* that means this will only match if the required route is only / means the root
//* | that say OR
//* /index(html)?

//* '..', 'views', 'index.html'  means ../views/index.html
require('dotenv').config();
require('colors');
require('express-async-errors')
const express = require('express');
const app = express();
const path = require('path');

//*db
const connectDB = require('./config/db');

//* middleware
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');

//* cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

//* routes
const rootRoutes = require('./routes/root.routes')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const noteRoutes = require('./routes/note.routes')

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 3500;

//* Connect to the database
connectDB();

app.use(logger)

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));


app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);


app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found');
  }
})


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`.magenta.bold))
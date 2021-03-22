const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Port and host
const port = 3000;
const hostname = 'localhost';

const app = express();
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(morgan('dev'));

const coursesRouter = require('./routers/coursesRouter')

// Routes
app.use('/api/courses', coursesRouter)

// Default Routes
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});


app.listen(port, hostname, () => console.log(`Server listen http://${hostname}:${port} ...`))
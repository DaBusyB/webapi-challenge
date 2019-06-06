const express = require('express')
const helmet = require('helmet')
const projectRouter = require('./projects/projects-router.js')

const server = express()

server.use(express.json())
server.use(helmet())
server.use('/projects', projectRouter)

server.get('/', (req, res, next) => {  
    res.send(`
      <h2>Sprint Challenge for:</h2>
      <h2>Building RESTful Web APIs with Express and Node.js</h2>
      `);
  });

module.exports = server

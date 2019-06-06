const express = require('express')
const Projects = require('../data/helpers/projectModel.js')
const Actions = require('../data/helpers/actionModel.js')

router = express.Router()

router.get('/', async (req, res) => {
    try {
        const  { id } = req.params 

        const projects = await Projects.get(id);
        res.status(200).json(projects);
    } catch(error) {
        // log error to server
        res.status(500).json({
            message: 'Error retrieving the projects',
        });
    }
  });

module.exports = router

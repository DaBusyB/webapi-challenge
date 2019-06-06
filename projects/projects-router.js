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

router.get('/:id/actions', async (req, res) => {
    try {
        const project = await Projects.getProjectActions(req.params.id)

        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: 'Project not found' })
        }
    } catch(err) { 
        res.status(500).json({ message: 'Error retrieving the project' })
    }
})

router.put('/', async (req, res) => {
    
})

router.post('/', async (req, res) => {

})

router.delete('/', async (req, res) => {

})

module.exports = router

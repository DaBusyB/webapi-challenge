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

router.post('/', async (req, res) => {
    try {
        const project = await Projects.insert(req.body)

        res.status(201).json(project)
    } catch(error) {
        res.status(500).json({ message: 'Error adding the project' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const project = await Projects.update(req.params.id, req.body)

        res.status(200).json(project)
    } catch(error) {
        res.status(500).json({ message: 'Error editing the hub' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const project =  await Projects.remove(req.params.id)

        res.status(200).json({ message: 'The hub has been deleted.' })
    } catch(error) {
        res.status(500).json({ message: 'Error removing the hub' })
    }
})

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
module.exports = router

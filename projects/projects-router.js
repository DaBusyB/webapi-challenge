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
        res.status(500).json({ message: 'Error editing the project' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const project =  await Projects.remove(req.params.id)

        res.status(200).json({ message: 'The project has been deleted.' })
    } catch(error) {
        res.status(500).json({ message: 'Error removing the project' })
    }
})

// ******** Actions Sub-routes ********

router.get('/:id/actions', async (req, res) => {
    try {
        const project = await Projects.getProjectActions(req.params.id)

        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: 'Project not found' })
        }
    } catch(err) { 
        res.status(500).json({ message: 'Error retrieving the actions' })
    }
})

router.post('/:id/actions', async (req, res) => {
    const actionInfo = {...req.body, project_id: req.params.id}

    try {
        const action = await Actions.insert(actionInfo)

        res.status(201).json(action)
    } catch(error) {
        res.status(500).json({ message: 'Error adding the action' })
    }
})

router.put('/:id/actions/:id', async (req, res) => {
    try {
        const action = await Actions.update(req.params.id, req.body)

        res.status(200).json(action)
    } catch(error) {
        res.status(500).json({ message: 'Error editing the action' })
    }
})

router.delete('/:id/actions/:id', async (req, res) => {
    try {
        const action =  await Actions.remove(req.params.id)

        res.status(200).json({ message: 'The action has been deleted.' })
    } catch(error) {
        res.status(500).json({ message: 'Error removing the action' })
    }
})

module.exports = router

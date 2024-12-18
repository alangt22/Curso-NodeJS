const { where } = require('sequelize')
const Task = require('../models/Task')

module.exports = class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }
        await Task.create(task)

        res.redirect('/task')
    }

    static async removeTask(req, res) {
        const id = req.body.id

        await Task.destroy({where: {id: id}})

        res.redirect('/task')
    }

    static async updateTask(req, res) {
        const id = req.params.id

        const task = await Task.findOne({raw: true, where: {id: id}})

        res.render('tasks/edit', {task})
    }

    static async updateTaskPost(req, res) {
        const id = req.body.id

        const task = {
            title: req.body.title,
            description: req.body.description
        }

        await Task.update(task, {where: {id: id}})

        res.redirect('/task')
    }

    static async showTasks(req, res) {

        const tasks = await Task.findAll({raw: true})

        res.render('tasks/all', {tasks})
    }
}


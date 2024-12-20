const { Todo } = require("../models/index");

class todosController {
    static async createTodo(req, res, next) {
        try {
            const { description } = req.body;
            const newTodo = await Todo.create({ description });
            res.status(201).json({
                message: "Created",
                data: newTodo,
            });
        } catch (err) {
            next(err);
        }
    }
    static async getTodos(req, res, next) {
        try {
            const { id } = req.params;
            if (id) {
                const todoData = await Todo.findByPk(id);
                if (!todoData) {
                    throw new Error("NotFound");
                }
                res.status(200).json({
                    message: "Success",
                    data: todoData,
                });
            } else {
                const todoData = await Todo.findAll();
                res.status(200).json({
                    message: "Success",
                    data: todoData,
                });
            }
        } catch (err) {
            next(err);
        }
    }

    static async updateTodo(req, res, next) {
        try {
            const { id } = req.params;
            const { description, status } = req.body;
            const checkTodo = await Todo.findByPk(id);
            if (!checkTodo) {
                throw new Error("NotFound");
            }
            await Todo.update({ description, status }, { where: { id } });
            res.status(201).json({
                message: "Success Update",
                data: checkTodo,
            });
        } catch (err) {
            next(err);
        }
    }
    static async deleteTodo(req, res, next) {
        try {
            const { id } = req.params;
            const checkTodo = await Todo.findByPk(id);
            if (!checkTodo) {
                throw new Error("NotFound");
            }
            await Todo.destroy({ where: { id } });
            res.status(200).json({
                message: "Success Delete",
                data: checkTodo,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = todosController;

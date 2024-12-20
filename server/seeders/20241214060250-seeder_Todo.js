"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const todos = require("../todos.json");
        todos.map((el) => {
            delete el.id;
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Todos", todos, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Todos", todos, {});
    },
};

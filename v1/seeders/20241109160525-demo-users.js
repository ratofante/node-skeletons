"use strict";

const { hashPassword } = require("../utils/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Cumbia González",
          username: "Cumbi",
          email: "cumbia@test.com",
          password: await hashPassword("Cumbia1234!?"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sumo Silvetti",
          username: "Sumerio",
          email: "sumo@test.com",
          password: await hashPassword("Sumo1234!?"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rodrigo González",
          username: "Ro1990",
          email: "rodrigo@test.com",
          password: await hashPassword("Rodrigo1234!?"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", {
      email: {
        [Sequelize.Op.in]: [
          "cumbia@test.com",
          "sumo@test.com",
          "rodrigo@test.com",
        ],
      },
    });
  },
};

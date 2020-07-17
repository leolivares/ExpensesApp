'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'birthday',
        {
          type: Sequelize.DATE,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'password',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'birthday'),
      queryInterface.removeColumn('Users', 'password'),
    ]);
  }
};

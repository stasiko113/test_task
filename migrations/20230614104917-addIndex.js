'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('AdClickData', ['created_at'], {
      using: 'BTREE',
      name: 'idx_created_at',
    });

    await queryInterface.addIndex('AdClickData', ['user_id'], {
      using: 'BTREE',
      name: 'idx_user_id',
    });

    await queryInterface.addIndex('AdClickData', ['source'], {
      using: 'BTREE',
      name: 'idx_source',
    });

    await queryInterface.addIndex('PaymentData', ['create_at'], {
      using: 'BTREE',
      name: 'idx_created_at',
    });

    await queryInterface.addIndex('PaymentData', ['user_id'], {
      using: 'BTREE',
      name: 'idx_user_id',
    });

    await queryInterface.addIndex('Users', ['first_visit'], {
      using: 'BTREE',
      name: 'idx_first_visit',
    });

    await queryInterface.addIndex('Users', ['user_id'], {
      using: 'BTREE',
      name: 'idx_user_id',
    });

    await queryInterface.addIndex('Users', ['from_source'], {
      using: 'BTREE',
      name: 'idx_from_source',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('AdClickData', 'idx_created_at');
    await queryInterface.removeIndex('AdClickData', 'idx_user_id');
    await queryInterface.removeIndex('AdClickData', 'idx_source');

    await queryInterface.removeIndex('PaymentData', 'idx_created_at');
    await queryInterface.removeIndex('PaymentData', 'idx_user_id');

    await queryInterface.removeIndex('Users', 'idx_first_visit');
    await queryInterface.removeIndex('Users', 'idx_user_id');
    await queryInterface.removeIndex('Users', 'idx_from_source');
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      first_visit: {
        type: Sequelize.DATE,
      },
      from_source: {
        type: Sequelize.STRING(255),
      },
    })

    await queryInterface.createTable('AdClickData', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      source: {
        type: Sequelize.STRING(255),
      },
    });

    await queryInterface.createTable('PaymentData', {
      user_id: {
        type: Sequelize.INTEGER,
      },
      create_at: {
        type: Sequelize.DATE,
      },
      transaction_id: {
        type: Sequelize.STRING(255),
        primaryKey: true,
      },
      price: {
        type: Sequelize.STRING(255),
      },
      currency: {
        type: Sequelize.STRING(255),
      },
    });

    // await queryInterface.bulkInsert('AdClickData', await queryInterface.sequelize.query(`
    //   SELECT NULL as id, event_type, create_time as created_at, user_id, JSON_VALUE(data, '$.source') as source
    //   FROM EventsMock 
    //   WHERE event_type IN (0, 2)
    // `));

    // await queryInterface.bulkInsert('PaymentData', await queryInterface.sequelize.query(`
    //   SELECT user_id, create_time as create_at, JSON_VALUE(data, '$.transaction_id') as transaction_id, JSON_VALUE(data, '$.price') as price, JSON_VALUE(data, '$.currency') as currency
    //   FROM EventsMock 
    //   WHERE event_type = 1
    // `));

    // await queryInterface.bulkInsert('Users', await queryInterface.sequelize.query(`
    //   SELECT DISTINCT em2.user_id, MIN(em2.create_time), JSON_VALUE(CONCAT('[', GROUP_CONCAT(em.data SEPARATOR ','), ']'), '$[0].source') as source
    //   FROM EventsMock AS em2
    //   JOIN EventsMock AS em ON em.user_id = em2.user_id AND em.create_time = em2.create_time AND em.event_type = 0
    //   WHERE em2.event_type = 0
    //   GROUP BY em2.user_id;
    // `))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PaymentData');
    await queryInterface.dropTable('AdClickData');
    await queryInterface.dropTable('Users');
  },
};

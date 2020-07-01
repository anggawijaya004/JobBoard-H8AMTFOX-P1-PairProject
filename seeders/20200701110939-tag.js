'use strict';

const fs = require('fs')
const dataTag = JSON.parse(fs.readFileSync('tag.json','utf-8'))

for(let i = 0; i < dataTag.length; i++) {
  dataTag[i].createdAt = new Date()
  dataTag[i].updatedAt = new Date()
}

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', dataTag, {});
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};

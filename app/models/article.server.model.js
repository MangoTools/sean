'use strict';

/**
* Article Schema
*/
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Article', {
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate: { notNull: true, msg: 'Title cannot be blank'}
        },
        content: {
            type: Sequelize.STRING,
            defaultValue: ''
        }
        // User : ref 'User'
    });
};

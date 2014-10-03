'use strict';

/**
* Article Schema
*/
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Article', {
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: { notNull: true, msg: 'Title cannot be blank'}
        },
        content: {
            type: DataTypes.TEXT,
            defaultValue: ''
        }
        // User : ref 'User'
    });
};

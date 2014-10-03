'use strict';

/**
* Article Schema
*/
module.exports = function(sequelize, DataTypes) {
    var Article = sequelize.define('Article', {
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
    },
    {
        associate: function(models){
            Article.belongsTo(models.User);
        }
    });
    return Article;
};

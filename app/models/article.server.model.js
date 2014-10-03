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
            allowNull: false
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

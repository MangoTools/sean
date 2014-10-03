/**
 * Created by jbblanc on 03/10/2014.
 */
/**
 * Session Model
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Session', {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true
        }
        , data: DataTypes.TEXT
    });
};

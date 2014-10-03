/**
 * Created by bosc on 03/10/2014.
 */
var winston = require('winston');
winston.emitErrs = true;

module.exports = function(env){
    var ret;
    if(env==='production'){
        ret = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: 'error',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })
            ],
            exitOnError: false
        });
    }else if(env==='development'){
        ret = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                }),
                new winston.transports.File({
                    level: 'info',
                    filename: './server.log',
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880, //5MB
                    maxFiles: 5,
                    colorize: false
                })
            ],
            exitOnError: false
        });
    }else{
        //Else return default logger
        return new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })
            ],
            exitOnError: false
        });
    }
    ret.stream = {
        write: function(message, encoding){
            logger.info(message);
        }
    };

    return ret;
};

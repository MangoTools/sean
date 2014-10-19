sean
====


SEAN is an full-stack javascript open-source framework based on SQL (Sequelize Express Angular and Node).
It provides everything needed  to build applications with [Sequilize](http://www.sequelize.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/).
This project  found it's root on [MEANJS](http://meanjs.org) project.

This is a great tool that we love to use, but as we need a relational database for some of our projects, we decided to make our own fork using Sequelize and Postgres instead of Mongo db.

 The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.
 
But That's not all SEAN natively implement web-token authentication and ACL based authorization both on Front and Backend as well as [Socket.io](http://socket.io/). Winston logger is as well implemented to kepp track with what is going on in your app.
Simply use the logger class from anywhere in your app to get nice formatted output. you can redirect your logs in files for production too.

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a SEAN application:
* Sequelize - Go through [Sequilize Official Website](http://sequelize.org/) and looking at their API documentation.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), particularly [The Express Guide](http://expressjs.com/guide.html); you can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and the [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* Postgres / mySQL / any SQL engine - Install your required database engine and checkout later how to set it up
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

## Downloading SEAN
There are several ways you can get the MEAN.JS boilerplate:

### Yo Generator
The recommended way would be to use the [Official Yo Generator](https://github.com/MangoTools/generator-sean) which will generate the latest stable copy of the SEANboilerplate and supplies multiple sub-generators to ease your daily development cycles.

### Cloning The GitHub Repository
You can also use Git to directly clone the SEAN repository:
```
$ git clone  git@github.com:MangoTools/sean.git  sean
```
This will clone the latest version of the SEAN repository to a **sean** folder.


## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop you SEAN application.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application, to learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower installcommand to install all the front-end modules needed for the application


## Configure your DB engine

SEAN is relational database  agnostic but there is a couple off steps that needs to be done for your particular Database Engine:

First Edit your configs files in /app/config/env  (development.js,production.js and test.js needs to be edited).
The following portion of the file is the part you require for database setup

```
db: {
       dbName:'sean-dev',
       username : 'SeanDB',
       password : 'HU7XQQBNWq',
       dialect: "postgres", // 'sqlite', 'postgres', 'mariadb','mysql'
       port : 5432 //    5432 for postgres, 3306 for mysql and mariaDB ,
    },
```

Then configure your database engine with the same settings and your are all set ready to go.

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! your application should be running by now, to proceed with your development check the other sections in this documentation.
If you encounter any problem try the Troubleshooting section.

## Session secret.

your express session secret is located in /app/config/env/all.js and look like this : 
```
secret: 'SEAN - Need to be Changed'
```
YOU NEED TO CHANGE YOUR SESSION SECRET BEFORE GOING IN PRODUCTION to avoid security issues. In fact do it first thing so your don't forget


## Community

* Join #seanJS on freenode.
* Discuss it in the new [Google Group](https://groups.google.com/d/forum/sean)

## Next step

Improve testing trough out

## Contribution

You wish to contribute to this generate, no problem keep in touch and we will find ways :)

## Credits
Inspired by the great work of the [MEANJS](http://meanjs.org) team.

and indirectly by [Madhusudhan Srinivasa](https://github.com/madhums/)
The MEAN name was coined by [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)
The SEAN name is coined by [The Mango Tools team](http://mango.tools/sean)
## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

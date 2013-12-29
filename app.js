/**
 * Module dependencies.
 */

var io = require('socket.io').listen(3001)
    , connect = require('connect')
    , http = require('http')
    , directory = 'public/app/'
    , aws_func = require('./aws_wrapper.js')
    , c = require('./constants.js');

var aws = new aws_func();

io.sockets.on('connection', function (socket) {
    // on connect
    socket.emit(c.CONNECTED, c.CONNECTED);

    /**** Dynamo *****/
    // get requests
    socket.on(c.DYN_GET_MEDIA, function () {
        aws.DyanmoMedia.getAll(socket);
    });
    socket.on(c.DYN_GET_USER_MEDIA, function (user) {
        aws.DyanmoMedia.getUserMedia(user, socket);
    });
    socket.on(c.DYN_GET_USERS, function () {
        aws.DyanmoUsers.getAll(socket);
    });

    // put requests
    socket.on(c.DYN_UPDATE_MEDIA, function (media) {
        aws.DyanmoMedia.addUpdateMedia(media, socket);
    });
    socket.on(c.DYN_UPDATE_USER, function (user) {
        aws.DyanmoUsers.addUpdateUser(user, socket);
    });

    // delete requests
    socket.on(c.DYN_DELETE_USER, function (userId) {
        aws.DyanmoUsers.deleteDynUser(userId, socket);
    });

    /**** RDS *****/
    // RDS get requests
    socket.on(c.RDS_GET_MEDIA, function () {
        aws.RdsMedia.getAll(socket);
    });
    socket.on(c.RDS_GET_USER_MEDIA, function (user) {
        aws.RdsMedia.getUserMedia(user, socket);
    });
    socket.on(c.RDS_GET_USERS, function () {
        aws.RdsUsers.getAll(socket);
    });

    // RDS put requests
    socket.on(c.RDS_UPDATE_MEDIA, function (media) {
        aws.RdsMedia.addUpdateMedia(media, socket);
    });
    socket.on(c.RDS_UPDATE_USER, function (user) {
        aws.RdsUsers.addUpdateUser(user, socket);
    });

    // RDS delete requests
    socket.on(c.RDS_DELETE_USER, function (userId) {
        aws.RdsUsers.deleteDynUser(userId, socket);
    });

});

connect()
    .use(connect.static(directory))
    .listen(3000);

console.log('Listening on port 3000.');
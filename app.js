var restify = require('restify');
var builder = require('botbuilder');

var appId = process.env.appid || 'YourAppId';
var appSecret = process.env.appsecret || 'YourAppSecret';

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({
    appId: appId,
    appSecret: appSecret
});

bot.add('/', function (session) {
    session.send('Hello World');
});

// Setup Restify Server
var server = restify.createServer();

server.get(/.html/, restify.serveStatic({
    directory: __dirname
}));

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});

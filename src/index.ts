import { Client } from 'discord.js';
import DiscordConfig from './config/discord.json';
import { isTurnipPriceMessage, parseTurnipMessage } from './messages/turnip-price/turnip-price';
import { Store } from './store';

const client = new Client();
const store = new Store({});

client.on('ready', () => {
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

client.on('message', msg => {
    if (isTurnipPriceMessage(msg.content)) {
        const price = parseTurnipMessage(msg.content);
        store.storePriceForUser(msg.author.id, price);
        msg.reply('Got it!');
    } else if (msg.content === 'price me') {
        msg.reply(store.latestPriceForUser(msg.author.id));
    }
});

client.login(DiscordConfig.token);

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = (msg: string, callback: () => void): void => {
    console.log('Shutting down server for ' + msg);
    client.removeAllListeners();
    callback();
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});

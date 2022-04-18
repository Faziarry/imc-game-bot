import "dotenv/config"
import { Client, Intents, Collection } from 'discord.js'
import { IBot, IBotCommand, IBotEvent } from "./types"
import fs from 'fs';

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
}) as IBot
client.commands = new Collection()

const token = process.env.BOT_TOKEN!

const eventFiles = fs.readdirSync("./src/events").filter(f => f.endsWith(".ts"))
for (const file of eventFiles) {
    const event = require(`./events/${file.substring(0, file.length-3)}`).default as IBotEvent<any>
    if (!event.once) {
        client.on(event.name, event.run.bind(null, client))
    } else {
        client.once(event.name, event.run.bind(null, client))
    }
}

client.login(token)
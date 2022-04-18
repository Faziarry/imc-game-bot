import "dotenv/config"
import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';
import { Event, IBot, IBotCommand } from "../types";
import fs from "fs"

export default Event({
    name: "ready",
    once: true,
    run(client) {
        console.log(`${client.user?.tag} is online`)

        const commands: object[] = []
        const commandFiles = fs.readdirSync("./src/commands").filter(f => f.endsWith(".ts"))

        for (const file of commandFiles) {
            const command = require(`../commands/${file.substring(
                0, file.length-3)}`).default as IBotCommand
            client.commands.set(command.data.name, command)
            commands.push(command.data.toJSON())
        }

        const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN!)
        rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID!,
                process.env.GUILD_ID!
            ),
            { body: commands }
        );
    }
})
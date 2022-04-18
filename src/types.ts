import { Client, ClientEvents, Collection, CommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

interface IBotCommand {
    data: SlashCommandBuilder
    run: (interaction: CommandInteraction, client: IBot) => void
}

interface IBotEvent<T extends keyof ClientEvents> {
    name: T
    run: (client: IBot, ...args: ClientEvents[T]) => void
    once?: boolean
}

const Event = <T extends keyof ClientEvents>(event: IBotEvent<T>) => event

interface IBot extends Client {
    commands: Collection<string, IBotCommand>
}

export { IBot, IBotCommand, IBotEvent, Event }
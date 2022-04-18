import { Event } from "../types";

export default Event({
    name: "interactionCreate",
    run(client, interaction) {
        if (!interaction.isCommand()) return
        const command = client.commands.get(interaction.commandName)
        if (!command) return
        
        try {
            command.run(interaction, client)
        } catch(e) {
            console.error(e)
            interaction.reply({ content: "Oops, an error ocurred!", ephemeral: true })
        }
    }
})
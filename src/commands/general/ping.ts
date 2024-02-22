import { Command } from "@structures/command";

export default new Command({
    name: "ping",
    description: "Ping pong!",
    run: async(client, interaction, args) => {
        return await interaction.reply("Pong!");
    }
});
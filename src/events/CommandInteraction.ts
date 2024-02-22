
import { Event } from "@structures/event";
import { client } from "@index";
import { CmdInteraction } from "@structures/cmdoptions";
import { CommandInteractionOptionResolver, GuildMemberRoleManager } from "discord.js";
import embed from "@utils/embed";
import cf from '@configs/embed.json';

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (command.roles) {
        for (const role of command.roles) {
            let mRole = (interaction.member?.roles as GuildMemberRoleManager).cache;
            let gRole = (interaction.guild?.roles.cache.get(role as string));
            if (!mRole.has(gRole!.id)) {
                let errEmbed = await embed({ title: "ERROR", description: "Missing Permission", color: cf.errColor });
                return await interaction.reply({ embeds: [errEmbed] }); 
            }
        }
    }

    await command.run(client, interaction as CmdInteraction, interaction.options as CommandInteractionOptionResolver);
    

});
import { Command } from "@structures/command";
import { rcon } from "@utils/rcon";
import embed from "@utils/embed";
import cf from "@configs/embed.json";
import { APIEmbed } from "discord.js";
import { whitelistrole_ID } from "@configs/discord.json";
import { Steam64IDvaildator } from "@utils/steamidvalidator";

export default new Command({
    name: "whitelist",
    description: "Whitelist a user",
    options: [
        {
            name: "link",
            description: "The user to whitelist",
            type: 3,
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        await interaction.deferReply();
        let response
        const Steamlink = args.getString("link");
        let user: any = await Steam64IDvaildator(Steamlink ?? "");

        if (user[1] == "Success") {
            rcon.connect().then(async () => {
                await rcon.send(`oxide.grant user ${user[0]} whitelist.allow`);
                response = embed({
                    title: "Whitelist",
                    description: `Successfully whitelisted \`${user[0]}\``,
                    color: cf.successColor
                });
                rcon.disconnect();
                return await interaction.followUp({ embeds: [(await response).toJSON()] });
                
            }).catch(async (e) => {
                response = embed({
                    title: "Whitelist",
                    description: `An error occured: \`${e}\``,
                    color: cf.errColor
                });
                rcon.disconnect();
                return await interaction.followUp({ embeds: [(await response).toJSON()] });
            });
        } else {
            
            return await interaction.followUp({ embeds: [user as APIEmbed] });
        }
    
    }
});

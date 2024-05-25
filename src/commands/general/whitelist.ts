import { Command } from "@structures/command";
import { rcon } from "@utils/rcon";
import embed from "@utils/embed";
import cf from "@configs/embed.json";
import { ignCheck } from "@utils/igncheck";
import { APIEmbed } from "discord.js";
import { whitelistrole_ID } from "@configs/discord.json";

export default new Command({
    name: "whitelist",
    description: "Whitelist a user",
    roles: [whitelistrole_ID],
    options: [
        {
            name: "ign",
            description: "The user to whitelist",
            type: 3,
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        await interaction.deferReply();
        let response
        const ign = args.getString("ign");

        let user = await ignCheck(ign ?? "");
        
        if(user == "Success"){

            rcon.connect().then(async () => {
                await rcon.send(`whitelist add ${ign}`);
                response = embed({
                    title: "Whitelist",
                    description: `Successfully whitelisted \`${ign}\``,
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

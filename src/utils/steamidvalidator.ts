import  axios  from "axios";
import embed from "@utils/embed";
import cf from "@configs/embed.json";
import { codeBlock } from "discord.js";

export const Steam64IDvaildator = async (id: string) => {
    return new Promise(async (resolve, reject) => {
    let user
    let errEmbed
        if (id.includes("steamcommunity.com/id/")) {
            let CustomID = id.split("/")[4]
            try {
                
                user = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAMAPI}&vanityurl=${CustomID}`);

            } catch (e: any) {
                if (e.response.status == 404){
                    errEmbed = embed({
                        title: "ERROR",
                        description: `Invaild Steam64ID: \`${CustomID}\`. Try again with a vaild Steam64ID`,
                        color: cf.errColor
                    });
                    resolve(errEmbed); 
                }

            }  

            if(!user){
                errEmbed = await embed({ title: 'Error', color: cf.errColor, description: `Invalid Steam64ID provided.` })
                reject(errEmbed)
            } else if (user.status == 200){
                resolve([user.data.response.steamid, "Success"]);
            } else if (user.status == 404){
                errEmbed = await embed({ title: "Error", color: cf.errColor, description: `Invaild Steam64ID: Steam64ID given \`${CustomID}\`. Try again with a vaild Steam64ID` });
                reject(errEmbed);
            } else {
                errEmbed = await embed({ title: "Error", color: cf.errColor, description: `An unknown error occured` });
                reject(errEmbed);
            }



        } else if (id.includes("steamcommunity.com/profiles/")) {
            let SteamID = id.split("/")[4]
            try{

                user = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAMAPI}&steamids=${SteamID}`);
                
            } catch (e: any) {
                if (e.response.status == 404){
                    errEmbed = embed({
                        title: "ERROR",
                        description: `Invaild Steam64ID: \`${SteamID}\`. Try again with a vaild Steam64ID`,
                        color: cf.errColor
                    });
                    resolve(errEmbed); 
                }
            }

            if(!user){
                errEmbed = await embed({ title: 'Error', color: cf.errColor, description: `Invalid Steam64ID provided.` })
                reject(errEmbed)
            } else if (user.status == 200){
                resolve([SteamID, "Success"]);
            } else if (user.status == 404){
                errEmbed = await embed({ title: "Error", color: cf.errColor, description: `Invaild Steam64ID: Steam64ID given \`${SteamID}\`. Try again with a vaild Steam64ID` });
                reject(errEmbed);
            } else {
                errEmbed = await embed({ title: "Error", color: cf.errColor, description: `An unknown error occured` });
                reject(errEmbed);
            }
        
        }
    });
}
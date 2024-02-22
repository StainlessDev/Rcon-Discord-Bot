import  axios  from "axios";
import embed from "@utils/embed";
import cf from "@configs/embed.json";
import { codeBlock } from "discord.js";

export const ignCheck = async (ign: string) => {
    return new Promise(async (resolve, reject) => {
    let user
    let errEmbed
    let UpIGN = ign.toUpperCase();
        try {
            
            user = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${ign}`);


        } catch (e: any) {

            
            if (e.response.status == 404){
                errEmbed = embed({
                    title: "ERROR",
                    description: `Invaild IGN: \`${UpIGN}\`. Try again with a vaild ign`,
                    color: cf.errColor
                });
                resolve(errEmbed); 
            }
        }

        if(!user){
            errEmbed = await embed({ title: 'Error', color: cf.errColor, description: `Invalid IGN provided.` })
            reject(errEmbed)
        } else if (user.status == 200){
            resolve("Success");
        } else if (user.status == 404){
            errEmbed = await embed({ title: "Error", color: cf.errColor, description: `Invaild IGN: IGN given \`${UpIGN}\`. Try again with a vaild ign` });
            reject(errEmbed);
        } else {
            errEmbed = await embed({ title: "Error", color: cf.errColor, description: `An unknown error occured` });
            reject(errEmbed);
        }
    });
};

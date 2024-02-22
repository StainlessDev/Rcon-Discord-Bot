import  cf  from '@configs/embed.json';
import { ColorResolvable, EmbedBuilder } from "discord.js";


export default async function embed(v: any) {
    const embed = new EmbedBuilder()
    v.title ? embed.setTitle(v.title) : embed.setTitle(cf.title)
    v.color ? embed.setColor(v.color) : embed.setColor(cf.color as ColorResolvable)
    v.footer ? embed.setFooter({ text: v.footer, iconURL: cf.footerIcon }) : embed.setFooter({ text: cf.footer, iconURL: cf.footerIcon})

    if (v.description) embed.setDescription(v.description)
    if (v.fields) {
        for (const field of v.fields) {
            embed.addFields(field.name, field.value, field.inline)
        }
    }
    if(v.image) embed.setImage(v.image)
    if(v.thumbnail) embed.setThumbnail(v.thumbnail)
    if(v.url) embed.setURL(v.url)
    if(v.author) embed.setAuthor(v.author.name)
    embed.setTimestamp()
    return embed
}
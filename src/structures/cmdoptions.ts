import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, RoleResolvable, User } from "discord.js"
import { BotClient } from "@structures/client"

export interface CmdInteraction extends CommandInteraction {
    member: GuildMember,
}

export type CmdOptions = {
    name: string,
    description: string,
    roles?: RoleResolvable[],
    options?: any[], 
    run: (client: BotClient, interaction: CmdInteraction, args: CommandInteractionOptionResolver) => any
} & ChatInputApplicationCommandData
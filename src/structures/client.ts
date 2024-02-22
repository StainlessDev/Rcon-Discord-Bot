import { ApplicationCommandDataResolvable, Client, REST, Routes, Collection, ActivityType } from "discord.js";
import { glob } from "glob";
import cf from  "@configs/discord.json";
import { CmdOptions } from "@structures/cmdoptions";


export class BotClient extends Client {

    commands: Collection<string, CmdOptions> = new Collection();
    static commands: any;


    
    constructor() {
        super({ intents: ["Guilds", "GuildMessages", "GuildMessageReactions"] });
    }

    async start(token: string) {
        await this.starting();
        this.login(token);
    }

    async loadCommands({commands}: {commands: ApplicationCommandDataResolvable[]}) {
        
        if (process.env.TOKEN === undefined) {
            throw new Error("Token is not defined");
        }
        if (process.env.CLIENTID === undefined) {
            throw new Error("Client ID is not defined");
        }

        let  rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
        .then(() => console.log("Successfully registered application commands."))
        .catch((err) => console.log(err));
    }

    async starting () {

        const cmds: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await glob("./src/commands/**/*");
        commandFiles.forEach(async (file) => {
            if(file.endsWith(".ts")) {
                const command = await import(`${__dirname}/../../${file}`);
                cmds.push(command.default);
                this.commands.set(command.default.name, command.default);
            }
        });



        this.on("ready", () => {
            switch (cf.ActivityType) {
                case "PLAYING":
                    this.user?.setPresence({ activities: [{ name: cf.status, type: ActivityType.Playing}], status: "online" });
                    break;
                case "WATCHING":
                    this.user?.setPresence({ activities: [{ name: cf.status, type: ActivityType.Watching}], status: "online" });
                    break;
                case "LISTENING":
                    this.user?.setPresence({ activities: [{ name: cf.status, type: ActivityType.Listening}], status: "online" });
                    break;
                case "STREAMING":
                    this.user?.setPresence({ activities: [{ name: cf.status, type: ActivityType.Streaming}], status: "online" });
                    break;
                default:
                    this.user?.setPresence({ activities: [{ name: cf.status, type: ActivityType.Custom}], status: "online" });
                    break;
            } 

            // its putting the commands in the collection but not registering them in the discord api 
            
            this.loadCommands({commands: cmds});
            console.log(`Logged in as ${this.user?.tag}!`);
        });

        const eventFiles = await glob("./src/events/**/*");
        eventFiles.forEach(async (file) => {
            if(file.endsWith(".ts")) {
                const event = await import(`${__dirname}/../../${file}`);
                this.on(event.default.name, event.default.run);
            }
        });
    }
}


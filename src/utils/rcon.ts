import Rcon from "rcon-ts";


export const rcon = new Rcon({
    host: process.env.RCON_HOST as string,
    port: parseInt(process.env.RCON_PORT as string),
    password: process.env.RCON_PASSWORD as string
});
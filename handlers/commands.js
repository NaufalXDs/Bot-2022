const {
    readdirSync
} = require("fs");
const { glob } = require("glob");
// const globPromise = promisify(glob);

// /**
//  * @param {Client} client
//  */
console.log("Welcome".yellow);
module.exports = async (client) => {
    // const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    //         commandFiles.map((value) => {
    //             const file = require(value);
    //             const splitted = value.split("/");
    //             const directory = splitted[splitted.length - 2];
                
    //             if (file.name) {
    //                 const properties = { directory, ...file };
    //                 client.commands.set(file.name, properties);
    //             }
    //         });

    try {
        let amount = 0;

        readdirSync("./commands/").forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../commands/${dir}/${file}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    amount++;
                } else {
                    console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
            }
        });
        console.log(`${amount} Commands Loaded`.brightGreen);
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
};

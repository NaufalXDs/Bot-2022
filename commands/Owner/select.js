const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var settings = require(`../../botconfig/settings.json`);

module.exports = {
    name: 'select',
    category: "Owner",
    aliases: ["select"],
    cooldown: 5,
    usage: "select",
    description: "",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: settings.ownerIDS, //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

    /***
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     run: async (client, message, args) => {
        const directories = [
             ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) =>
              `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
                
        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.directory = dir)
                .map ((cmd) => {
                    return {
                        name: cmd.name || "there is no name",
                        description:
                            cmd.description ||
                            "there is no description for this command",
                    };
                });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new MessageEmbed().setDescription(
            "Pleae choose a category in the dropdown menu"
        );

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu ()
                    .setCustomId("help-menu")
                    .setPlaceholder("Please select a category")
                    .setDisabled(state)
                    .add0ptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                            };
                        })
                    )
            )
        ];

        const initialMessage = await message.channel.send ({
            embeds: [embed],
            components: components(false)
        })

        const filter = (interaction) =>
            interaction.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
            //time: 5000,
        });

        collector.on('collect', (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const categoryembed = new MessageEmbed()
                .setTitle(`${directory} commands`)
                .setDescription("Here are the list of commands")
                .setImage('https://share.creavite.co/EjKf5pe1zUjkjIdt.gif')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: '\`🔰${cmd.name}\`',
                            value: cmd.description,
                            inline: true,
                        }
                    })
                );

            interaction.update({ embeds: [categoryembed]})
        });

        collector.on("end", () => {
            initialMessage.edit({ components: components(true) });
        });

    },
};
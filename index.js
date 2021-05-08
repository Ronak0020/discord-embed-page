const { MessageEmbed } = require("discord.js");

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array} array 
 * @param {Number} perpage 
 * @param {String} args 
 * @param {Options} embedOptions  
 */

const createPage = async (client, message, array, perpage = 5, args = false, { forward = "▶", backward = "◀", title, color = "#009696", footer }) => {

    let first = args ? (Number(args) - 1) * perpage : 0;
    let second = args ? perpage * Number(args) : perpage;

    const embed = new MessageEmbed();
    embed.setColor(color)
    title ? embed.setTitle(title) : null;
    embed.setDescription(`${array.slice(0, perpage).join("\n")}`);
    embed.setTitle(AUTHOR, message.guild.iconURL())
    embed.setFooter(footer || client.user.username, client.user.displayAvatarURL())
    embed.setTimestamp()

    let pageno = 1;
    const msg = await message.channel.send({
        embed: embed
    });

    if (array.length > perpage) {
        await msg.react(backward);
        await msg.react(forward);

        const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
            time: 120000
        });
        collector.on('collect', (r) => {
            const reactionadd = array.slice(first + perpage, second + perpage).length;
            const reactionremove = array.slice(first - perpage, second - perpage).length;

            if (r.emoji.name === forward && reactionadd !== 0) {
                pageno = pageno + 1
                r.users.remove(message.author.id);

                first += perpage;
                second += perpage;
                embed.setDescription(`${array.slice(first, second).join("\n")}`);
                embed.setFooter(footer || client.user.username, client.user.displayAvatarURL())
                msg.edit({
                    embed: embed
                });
            }
            else if (r.emoji.name === backward && reactionremove !== 0) {
                r.users.remove(message.author.id);
                pageno = pageno - 1
                first -= perpage;
                second -= perpage;
                embed.setDescription(`${array.slice(first, second).join("\n")}`);
                embed.setFooter(footer || client.user.username, client.user.displayAvatarURL())
                msg.edit({
                    embed: embed
                })
            }
        });
        collector.on('end', () => {
            msg.reactions.removeAll();
        })
    }
}

/**
 * @param {Discord.Client} client 
 * @param {String} color 
 * @param {String} title 
 * @param {String} description 
 * @param {String} footer 
 * @returns (Discord.MessageEmbed)
 */

const createEmbed = (client, color, title, description, footer) => {
    return new MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setFooter(footer || client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(description);
}

module.exports = {
    createPage,
    createEmbed
}
const Discord = require('discord.js');
const Welcome = require('../../database/models/Welcome');



module.exports = {
    name: 'skip',
    description: 'Passe la musique actuelle',
    cat: 'music',
    aliases: ["next", 's'],
    botpermissions: ['CONNECT', 'SPEAK'],

    async execute(message, args) {

        if (message.guild.settings.dj_system) {
            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
                let MissingRole = await message.translate("MISSING_ROLE");
                let Missingperm = await message.translate("MISSING_PERMISSIONS");
                let role = message.guild.roles.cache.get(message.guild.settings.dj_system)
                if (!role) return message.errorMessage(Missingperm.replace("{perm}", 'MANAGE_MESSAGES'))
                if (message.member.roles.cache) {
                    if (!message.member.roles.cache.has(role.id)) {
                        return message.errorMessage(MissingRole.replace("{perm}", 'MANAGE_MESSAGES').replace("{role}", role.name))
                    }
                } else {
                    return message.errorMessage(MissingRole.replace("{perm}", 'MANAGE_MESSAGES').replace("{role}", role.name))
                }
            }
        }
        const voice = message.member.voice.channel;
        if (!voice) {
            let err = await message.translate("NOT_VOC")
            return message.errorMessage(err)
        }
        const queue = message.client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            let err = await message.translate("NOT_MUSIC")
            return message.errorMessage(err)

        }
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            let err = await message.translate("NOT_SAME_CHANNEL")
            return message.errorMessage(err);
        }
        let a = await message.translate("SKIP")
        message.channel.send(a)

        queue.skip();










    },
};
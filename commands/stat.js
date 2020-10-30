exports.run = (bot, message, args) => {
	let serveur = message.guild;
	let msg = new bot.discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Statistique de PC[i]')
        .setThumbnail('https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png')
        .setDescription('Voici quelques statistiques sur le serveur PC[i]')
        .setTimestamp()
        .setFooter('Si vous avez un problème n\'hesitez pas à contacter le staff de PCi', 'https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png');

	// on s'assure que tous les membres sont dans le cache serveur
	serveur.fetch();
	serveur.members.fetch();
	//Préparation
	const msg_membres =
`Le serveur compte actuellement ${serveur.memberCount} membres, dont\n` +
['L1','L2','L3','L3 Pro','M1','M2','Doctorant','Enseignant']
		.map( R => ` ► ${serveur.roles.cache.find( e => e.name === R ).members.size} ${R}` )
		.join('\n')
;
	const msg_bot =
`uptime : ${ getDurationString( (new Date()) - bot.beginTimeStamp ) }`
;
	msg.addField('Membres', msg_membres);
	msg.addField('PC[bot]', msg_bot);
	msg.addField('à venirs', "d'autre statistiques vont bientôt être disponible!!!");
	message.reply(msg);
}

// Définition des aliase
exports.config = {
    aliases: ["stats"]
};

// Génération automatique de la commande help
exports.help = {
    name:"STAT",
    description:"Vous renvoie certaines statistiques",
    usage:"stat"
}

function getDurationString(duration) {
	const ms = duration%1000; duration=Math.floor(duration/1000);
	const s = duration%60; 	duration=Math.floor(duration/60);
	const m = duration%60; 	duration=Math.floor(duration/60);
	const h = duration%24; 	duration=Math.floor(duration/24);
	const j = duration;
	
	let rep = '';
	if(s >0) rep += s + 'seconde(s)'+' ';
	if(m >0) rep += m + 'minute(s)'+' ';
	if(h >0) rep += h + 'heure(s)'+' ';
	if(j >0) rep += j + 'jour(s)'+'.';
	return rep;
}
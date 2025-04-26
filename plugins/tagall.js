import config from '../config.cjs';

const tagAll = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    // Vérification de la commande
    const validCommands = ['tagall'];
    if (!validCommands.includes(cmd)) return;

    // Vérifie que la commande est dans un groupe
    if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");

    // Récupère les données du groupe
    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const groupName = groupMetadata.subject;  // Nom du groupe

    // Crée un tableau avec les IDs des participants pour la mention
    const participantIds = participants.map(p => p.id);

    // Crée le message à envoyer
    let message = `乂 *Attention Everyone* 乂\n\n*Message:* ${text || 'no message'}\n\n`;
    message += participantIds.map(id => `❒ @${id.split('@')[0]}`).join('\n') + '\n\n`;
    message += `BY INCONNU-XD\n*Group:* ${groupName}`;

    // Envoie le message avec l'image et mentions
    await gss.sendMessage(m.from, { 
      image: { url: 'https://files.catbox.moe/230q0c.jpg' }, 
      caption: message, 
      mentions: participantIds 
    }, { quoted: m });

  } catch (error) {
    console.error('Error:', error);
    await m.reply('An error occurred while processing the command.');
  }
};

export default tagAll;

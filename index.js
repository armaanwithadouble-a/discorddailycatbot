const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');
const axios = require('axios');

// Bot configuration
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// Store active channels for cat sending
const activeChannels = new Set();

// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

// Command definition
const commands = [
    new SlashCommandBuilder()
        .setName('startdailycatshere')
        .setDescription('Start sending daily cat images in this channel')
        .toJSON()
];

// Register slash commands
async function registerCommands() {
    try {
        const rest = new REST({ version: '10' }).setToken(TOKEN);
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('Slash commands registered successfully');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}

// Fetch random cat image
async function fetchRandomCat() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        return response.data[0].url;
    } catch (error) {
        console.error('Error fetching cat image:', error);
        return 'https://placekitten.com/400/300'; // Fallback
    }
}

// Send cat image to a channel
async function sendCatToChannel(channelId) {
    try {
        const channel = await client.channels.fetch(channelId);
        if (channel) {
            const catImageUrl = await fetchRandomCat();
            await channel.send({
                content: '🐱 Here\'s your random cat!',
                files: [catImageUrl]
            });
            console.log(`Sent cat to channel ${channelId}`);
        }
    } catch (error) {
        console.error(`Error sending cat to channel ${channelId}:`, error);
    }
}

// Send cats to all active channels
async function sendCatsToAllChannels() {
    for (const channelId of activeChannels) {
        await sendCatToChannel(channelId);
    }
}

// Bot ready event
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await registerCommands();
    
    // Start the cat sending loop (every minute)
    setInterval(sendCatsToAllChannels, 60 * 1000);
    console.log('Cat sending loop started - every minute');
});

// Interaction event for slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'startdailycatshere') {
        const channelId = interaction.channelId;
        
        if (activeChannels.has(channelId)) {
            await interaction.reply({
                content: '❌ Daily cats are already running in this channel!',
                ephemeral: true
            });
            return;
        }

        activeChannels.add(channelId);
        await interaction.reply({
            content: '✅ Daily cats started! This channel will receive a random cat image every minute.',
            ephemeral: true
        });

        // Send first cat immediately
        await sendCatToChannel(channelId);
        
        console.log(`Started daily cats in channel ${channelId}`);
    }
});

// Login
client.login(TOKEN);

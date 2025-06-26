/**
 * banksetup.js - Discord Bot Bank Setup Command
 * 
 * Purpose: Sets up persistent bank interaction buttons in a specified channel.
 * Provides users with easy access to bank viewing and item request functionality.
 * 
 * Author: Assistant (OpenAI)
 * Version: 2.1.0
 * Created: 2024
 * 
 * Features:
 * - Staff permission validation
 * - Persistent bank interface buttons
 * - External bank website link (configurable)
 * - Interactive request button
 * - Channel validation, logging, and error handling
 */

const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags,
    PermissionFlagsBits
} = require('discord.js');
const config = require('../../config'); // Must include `bankUrl` key!

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banksetup')
        .setDescription('[STAFF] Sets up the persistent bank interaction buttons in a channel.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the bank buttons message to.')
                .setRequired(true)
        ),

    async execute(interaction) {
        const allowedRoleIds = [
            '1310687118363852912', // officer
            '1380709191517212723'  // bank
        ];

        const hasAllowedRole = interaction.member.roles.cache.some(role =>
            allowedRoleIds.includes(role.id)
        );

        const hasManageGuild = interaction.member.permissions.has(PermissionFlagsBits.ManageGuild);

        if (!hasAllowedRole && !hasManageGuild) {
            return interaction.reply({
                content: '❌ You do not have permission to use this command.',
                flags: MessageFlags.Ephemeral
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const targetChannel = interaction.options.getChannel('channel');

        if (!targetChannel || !targetChannel.isTextBased()) {
            return interaction.editReply({
                content: '⚠️ Please provide a valid text channel.',
                flags: MessageFlags.Ephemeral
            });
        }

        const bankUrl = config.bankUrl || 'https://thj-dnt.web.app/bank';

        const bankListButton = new ButtonBuilder()
            .setLabel('🏦 View Full Bank')
            .setStyle(ButtonStyle.Link)
            .setURL(bankUrl);

        const requestButton = new ButtonBuilder()
            .setLabel('🎒 Request Items')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('persistent_request_instructions');

        const row = new ActionRowBuilder()
            .addComponents(bankListButton, requestButton);

        try {
            await targetChannel.send({
                content: '**👋 Welcome to the Death and Taxes Guild Bank!**\n\nClick a button below to get started:',
                components: [row]
            });

            await interaction.editReply({
                content: `✅ Bank interaction buttons successfully sent to ${targetChannel}.`,
                flags: MessageFlags.Ephemeral
            });

            // ✅ Log to console
            console.log(`[BankSetup] ${interaction.user.tag} used /banksetup in #${targetChannel.name} (${targetChannel.id})`);

        } catch (error) {
            console.error('[BankSetup] Failed to send message:', error);
            await interaction.editReply({
                content: '❌ Failed to send bank setup message. Check bot permissions.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};

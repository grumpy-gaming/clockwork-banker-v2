// In commands/help.js - UPDATED WITH QUANTITY FEATURE DOCUMENTATION

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands and how to use the bank bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🤖 Clockwork Banker - Command Help')
            .setColor(0x2196F3)
            .setDescription('Here are all the commands you can use with the guild bank bot:')
            .addFields(
                {
                    name: '👥 **Player Commands**',
                    value: '**`/search ItemName`** - Search for items by full or partial name\n' +
                           '• Examples: `/search sword`, `/search truth`, `/search sword of truth`\n' +
                           '• Click item names to add to your cart (quantity 1)\n\n' +
                           '**`/search spell [class]`** - Search for spells by class\n' +
                           '• Examples: `/search spell wizard`, `/search spell enc`, `/search spell necro`\n' +
                           '• Supported: mag, nec, wiz, enc, dru, sha, cle, pal, sk, ran, bst, brd, mnk, rog, war\n\n' +
                           '**`/request`** - Open form to request multiple items with quantities\n' +
                           '• Type items one per line with optional quantity and quality\n' +
                           '• Examples: "Sword of Flame", "Shield 5", "Robe (Enchanted) 3"\n\n' +
                           '**`/cart`** - View your shopping cart\n' +
                           '**`/cart character:YourName`** - Submit cart as a request\n\n' +
                           '**`/banklist`** - Get link to browse full bank website\n\n' +
                           '**`/help`** - Show this help message',
                    inline: false
                },
                {
                    name: '🔢 **Quantity Feature**',
                    value: '• **Request Form**: Add numbers after item names for quantities\n' +
                           '• **Examples**: "Sword of Flame 5", "Shield (Enchanted) 2"\n' +
                           '• **Default**: Items without numbers default to quantity 1\n' +
                           '• **Cart**: Search buttons add 1x, duplicate items stack automatically\n' +
                           '• **Display**: Quantities >1 show as "3x Item Name"',
                    inline: false
                },
                {
                    name: '📜 **Spell Search Tips**',
                    value: '• Use class abbreviations: mag, nec, wiz, enc, etc.\n' +
                           '• Spells are sorted alphabetically\n' +
                           '• Shows all available qualities (Raw/Enchanted/Legendary)\n' +
                           '• Click spell names to add to cart just like items',
                    inline: false
                },
                {
                    name: '🛡️ **Staff Commands**',
                    value: '**`/fulfill request-id:1234`** - Mark request as completed\n' +
                           '**`/deny request-id:1234 reason:"Out of stock"`** - Deny request\n' +
                           '**`/partial request-id:1234 sent-items:"..." unavailable-items:"..."`** - Partial fulfillment\n' +
                           '• Staff commands now support quantity tracking in responses',
                    inline: false
                },
                {
                    name: '📋 **How to Use**',
                    value: '1. **Browse** → Use `/banklist` to view full inventory\n' +
                           '2. **Search** → Use `/search ItemName` or `/search spell class`\n' +
                           '3. **Add** → Click item/spell names to add 1x to cart\n' +
                           '4. **Request Multiple** → Use `/request` form for custom quantities\n' +
                           '5. **Submit** → Use `/cart character:YourName` to request\n' +
                           '6. **Staff** → Processes requests with fulfill/deny/partial commands',
                    inline: false
                },
                {
                    name: '💡 **Pro Tips**',
                    value: '• **Mix methods**: Use search buttons for single items, request form for bulk\n' +
                           '• **Quality + Quantity**: "Sword of Flame (Enchanted) 3" works perfectly\n' +
                           '• **Cart stacking**: Adding "Shield" twice = "2x Shield" automatically\n' +
                           '• **Exact names**: Copy from bank website for guaranteed matches',
                    inline: false
                }
            )
            .setFooter({ text: 'Questions? Ask in #bank-requests channel!' });

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    },
};
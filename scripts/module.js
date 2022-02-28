const MT = {};

MT.effectIconPath = 'icons/torch-brown-lit.webp';

Hooks.on("init", () => {

    // ASCII Artwork
    MT.ASCII = `    __________________________
    _____  __        ____   _
    |  _ \\ | ]       | | ] / ]
    | | \\ \\| |       | | |/ /
    | |__) ) }  /\\   ] ] / /
    |  _  /\\ \\_/  \\_/ /| | \\
    | | \\ \\ \\   /\\   / | |\\ \\
    |_|  \\_] \\_/  \\_/  |_| \\_]
    __________________________
    `;
    console.log(`RWK Module Test | Initializing the RWK ATL addon\n${MT.ASCII}`);

    if (game.system.data.name !== "dnd5e") {
        console.error(`RWK Module Test needs DnD5e`);
        return;
    }
});

Hooks.on("ready", () => {

    if (game.system.data.name !== "dnd5e") {
        ui.notifications.info("Module Test needs DnD5e");
        return;
    }

    Hooks.on("preUpdateItem", async (item, change) => {

        if (typeof change.data === 'undefined') return;
        const updates = [];
        // only check for change in equipped status
        if (typeof change.data.equipped !== 'undefined') {
            // only check for items with effects
            item.actor.effects.forEach(effect => {
                // check if the effect origin is the item
                if (effect.data.origin.includes(item.id)) {
                    // disable effect if the item it is on is unequipped
                    if (!change.data.equipped) {
                        updates.push({ _id: effect.id, disabled: true });
                    }
                }
            });
            // don't update if array is empty
            if (updates.length > 0) {
                await item.actor.updateEmbeddedDocuments("ActiveEffect", updates);
            }
        }
    });

    Hooks.on("createChatMessage", async (chatMessage) => {

        const actor = game.actors.get(chatMessage.data.speaker.actor);
        const item = actor.items.getName(chatMessage.data.flavor);
        const updates = [];
        // only check for items with effects
        item.effects.forEach(itemEffect => {
            // find effect on actor with same name as on item
            const actorEffect = actor.effects.find(ae => ae.data.label == itemEffect.data.label);
            updates.push({ _id: actorEffect.id, disabled: false });
        });
        // if the item is not equipped set it to euipped
        if (!getProperty(item.data, "data.equipped")) {
            await item.update({ ["data.equipped"]: true });
        }
        // don't update if array is empty
        if (updates.length > 0) {
            await actor.updateEmbeddedDocuments("ActiveEffect", updates);
        }
    });
});

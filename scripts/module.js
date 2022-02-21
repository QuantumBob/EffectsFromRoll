
const mod = 'MT';

Hooks.on("init", () => {
    if (game.system.data.name !== "dnd5e") {
        ui.notifications.info("Module Test needs DnD5e");
        return;
    }
});

Hooks.on("renderSidebarTab", async (app, html) => {
    if (!game.user.isGM) return;

});

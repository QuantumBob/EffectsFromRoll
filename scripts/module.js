
class MT {

    static init() {
        /* Example settings */
        // game.settings.register("MT", "size", {
        //     name: "Size Adjustment with Flags",
        //     hint: "Allow for size adjustment to be made with flags, always returns tokens to prototype token defaults if flag is not present",
        //     scope: "world",
        //     config: true,
        //     default: false,
        //     type: Boolean,
        // });
        // game.settings.register("MT", "presets", {
        //     scope: "world",
        //     config: false,
        //     default: defaultPresets,
        //     type: Object,
        // });
        // game.settings.register("MT", "conversion", {
        //     name: "conversion level",
        //     scope: "world",
        //     config: false,
        //     default: "0.2.15",
        //     type: String,
        // });
    }

    static ready() {

        Hooks.on("init", () => {
            if (game.system.data.name !== "dnd5e") {
                ui.notifications.info("Module Test needs DnD5e");
                return;
            }
        });

        Hooks.on("renderSidebarTab", async (app, html) => {
            if (!game.user.isGM) return;

        });

        Hooks.on("updateActiveEffect", async (effect, options) => {

            ui.notifications.info("Active Effect updated!");
        });

        Hooks.on("updateItem", async (item, options) => {
            ui.notifications.info("Updating that item you are!");
            let itemData = item.data;
            const effects = itemData.effects;// ? false : true;
            itemData.effects.values().disabled = disabled;
            //update

            let updatedData = Object.assign(item.data.effects, item.data.effects)

            //await item.update({ effects: updatedData })
            ui.notifications.info("Updated that item you have!");
        })

        Hooks.on("updateActor", async (actor, options) => {
            ui.notifications.info("Updating that actor you are!");
        })

        Hooks.on("dropActorSheetData", async (actor, sheet, data) => {
            ui.notifications.info("Dropping an item you are!");
        })
    }
}

Hooks.on("init", MT.init);
Hooks.on("ready", MT.ready);
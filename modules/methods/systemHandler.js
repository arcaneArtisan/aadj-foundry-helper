import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    dnd5e, sfrpg, swade, dungeonworld, ose
} from "../aadj-foundry-helper.js";

export default function() {

    let sheetHooks = undefined;
    switch(game.system.id) {
        case "dnd5e":
            if(Settings.value("defaultmacro")) dnd5e.register_helper();
            if(Settings.value("charsheet")) sheetHooks = dnd5e.sheetHooks();
            break;
        case "sfrpg":
            if(Settings.value("defaultmacro")) sfrpg.register_helper();
            if(Settings.value("charsheet")) sheetHooks = sfrpg.sheetHooks();
            break;
        case "swade":
            if(Settings.value("defaultmacro")) swade.register_helper();
            if(Settings.value("charsheet")) sheetHooks = swade.sheetHooks();
            break;
        case "dungeonworld":
            if(Settings.value("defaultmacro")) dungeonworld.register_helper();
            if(Settings.value("charsheet")) sheetHooks = dungeonworld.sheetHooks();
            break;
        case "ose":
            if(Settings.value("defaultmacro")) ose.register_helper();
            if(Settings.value("charsheet")) sheetHooks = ose.sheetHooks();
            break;

    }
    if(sheetHooks) {
        Object.defineProperties(sheetHooks).forEach(([preKey, obj]) => {
            if(obj instanceof Object) {
                Object.defineProperties(obj).forEach(([key, str])=> {
                    sheetHooks.on(`${preKey}${key}`, (app, html, data) => changeButtonExecution(app, html, str));
                });
            }
        });
    }

    changeButtonExecution = function(app, html, str) {
        debug("changeButtonExecution", app, html, str);
        if(app & !app.isEditable) return;
        let itemImages = html.find(str);

        for(let img of itemImages){
            img = $(img);
            let li = img.parents(".item");
            let id = li.attr("data-item-id") ?? img.attr("data-item-id");
            if(!id) return debug(" Id Error | ", img, li, id);

            let item = app.actor.items.get(id);

            if(item.hasMacro()){
                if(Settings.value("click")) {
                    img.contextmenu((event) => { item.executeMacro(event); })
                } else {
                    img.off();
                    img.click((event) => {
                        debug(" Img Click | ", img, event);
                        item.executeMacro(event);
                    });
                }
            }
        }
    }
}
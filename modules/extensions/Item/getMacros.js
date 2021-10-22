import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default async function(wrapperFn) {
    /*const VALID_TRIGGERS = aadj.VALID_TRIGGERS, DEFAULT_TRIGGER = aadj.DEFAULT_TRIGGER;

    var macros = {};
    for(var i of VALID_TRIGGERS) {
        macros[i] = this.getMacro(i) || {
            ...aadj.MACRO_TRIGGER_DATA[i],
            "trigger": i,
            "command": ""
        };
    }
    return macros;*/

    /*let folder = game.customFolders.macro.folders.find(i => i.name == this.name);
    if (!folder) {
        return null;
    }*/

    let itemMacrosFolder = await aadj.Methods.getMacroFolderByName("Item Macros");
    if (!itemMacrosFolder) {
        warn("Item Macros folder was not found!");
        return null;
    }

    let folder = itemMacrosFolder.children.find(i => i.name == this.name);
    if(!folder) {
        debug(`No Item Macros folder found for item "${this.name}!" Exiting`);
        return null;
    }
    let retVal = {};
    for(let t of aadj.Consts.ItemMacroTriggerList) {
        retVal = aadj.Methods.setItemTriggerMacro(retVal, folder, t);
    }
    return retVal;
}
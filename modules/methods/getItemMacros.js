import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default function(name) {
    let itemMacroFolder = aadj.Constants.MacroFolders.Item;
    if(itemMacroFolder === undefined) {
        warn("Item Macros folder was not found!");
        return null;
    }
    let folder = itemMacroFolder.children.find(i => i.name == name);
    if (folder === undefined) {
        debug(`No Item Macros folder found for item "${name}!" Exiting.`)
    }
    let retVal = {};
    for(let t of aadj.Constants.ItemMacroTriggerList) {
        retVal = aadj.setItemTriggerMacro(retVal, folder, t);
    }
    return retVal;
}
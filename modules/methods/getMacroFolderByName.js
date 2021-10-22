import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function(name) {
    let folder = game.customFolders.macro.folders.find(i => i.name == name);
    if (folder) {
        return folder.data;
    } else {
        return null;
    }
}
import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default function(retVal, itemFolder, name) {
    let parts = name.split('.');
    let parent = retVal;

    for(let i = 0; i < (parts.length - 1); i++) {
        let part = parts[i];
        if (parent[part] === undefined) {
            parent[part] = {};
        }
        parent = parent[part];
    }
    let finalName = parts[parts.length - 1];


    let subMacro = itemFolder.content.find(i => i.name.match(`.*_${name}$`));

    if (subMacro) {
        parent[finalName] = subMacro.macro;
    } else {
        parent[finalName] = null;
    }
    return retVal;
}
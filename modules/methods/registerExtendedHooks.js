import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default function() {
    for(let hookName of Object.keys(aadj.ExtendedHooks)) {
        let hook = aadj.ExtendedHooks[hookName];
        Hooks.on(hookName, hook);
    }

    //Hooks.on('renderItemSheet', aadj.Classes.AdvancedItemMacro_Config._init);
    //Hooks.on('getItemDirectoryEntryContext', (html, contextOptions) => {
        //aadj.addContext(contextOptions, "Directory")});
}
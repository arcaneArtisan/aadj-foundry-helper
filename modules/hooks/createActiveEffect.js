import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function(effect, update, id) {
    let itemMacros = aadj.getItemMacros(effect.sourceName);

    let CreationScriptRun = effect.getFlag("aadj","CreationScriptRun");
    let OnScriptRun = effect.getFlag("aadj","OnScriptRun");


    if(itemMacros.Effect?.Create) {
        debug(`Effect Creation macro for ${effect.sourceName} found!`);
        if(CreationScriptRun != true) {
            await Effect.Create.execute(...args);
        }
    } else {
        debug(`No Effect Creation macro found for ${effect.sourceName}!`);
    }

    if(itemMacros.Effect?.On) {
        debug(`Effect Off macro for ${effect.sourceName} found! Executing.`);
        if(OnScriptRun != true) {
            await Effect.On.execute(...args);
        }
    } else {
        debug(`No Effect Off macro found for ${effect.sourceName}!`);
    }

    effect.setFlag("aadj","CreationScriptRun",true);
    effect.setFlag("aadj","OnScriptRun",true);
    effect.setFlag("aadj","OffScriptRun",false);
}
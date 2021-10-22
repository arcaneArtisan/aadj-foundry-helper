import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function(effect, update) {
    let itemMacros = aadj.getItemMacros(effect.sourceName);

    let OffScriptRun = effect.getFlag("aadj","OffScriptRun");
    let DeletionScriptRun = effect.getFlag("aadj","DeletionScriptRun");

    if(itemMacros.Effect?.Off) {
        debug(`Effect Off macro for ${effect.sourceName} found! Executing.`);
        if(OffScriptRun != true) {
            await itemMacros.Effect.Off.execute(...args);
        }
    } else {
        debug(`No Effect Off macro found for ${effect.sourceName}!`);
    }
    if(itemMacros.Effect?.Delete) {
        debug(`Effect Deletion macro for ${effect.sourceName} found! Executing.`);
        if(DeletionScriptRun != true) {
            await itemMacros.Effect.Delete.execute(...args);
        }
    } else {
        debug(`No Effect Deletion macro found for ${effect.sourceName}!`);
    }

    effect.setFlag("aadj","DeletionScriptRun",true);
    effect.setFlag("aadj","OffScriptRun",true);
    effect.setFlag("aadj","OnScriptRun",false);
}
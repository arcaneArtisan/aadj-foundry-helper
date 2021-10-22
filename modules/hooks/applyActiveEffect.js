import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function(actor, update) {
    let effectData = update.effect;

    let OnScriptRun = effectData.getFlag("aadj","OnScriptRun");
    let OffScriptRun = effectData.getFlag("aadj","OffScriptRun");
    let CreationScriptRun = effectData.getFlag("aadj","CreationScriptRun");
    let DeletionScriptRun = effectData.getFlag("aadj","DeletionScriptRun");

    if (DeletionScriptRun == true) {
        update = null;
    }
}
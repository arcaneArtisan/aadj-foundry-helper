import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function(document, change, userID) {
    const effectsToDeactivate = document?.data?.effects?.filter(effect => { return effect.data?.changes?.filter(i => { return (i.key == "macro.itemMacro"); } ); });
    if (effectsToDeactivate.length > 0 && document.hasMacro) {
        document.executeMacro("off",{
            actor: document.actor,
            actorUuid: document.actor.uuid,
            effects: document.effects,
            document: document,
            itemUuid: document.uuid
        });
    }
}
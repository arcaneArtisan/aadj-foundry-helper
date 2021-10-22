import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

//@param document - The existing document that was updated.
//@param change - Differential data that was used to update the document.
//@param options - Additional options which modified the update request.
//@param userId - The ID of the User who triggered the update workflow.

let processTemporaryHitPoints = async function(document, change, options, expiredEffects) {
    if (game.user?.id !== userId) return;
    const thpUpdate = getProperty(update, "data.attributes.hp.temp");
    const thpNew = getProperty(actor.data, "attributes.hp.temp");
    if (thpUpdate === undefined) return true;
    const thpDiff = getProperty(actor.data, "flags.aadj-foundry-helper.thp-damage");

    if (!thpDiff) return true;
    thpDamaged = (thpDiff > 0);
    thpGained = (thpDiff < 0);
    thpDepleted = (thpNew == 0);

    expiredEffects.push(...actor.effects.filter(ef => {
        const specialDuration = ef.data?.flags?.dae?.specialDuration;
        return (
            (specialDuration?.includes("thp-gained") && thpGained) ||
            (specialDuration?.includes("thp-depleted") && thpDepleted) ||
            (specialDuration?.includes("thp-changed")) ||
            (specialDuration?.includes("thp-damaged") && thpDamaged)
        );
    }));

    return expiredEffects;
}

export default async function(document, change, options) {
    const log = aadj.log,warn = aadj.warn,error = aadj.error,debug = aadj.debug,timelog = aadj.timelog,localize = aadj.localize;
    let expiredEffects = [];

    expiredEffects = processTemporaryHitPoints(document, change, options, expiredEffects);

    if (expiredEffects.length > 0) {
        await actor.deleteEmbeddedDocuments("ActiveEffect", expiredEffects.map(ef => ef.id));
    }
}
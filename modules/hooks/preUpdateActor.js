import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

//@param actor - The existing document that was updated.
//@param change - Differential data that was used to update the document.
//@param options - Additional options which modified the update request.
//@param userId - The ID of the User who triggered the update workflow.

export default async function(actor, change, options, userID) {
    var actorUuid = document.uuid;
    /*;
    if (document?.parent?.constructor?.name == "Scene") {
        actorUuid = "Scene." + document?.parent?.data._id;
    } else {
        actorUuid = ".Token." + document?.parent?.data._id;
        actorUuid = "Scene." + document?.parent?.parent?.data._id + actorUuid;
    }*/
    /*
    const actor = DAE.DAEfromActorUuid(actorUuid);
    if (!actor) {
        return;
    }

    var oldTempHP = actor.data?.data?.attributes?.hp?.temp || 0

    globalThis.tempData = globalThis.tempData || {};
    globalThis.tempData[actorUuid] = globalThis.tempData[actorUuid] || {};
    globalThis.tempData[actorUuid]["oldTempHP"] = oldTempHP;
    */

    const thpUpdate = getProperty(change, "data.attributes.hp.temp");
    if (thpUpdate === undefined) return;

    const thpDiff = actor.data.data.attributes.hp.temp - thpUpdate;
    actor.data.update({ "flags.aadj-foundry-helper.thp-damage": thpDiff});
    return;
}
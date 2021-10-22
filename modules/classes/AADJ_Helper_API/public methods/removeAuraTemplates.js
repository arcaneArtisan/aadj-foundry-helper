import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../../../aadj-foundry-helper.js";

export default async function(token, effectsToRemove) {
    if (!Array.isArray(effectsToRemove)) {
        effectsToRemove = [ effectsToRemove ];
    }

    var templateIDs = await tokenAttacher.getAllAttachedElementsByTypeOfToken(token, "MeasuredTemplate");
    var templatesToRemove = [];
    var template;
    templateIDs.forEach(tID => {
        template = canvas.templates.get(tID);
        effectsToRemove.forEach(e => {
            if (template.data.flags.effectName && (template.data.flags.effectName == e.sourceName || template.data.flags.effectName == e._sourceName)) {
                if (!templatesToRemove.includes(template)) {
                    templatesToRemove.push(template);
                }
            }
        });
    });

    await tokenAttacher.detachElementsFromToken(templatesToRemove,token);

    templatesToRemove.forEach(t => {
        t.document.delete();
    });
}
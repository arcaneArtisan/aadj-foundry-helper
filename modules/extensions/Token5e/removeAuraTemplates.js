import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default async function(wrappedFn, effectsToRemove) {
    const targetObject = this;
    if (!Array.isArray(effectsToRemove)) {
        effectsToRemove = [ effectsToRemove ];
    }

    var templateIDs = await tokenAttacher.getAllAttachedElementsByTypeOfToken(targetObject, "MeasuredTemplate");
    var templatesToRemove = [];
    var template;
    if (templateIDs.length < 1 || effectsToRemove.length < 1) {
        return;
    }
    templatesToRemove = canvas.scene.templates.filter(t => {
        for(var i = 0; i < effectsToRemove.length; i++) {
            var e = effectsToRemove[i];
            if (t.data?.flags?.effectName == e.sourceName) {
                return true;
            }
        }
    });

    //await tokenAttacher.detachElementsFromToken(templatesToRemove, targetObject, true);

    templatesToRemove.forEach(i => {
        i.delete();
    });
}
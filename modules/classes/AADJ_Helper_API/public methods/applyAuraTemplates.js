import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../../../aadj-foundry-helper.js";

export default async function(token, effect, texture) {
    if (
        !(AADJHelper.RemoveAuraTemplates) ||
        !(tokenAttacher?.attachElementsToToken) ||
        !(token) ||
        !(effect) ||
        !(templates)
    ) { return }

    var preexistingEffects = token.actor?.effects?.filter(i => i.data?.disabled == false && i.data?.flags?.ActiveAuras?.isAura == true && i.sourceName == effect.sourceName);

    await AADJHelper.RemoveAuraTemplates.execute(token, preexistingEffects);

    var newTemplate = await canvas.scene.createEmbeddedDocuments('MeasuredTemplate', [{
        t: "circle",
        user: game.user._id,
        x: token.center.x,
        y: token.center.y,
        direction: 0,
        distance: effect.data?.flags?.ActiveAuras?.radius,
        borderColor: "#000000",
        fillColor: "#6495ED",
        texture: texture,
        flags: {
            "effectName": effect.sourceName,
        }
    }]);
    return tokenAttacher.attachElementsToToken(newTemplate, token, false);
}
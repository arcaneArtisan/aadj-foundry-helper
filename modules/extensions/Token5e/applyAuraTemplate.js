import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default async function(wrappedFn, effect, options = {}) {
    const targetObject = this;
    if (
        !(tokenAttacher?.attachElementsToToken) ||
        !(effect)
    ) { return }

    options.direction |= 45;
    options.borderColor |= 0;
    options.fillColor |= 0;
    options.texture = options.texture || "";
    options.distance = options.distance || effect.data?.flags?.ActiveAuras?.radius || 0;

    var preexistingEffects = targetObject.actor.effects.filter(i => {return (i.data.disabled == false && i.data.flags.ActiveAuras.isAura == true && i.sourceName == effect.sourceName)});
    await targetObject.removeAuraTemplates(preexistingEffects);

    /* Because of how D&D spacing works, we're making a rectangle instead of a circle,
        which means each side is actually two times the radius plus the unit's size. */

    const unitSize = targetObject.data.width * canvas.scene.data.gridDistance;
    const sideLength = (unitSize + (options.distance * 2));

    /* But the Distance is at a 45 degree angle, so we need the hypoteneuse of a right
    triangle using that length as the length of each side. */
    const hypSquare = Math.pow(sideLength,2) * 2;
    const realDistance = Math.sqrt(hypSquare);
    const offset = (sideLength / 2);

    var newTemplate = await canvas.scene.createEmbeddedDocuments('MeasuredTemplate', [{
        t: "rect",
        user: game.user._id,
        x: targetObject.x,
        y: targetObject.y,
        direction: options.direction,
        distance: realDistance,
        borderColor: options.borderColor,
        fillColor: options.fillColor,
        texture: options.texture,
        flags: {
            "effectName": effect.sourceName
        },
        visible: false
    }]);
    //await newTemplate[0]?.object?.clear();

    await tokenAttacher.attachElementsToToken(newTemplate, targetObject, true);
    const realOffset = sideLength * 2 * canvas?.scene?.data?.gridDistance;

    await newTemplate[0]?.data?.update({
        "flags.token-attacher.offset": {
            x: -realOffset,
            y: -realOffset
        },
        visible: true
    });
    await targetObject.update({x: targetObject.data.x + 1});
    await targetObject.update({x: targetObject.data.x - 1});
}
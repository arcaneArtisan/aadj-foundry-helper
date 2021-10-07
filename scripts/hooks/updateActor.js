Hooks.on("updateActor", async(actor, update, diff, user) => {
    if (game.user.id !== user) return false;
    const thpUpdate = getProperty(update, "data.attributes.hp.temp");

    if (thpUpdate === undefined) return true;
    const oldThpDamage = getProperty(actor.data, "flags.msd.old-thp-damage");
    if (!oldThpDamage || oldThpDamage <= 0) return true;

    const thpChangedEffectName = i18n("msd.thp-changed-check-name");
    const thpDepletedEffectName = i18n("msd.thp-depleted-check-name");



    if (actor.data.data.attributes.hp.temp === 0) {

    }
});
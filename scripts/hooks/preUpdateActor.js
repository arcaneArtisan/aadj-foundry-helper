Hooks.on("preUpdateActor", (actor, update, diff, user) => {
    const thpUpdate = getProperty(update, "data.attributes.hp.temp");
    if (thpUpdate === undefined) return true;

    const thpDiff = actor.data.data.attributes.hp.temp - thpUpdate;
    const thpZero = (!actor.data.data.attributes.hp.temp || actor.data.data.attributes.hp.temp <= 0);

    actor.data.update({ "flags.msd.old-thp-damage": thpDiff });
    return true;
});
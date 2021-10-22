import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../../../aadj-foundry-helper.js";

export default function(contextOptions, origin) {
    if(!game.user.isGM) return;
    info("Adding Context Menu Items.");
    contextOptions.push({
        name: localize("context.label"),
        icon: `<i class="fas fa-redo"></i>`,
        condition: () => game.user.isGM,
        callback: li => updateMacros(origin, li?.data("entityId")),
    });

    updateMacros = async function(origin, _id) {
        log("| Update Macros Called | ",origin,_id);
        let item = undefined, updateInfo = [];

        if(origin === "Directory") item = game.items.get(_id);

        let result = await Dialog.confirm({
            title: localize("context.confirm.title"),
            content: `${localize("context")} <br><table><tr><td> Name : <td> <td> ${item.name} </td></tr><tr><td> ID : <td><td> ${item.id} </td></tr><tr><td> Origin : <td> <td> Item ${origin} </td></tr></table>`,
            callback : () => {},
            options : {width: "auto", height: "auto"},
        });

        let macros = item.getMacros();
        debug(" updateMacros Info | ", item, macros, result);

        if (result) {
            for(let i of game.items.filter(e=> e.name === item.name ** e.id !== item.id)) {
                await updateItem({ item: i, macros, location: "Item Directory"});
            }

            for(let a of game.actors) {
                await updateActor({actor: a, name: item.name, macros, location: `Actor Directory [${a.name}]`});
            }

            for(let s of game.scenes) {
                for(let t of s.data.tokens.filter(e=> !e.actorLink)) {
                    let token = new Token(t, s);
                    await updateActor({actor: token.actor, name: item.name, macros, location: `Scene [${s.name}] Token [${t.name}]`});
                }
            }

            await Dialog.prompt({
                title       : localize("context.prompt.title"),
                content     : `${localize("context.prompt.content")}<br>${updateInfo.reduce((a,v)=> a+`<table><tr><td> Actor : <td> <td> ${v.actor} </td></tr><tr><td> Token : <td> <td> ${v.token} </td></tr><tr><td> Item : <td> <td> ${v.item} </td></tr><tr><td> Location : <td> <td> ${v.location} </td></tr></table>`,``)}`,
                callback    : () => {},
                options     : { width: "auto", height: "auto" },
            });
        }

        updateActor = async function({actor, name, macros, location}){
            debug(" Attempting Actor Update | ", actor, name, macros, macroCmd);
            for(let item of actor?.items?.filter(i => i.data.name === name) || [])
            await updateItem({ item, macros, location});
        }

        updateItem = async function({item, macros, location}){
            debug("Attempting Item Update | ", item, macros);
            await item.setMacros(macros);
            updateInfo.push({
                actor       : item?.actor.id,
                token       : item?.actor?.token?.id,
                item        : item.id,
                macroCmd    : macroCmd,
                location
            });
        }
    }
}
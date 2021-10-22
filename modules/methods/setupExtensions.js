import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

const registerExtensionsOnObject = async function(extensionObjectName, objectName = null) {
    objectName = (objectName === undefined) ? extensionObjectName : objectName;
    aadj.setObjectMethods(objectName,aadj.Extensions[extensionObjectName]);
}

export default async function() {

    aadj.ITEM_PROTOTYPES = {
        ...aadj.ITEM_PROTOTYPES,
        "Actor5e": game.dnd5e.entities.Actor5e.prototype,
        "Item5e": game.dnd5e.entities.Item5e.prototype,
        "Token5e": game.dnd5e.entities.Token5e.prototype,
        "TokenDocument5e": game.dnd5e.entities.TokenDocument5e.prototype
    }

    registerExtensionsOnObject("Actor","Actor");
    registerExtensionsOnObject("Actor", "Actor5e");
    registerExtensionsOnObject("Item", "Item");
    registerExtensionsOnObject("Item", "Item5e");
    registerExtensionsOnObject("Token", "Token");
    registerExtensionsOnObject("Token", "Token5e");
}
import { default as Actor_getResources } from "./extensions/Actor5e/getResource.js";
import { default as Actor_setResources } from "./extensions/Actor5e/setResource.js";
import { default as Actor_setSubclass } from "./extensions/Actor5e/setSubclass.js";
import { default as Item__executeScript } from "./extensions/Item/_executeScript.js";
import { default as Item_executeMacro } from "./extensions/Item/executeMacro.js";
import { default as Item_getMacro } from "./extensions/Item/getMacro.js";
import { default as Item_getMacros } from "./extensions/Item/getMacros.js";
import { default as Item_hasMacro } from "./extensions/Item/hasMacro.js";
import { default as Item_setMacro } from "./extensions/Item/setMacro.js";
import { default as Item_setMacros } from "./extensions/Item/setMacros.js";
import { default as Item_updateMacro } from "./extensions/Item/updateMacro.js";
import { default as Token_applyAuraTemplate } from "./extensions/Token5e/applyAuraTemplate.js"
import { default as Token_removeAuraTemplates } from "./extensions/Token5e/removeAuraTemplates.js"

export const Actor = {
    "getResources": Actor_getResources,
    "setResources": Actor_setResources,
    "setSubclass": Actor_setSubclass
}

export const Item = {
    /*"_executeScript": Item__executeScript,
    "executeMacro": Item_executeMacro,
    "getMacro": Item_getMacro,*/
    "getMacros": Item_getMacros
        /*,
            "hasMacro": Item_hasMacro,
            "setMacro": Item_setMacro,
            "setMacros": Item_setMacros,
            "updateMacro": Item_updateMacro*/
}

export const Token = {
    "applyAuraTemplate": Token_applyAuraTemplate,
    "removeAuraTemplates": Token_removeAuraTemplates
}
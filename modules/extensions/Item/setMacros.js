import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default async function(wrapperFn, macros) {
    for(var key of Object.keys(macros)) {
        var macro = macros[key];
        await setMacro(macro, key);
    }
};
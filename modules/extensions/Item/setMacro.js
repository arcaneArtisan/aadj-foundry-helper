import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default async function(wrapperFn, trigger, macro = {}) {
    trigger = trigger || aadj.DEFAULT_TRIGGER;

    if(wrapperFn) wrapperFn.bind(this)();


    await this.unsetFlag(aadj.MODULE_NAME,`macros.${trigger}`);
    return await this.setFlag(aadj.MODULE_NAME, `macros.${trigger}`, macro);
};
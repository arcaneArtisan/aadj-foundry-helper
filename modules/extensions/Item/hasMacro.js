import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default function(wrapperFn, trigger = null) {

    trigger = trigger || aadj.DEFAULT_TRIGGER;

    if(wrapperFn) wrapperFn.bind(this)();
    return !!this.getFlag(aadj.MODULE_NAME, `macros.${trigger}`)?.data?.command;
};
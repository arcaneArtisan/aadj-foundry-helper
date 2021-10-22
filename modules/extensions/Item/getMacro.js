import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default function(wrapperFn, trigger = null) {
    trigger = trigger || aadj.DEFAULT_TRIGGER;

    if (this.hasMacro(trigger)) {
        var macro = new Macro(this.getFlag(aadj.MODULE_NAME, `macros.${trigger}`).data);
        macro["key"] = (macro["key"] === undefined) ? trigger : macro["key"];
        return macro;
    } else {
        return {
            ...aadj.MACRO_TRIGGER_DATA[trigger],
            command: ""
        };
    }

    let oldMacroData = (wrapperFn) ? wrapperFn.bind(this)() : null;
};
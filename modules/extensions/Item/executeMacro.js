import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default function(wrapperFn, ...args) {
    if(wrapperFn) wrapperFn.bind(this)();

    var trigger = "";
    if(VALID_TRIGGERS.include(args[0])) {
        trigger = args.splice(0,1);
    } else {
        trigger = DEFAULT_TRIGGER;
    }

    if(!this.hasMacro(trigger)) { return; }

    switch(this.getMacro(trigger).data.type) {
        case "chat":
            break;
        case "script":
            return this._executeScript(...args);
    }
};
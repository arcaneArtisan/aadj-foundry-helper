import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default async function({wrapperFn, command, type, trigger = null }){
    trigger = trigger || aadj.DEFAULT_TRIGGER;

    if(wrapperFn) wrapperFn.bind(this)();

    await this.object.setMacro(null, trigger, new Macro({
        "name": this.object.data.name,
        "type": type,
        "scope": "global",
        "command": command,
        "trigger": trigger,
        "author": game.user.id,
    }));
};
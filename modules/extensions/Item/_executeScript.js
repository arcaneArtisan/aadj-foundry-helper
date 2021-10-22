import aadj, {
    log, warn, error, debug, timelog, localize,
    AADJ_Helper_API, Settings,
    VALID_TRIGGERS, DEFAULT_TRIGGER
} from "../../aadj-foundry-helper.js";

export default function(wrapperFn, trigger = null) {
    trigger = trigger || aadj.DEFAULT_TRIGGER;

    if(wrapperFn) wrapperFn.bind(this)();

    const item = this;
    const macro = item.getMacro(trigger);
    const speaker = ChatMessage.getSpeaker({actor : item.actor});
    const actor = item.actor ?? game.actors.get(speaker.actor);
    const token = item.actor?.token ?? canvas.tokens.get(speaker.token);
    const character = game.user.character;
    const event = getEvent();

    const body = `(async ()=> {
        ${macro.data.command}
    })();`;
    const fn = Function("command", "item", "speaker", "actor", "token", "character", "event", "args", body);

    try {
        fn.call(macro, item, speaker, actor, token, character, event, args);
    } catch(err) {
        ui.notifications.error(localize("error.macroExecution"));
        error(err);
    }


    getEvent = function() {
        let a = args[0];
        if(a instanceof Event) return args[0].shift();
        if(a?.originalEvent instanceof Event) return args.shift().originalEvent;
        return undefined;
    }
};
import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default function() {
    for(let hookName of Object.keys(aadj.CoreHooks)) {
        let hook = aadj.CoreHooks[hookName];
        Hooks.once(hookName, hook);
    }
}
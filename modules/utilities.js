import { libWrapper } from "./lib/shim.js";
import aadj, {
    AADJ_Helper_API, Settings,
    CONSOLE_MESSAGE_PRESET, ITEM_PROTOTYPE_ADDRESSES, MODULE_NAME, ConsoleWriteModes
} from "./aadj-foundry-helper.js";


function consoleTrace(...output) {
    console.groupCollapsed(...CONSOLE_MESSAGE_PRESET, ...output);
    console.trace();
    console.groupEnd();
}

function consoleWrite(mode = ConsoleWriteModes.Log, ...output) {
    var method;

    switch (mode) {
        case ConsoleWriteModes.Info:
            method = console.info;
            break;
        case ConsoleWriteModes.Warn:
            method = console.warn;
            break;
        case ConsoleWriteModes.Error:
            method = console.error;
            break;
        case ConsoleWriteModes.Table:
            method = console.table;
            break;
        default:
        case ConsoleWriteModes.Log:
            method = console.log;
            break;
    }

    method(...CONSOLE_MESSAGE_PRESET, ...output);
}

export let debug = (...output) => {
    const debugEnabled = game.modules.get('_dev-mode')?.api?.getPackageDebugValue(aadj.MODULE_NAME);

    if(debugEnabled) {
        return consoleWrite(ConsoleWriteModes.info,"| DEBUG | ",...output);
    }
};
export let warn = (...output) => {
    if (aadj.debugEnabled < 1) return;
    return consoleWrite(ConsoleWriteModes.warn,...output);
};
export let info = (...output) => {
    return consoleWrite(ConsoleWriteModes.info,...output);
};
export let log = (...output) => {
    return consoleWrite(ConsoleWriteModes.log,...output);
};
export let error = (...output) => {
    return consoleWrite(ConsoleWriteModes.error,...output);
};
export let timelog = (...output) => {
    consoleWrite(ConsoleWriteModes.log, Date.now(), ...output);
};

export let localize = (entryName, moduleName = "aadj") => {
    const name = moduleName + "." + entryName;
    return game.i18n.localize(name);
}

export let setDebugLevel = (debugText) => {
    aadj.debugEnabled = {"none": 0, "warn": 1, "debug": 2, "all": 3}[debugText] || 0;
    // 0 = none, warnings = 1, debug = 2, all = 3
    if (aadj.debugEnabled >= 3) CONFIG.debug.hooks = true;
};

export function setObjectMethods(prototypeAddress, methods, type = libWrapper.MIXED, options = {} ) {
    var address = (ITEM_PROTOTYPE_ADDRESSES[prototypeAddress] != undefined) ? ITEM_PROTOTYPE_ADDRESSES[prototypeAddress] : prototypeAddress;
    if(!methods) {
        return;
    }
    Object.keys(methods).forEach(key => {
        var method = methods[key];
        try {
            libWrapper.register(MODULE_NAME, `${address}.${key}`, method, type, options);
        } catch {
            //globalThis[address][key] = method;
            aadj.ITEM_PROTOTYPES[prototypeAddress][key] = method;
        }
    });
}
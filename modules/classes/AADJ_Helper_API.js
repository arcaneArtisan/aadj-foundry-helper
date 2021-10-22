import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

import * as Events from "./AADJ_Helper_API/events.js";
import * as Methods from "./AADJ_Helper_API/methods.js";

export default class AADJ_Helper_API {
    constructor() {
        Object.assign(this, Events, Methods);

        this.setDebugLevel = aadj.setDebugLevel;
        this.localize = aadj.localize;

        this.debug = aadj.debug;
        this.warn = aadj.warn;
        this.info = aadj.info;
        this.log = aadj.log;
        this.error = aadj.error;
        this.timelog = aadj.timelog;
        this.onInit();
    }

    get Settings() { return aadj.Classes.Settings; }

    get Utilities() { return aadj.Utilities; }
    get Consts() { return aadj.Consts; }

    get VALID_TRIGGERS() { return aadj.VALID_TRIGGERS; }
    get MACRO_TRIGGER_GROUPS() { return aadj.MACRO_TRIGGER_GROUPS; }
    get MACRO_TRIGGER_GROUP_DATA() { return aadj.MACRO_TRIGGER_GROUP_DATA; }
    get MACRO_TRIGGER_DATA() { return aadj.MACRO_TRIGGER_GROUPS; }

    get specialDurations() { return aadj.specialDurations; }
}

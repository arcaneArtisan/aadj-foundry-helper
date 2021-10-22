import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function() {
    Settings.register();
    globalThis.AADJHelper = new aadj.Classes.AADJ_Helper_API();
    await globalThis.AADJHelper.onInit();
};
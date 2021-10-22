import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function() {
    await aadj.registerExtendedHooks();
    await aadj.localizeStrings();
    await globalThis.AADJHelper?.onReady();
};
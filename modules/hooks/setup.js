import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function() {
    await aadj.setupExtensions();
    await globalThis.AADJHelper?.onSetup();
};
import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../../aadj-foundry-helper.js";

export default async function(wrappedFn, updateObject) {
    const targetObject = this;
    if((updateObject?.key == 0) || (updateObject?.key == -1) || updateObject?.targetObject === null) {
        return;
    }

    const keyRaw = updateObject.key;
    const key = `data.data.resources.${keyRaw}`
    const resource = updateObject.value;
    const o = {
        data: {
            resources: {

            }
        }
    };
    o.data.resources[keyRaw] = resource;
    await targetObject.update(o);
    await targetObject?.data?.document?._sheet?.render(false);
}
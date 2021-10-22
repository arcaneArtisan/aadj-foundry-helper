import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default async function(app, html, data) {
    //log("formDisplayData1:", formDisplayData);
    //log("AADJHelper.specialDurations:", AADJHelper.specialDurations);
    Object.assign(data.specialDuration, aadj.Consts.SpecialDurations);
    const ordered = Object.keys(data.specialDuration).sort().reduce(
        (obj, key) => {
            obj[key] = data.specialDuration[key];
            return obj;
        },
        {}
    );
    formDisplayData.specialDuration = ordered;

    //log("formDisplayData2:", formDisplayData);
}
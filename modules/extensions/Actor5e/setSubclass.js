import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../../aadj-foundry-helper.js";

export default async function(wrappedFn, className, subclassName, minimumClassLevel = 3) {
    const targetObject = this;
    var item = targetObject.classes[className]?.data;
    if (!item) { return; }

    const classLevel = item.data?.levels || 0;

    if (classLevel >= minimumClassLevel) {
        await targetObject.updateEmbeddedDocuments("Item",[
            {"_id": item._id, "data.subclass": subclassName}
        ]);
        actor._sheet.render(false);
    }
};
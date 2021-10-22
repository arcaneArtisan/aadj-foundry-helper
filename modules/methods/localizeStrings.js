import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default function() {
    for(let i = 0; i < aadj.SpecialDurations.count; i++) {
        let item = aadj.SpecialDurations[i];
        if(Array.isArray(item)) {
            for(let j = 0; j < item.count; j++) {
                aadj.SpecialDurations[i][j] = localize(item[j]);
            }
        } else {
            aadj.SpecialDurations[i] = localize(item);
        }
    }

    // Set the "key" property for easy access by templates, and localize
    // the individual and group labels for the macro commands.
    aadj.MACRO_TRIGGER_GROUPS = [];
    aadj.MACRO_TRIGGER_GROUP_DATA = {};

    for(let key of Object.keys(aadj.MACRO_TRIGGER_DATA)) {
        let data = aadj.MACRO_TRIGGER_DATA[key];

        aadj.MACRO_TRIGGER_DATA[key].key = key;
        aadj.MACRO_TRIGGER_DATA[key].name = localize(`macro-triggers.${key}.name`);
        aadj.MACRO_TRIGGER_DATA[key].label = localize(`macro-triggers.${key}.name`);
        aadj.MACRO_TRIGGER_DATA[key].description = localize(`macro-triggers.${key}.description`);

        if (!aadj.MACRO_TRIGGER_GROUPS.includes(data.group)) {
            aadj.MACRO_TRIGGER_GROUPS.push(data.group);
            aadj.MACRO_TRIGGER_GROUP_DATA[data.group] = {
                "show": true,
                "items": [],
                "key": data.group,
                "label": localize(`${data.group}.label`)
            };
        }
        aadj.MACRO_TRIGGER_GROUP_DATA[data.group].items.push(data);
    }

    aadj.MACRO_TRIGGER_GROUPS.sort((a, b) => {
        let groupA = aadj.MACRO_TRIGGER_GROUP_DATA[a];
        let groupB = aadj.MACRO_TRIGGER_GROUP_DATA[b];

        let labelCompare = groupA.label.localeCompare(groupB.label);
        let keyCompare = groupA.key.localeCompare(groupB.key);

        if (labelCompare != 0) return labelCompare;
        if (keyCompare != 0) return keyCompare;
        return 0;
    });


    let newItemData = {};
    let newGroupData = {};
    for(let groupKey of aadj.MACRO_TRIGGER_GROUPS) {
        let group = aadj.MACRO_TRIGGER_GROUP_DATA[groupKey];
        group.items.sort((a, b) => {

            let labelCompare = a.label.localeCompare(b.label);
            let keyCompare = a.key.localeCompare(b.key);

            if (labelCompare != 0) return labelCompare;
            if (keyCompare != 0) return keyCompare;
            return 0;
        });

        newGroupData[groupKey] = group;
        for(let item of group.items) {
            newItemData[item.key] = item;
        }
    }

    aadj.MACRO_TRIGGER_GROUP_DATA = newGroupData;
    aadj.MACRO_TRIGGER_DATA = newItemData;
}
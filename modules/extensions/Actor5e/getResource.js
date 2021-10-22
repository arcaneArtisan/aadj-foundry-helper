import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../../aadj-foundry-helper.js";

export default async function(wrappedFn, label, createIfNotPresent = true, defaultValues = {}) {
    const targetObject = this;
    const resources = targetObject.data.resources
    const resourceID = Object.keys(resources).find(i => resources[i].label == label);

    const resource = resources[resourceID];
    if(resource) {
        return { key: resourceID, value: resource };
    }

    if(!createIfNotPresent) {
        warn("The requested resource was not found.")
        return { key: 0, value: null };
    }

    const emptyResourceId = Object.keys(resources).find(i => resources[i].label == "" && resources[i].max == null && resources[i].value == null);
    if(emptyResourceId) {
        const emptyResource = resources[emptyResourceId];
        emptyResource.label = label;
        emptyResource.lr = (defaultValues?.lr == true);
        emptyResource.max = defaultValues.max || 0;
        emptyResource.sr = (defaultValues?.sr == true);
        emptyResource.value = defaultValues.value || 0;

        if(targetObject?.document?._sheet?.render) {
            await targetObject?.document?._sheet?.render(false);
        }
        return { key: emptyResourceId, value: emptyResource };

    } else {
        warn("The requested resource was not found and could not be created because no empty resources are available.");
        return { key: -1, value: null };
    }
}
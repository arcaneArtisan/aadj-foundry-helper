export import * as CoreHooks from "./coreHooks.js";
export import * as ExtendedHooks from "./extendedHooks.js";
export import * as Classes from "./classes.js";
export import * as Extensions from "./extensions.js";
export import * as Utilities from "./utilities.js";
export import * as Consts from "./consts.js";
export import * as Systems from "./systems.js";
export import * as Methods from "./methods.js";

export import { libWrapper } from "./lib/shim.js";

const aadj = {
    Classes: Classes,
    Extensions: Extensions,
    CoreHooks: CoreHooks,
    ExtendedHooks: ExtendedHooks,
    Methods: Methods,
    libWrapper: libWrapper,
    Systems: Systems,
    Consts: Consts,
    Utilities: Utilities,
    specialDurations: {},
}
Object.assign(aadj, Classes);
Object.assign(aadj, Utilities);
Object.assign(aadj, Methods);
Object.assign(aadj, Consts);

export default aadj;

/*
export * from Classes;
export * from Utilities;
export * from Methods;
export * from Consts;
export * from Extensions;
export * from CoreHooks;
export * from ExtendedHooks;
export * from Systems;*/

aadj.registerCoreHooks();
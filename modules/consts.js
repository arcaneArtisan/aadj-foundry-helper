import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "./aadj-foundry-helper.js";

export const MODULE_NAME = 'aadj-foundry-helper';
export const MODULE_TITLE = 'AADJ Helper';

// A colored titled displayed before every console message
export const CONSOLE_MESSAGE_PRESET = [`%c ${MODULE_TITLE} %c|`, 'background: #6495ED; color: #fff', 'color: #fff'];

export const ConsoleWriteModes = {
    Info: 0,
    Log: 1,
    Warn: 2,
    Error: 3,
    Table: 4
};

export const SpecialDurations = {
    "daeSpecialDurations": {
        "thp-depleted": "specialduration-label-temphp-depleted",
        "thp-changed": "specialduration-label-temphp-changed",
        "thp-damaged": "specialduration-label-temphp-damaged",
        "thp-increased": "specialduration-label-temphp-increased",
    }
}
// determines if we should display debug
export let DEBUGGING = true;
export let debugEnabled = 0;

export const DEFAULT_TRIGGER = "on_item_activated";

export let ITEM_PROTOTYPE_ADDRESSES = {
    "Actor": "Actor.prototype",
    "ActorData": "foundry.data.ActorData.prototype",
    "Item": "Item.prototype",
    "Item5e": "game.dnd5e.entities.Item5e.prototype",
    "ItemData": "foundry.data.ItemData.prototype",
    "Token": "Token.prototype",
    "Token5e": "game.dnd5e.entities.Token5e.prototype",
    "TokenData": "foundry.data.TokenData.prototype",
    "TokenDocument": "TokenDocument.prototype",
    "TokenDocument5e": "game.dnd5e.entities.TokenDocument5e.prototype"
}
export let ITEM_PROTOTYPES = {
    "Actor": Actor.prototype,
    "ActorData": foundry.data.ActorData.prototype,
    "Item": Item.prototype,
    "ItemData": foundry.data.ItemData.prototype,
    "Token": Token.prototype,
    "TokenData": foundry.data.TokenData.prototype,
    "TokenDocument": TokenDocument.prototype
}

const IMAGE_PATH = "modules/aadj-foundry-helper/macro_icons";

export const MODULE_IMAGE_PATH = IMAGE_PATH;

// Determines if the debug should have a trace history
export let TRACE = true;

export let VALID_TRIGGERS = [
    "every_battle_start",
    "every_battle_end",
    "every_round_start",
    "every_round_end",
    "every_turn_start",
    "every_turn_end",
    "every_second",
    "every_minute",
    "every_hour",
    "every_day",
    "every_week",
    "every_month",
    "every_year",
    "every_long_rest",
    "every_short_rest",
    "every_rest",
    "every_level_up",
    "every_downtime_start",
    "every_downtime_end",
    "every_downtime_activity_start",
    "every_downtime_activity_cont",
    "every_downtime_activity_end",
    "every_tick",
    "on_item_used",
    "on_item_activated",
    "on_item_deactivated",
    "on_item_aura_activated",
    "on_item_aura_deactivated",
    "on_item_effect_activated",
    "on_item_effect_deactivated",
    "on_item_received",
    "on_item_attuned",
    "on_item_identify",
    "on_item_unattuned",
    "on_item_equipped",
    "on_item_unequipped",
    "on_item_charges_spent",
    "on_item_charges_recovered",
    "on_item_discharged",
    "on_item_recharged",
    "on_item_zone_entered",
    "on_item_zone_exited",
    "on_token_create",
    "on_token_delete",
    "on_token_move",
    "inflict_attack",
    "inflict_melee_attack",
    "inflict_ranged_attack",
    "inflict_spell_attack",
    "inflict_weapon_attack",
    "inflict_damage",
    "inflict_death",
    "inflict_bloodied",
    "inflict_resurrection",
    "inflict_stabilize",
    "inflict_critical_hit",
    "inflict_hp_zero",
    "inflict_hp_change",
    "inflict_hp_gain",
    "inflict_hp_damage",
    "inflict_knocked_out",
    "inflict_thp_gained",
    "inflict_thp_damage",
    "inflict_thp_zero",
    "inflict_saving_throw",
    "inflict_saving_throw_success",
    "inflict_saving_throw_fail",
    "inflict_ability_check",
    "inflict_ability_check_success",
    "inflict_ability_check_fail",
    "inflict_condition",
    "inflict_condition_cure",
    "inflict_buff",
    "inflict_debuff",
    "owner_death",
    "owner_bloodied",
    "owner_stabilize",
    "owner_resurrection",
    "owner_hp_zero",
    "owner_attacked",
    "owner_attacked_by_melee",
    "owner_attacked_by_ranged",
    "owner_attacked_by_spell",
    "owner_hp_changed",
    "owner_hp_damaged",
    "owner_hp_gained",
    "owner_critical_hit",
    "owner_thp_gain",
    "owner_thp_loss",
    "owner_thp_zero",
    "owner_death_save",
    "owner_death_save_success",
    "owner_death_save_fail",
    "owner_saving_throw",
    "owner_saving_throw_success",
    "owner_saving_throw_fail",
    "owner_ability_check",
    "owner_ability_check_success",
    "owner_ability_check_fail",
    "owner_buffed",
    "owner_debuffed",
    "owner_condition_inflicted",
    "owner_condition_cured",
    "owner_use_action",
    "owner_use_reaction",
    "owner_use_bonus_action"
];
export let MACRO_TRIGGER_GROUPS = [
];
export let MACRO_TRIGGER_GROUP_DATA = {

};
export let MACRO_TRIGGER_DATA = {
    "every_battle_start": {
        "icon": `${IMAGE_PATH}/time-battle-start.png`,
        "enabled": true,
        "group": "macro-trigger-groups.time"
    },
    "every_battle_end": {
        "icon": `${IMAGE_PATH}/time-battle-end.png`,
        "enabled": true,
        "group": "macro-trigger-groups.time"
    },
    "every_round_start": {
        "icon": `${IMAGE_PATH}/time-round-start.png`,
        "enabled": true,
        "group": "macro-trigger-groups.time"
    },
    "every_round_end": {
        "icon": `${IMAGE_PATH}/time-round-end.png`,
        "enabled": true,
        "group": "macro-trigger-groups.time"
    },
    "every_turn_start": {
        "icon": `${IMAGE_PATH}/time-turn-start.png`,
        "enabled": true,
        "group": "macro-trigger-groups.time"
    },
    "every_turn_end": {
        "icon": `${IMAGE_PATH}/time-turn-end.png`,
        "enabled": true,
        "group": "macro-trigger-groups.time"
    },
    "every_second": {
        "icon": `${IMAGE_PATH}/time-second.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "every_minute": {
        "icon": `${IMAGE_PATH}/time-minute.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "every_hour": {
        "icon": `${IMAGE_PATH}/time-hour.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "every_day": {
        "icon": `${IMAGE_PATH}/time-day.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "every_week": {
        "icon": `${IMAGE_PATH}/time-week.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "every_month": {
        "icon": `${IMAGE_PATH}/time-month.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "every_year": {
        "icon": `${IMAGE_PATH}/time-year.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "every_long_rest": {
        "icon": `${IMAGE_PATH}/owner-rest-long.png`,
        "enabled": true,
        "group": "macro-trigger-groups.activity"
    },
    "every_short_rest": {
        "icon": `${IMAGE_PATH}/owner-rest-short.png`,
        "enabled": true,
        "group": "macro-trigger-groups.activity"
    },
    "every_rest": {
        "icon": `${IMAGE_PATH}/owner-rest-any.png`,
        "enabled": true,
        "group": "macro-trigger-groups.activity"
    },
    "every_level_up": {
        "icon": `${IMAGE_PATH}/owner-level-up.png`,
        "enabled": false,
        "group": "macro-trigger-groups.activity"
    },
    "every_downtime_start": {
        "icon": `${IMAGE_PATH}/time-downtime-start.png`,
        "enabled": false,
        "group": "macro-trigger-groups.activity"
    },
    "every_downtime_activity_start": {
        "icon": `${IMAGE_PATH}/time-downtime-activity-start.png`,
        "enabled": false,
        "group": "macro-trigger-groups.activity"
    },
    "every_downtime_activity_cont": {
        "icon": `${IMAGE_PATH}/time-downtime-activity-progress.png`,
        "enabled": false,
        "group": "macro-trigger-groups.activity"
    },
    "every_downtime_activity_end": {
        "icon": `${IMAGE_PATH}/time-downtime-activity-end.png`,
        "enabled": false,
        "group": "macro-trigger-groups.activity"
    },
    "every_downtime_end": {
        "icon": `${IMAGE_PATH}/time-downtime-end.png`,
        "enabled": false,
        "group": "macro-trigger-groups.activity"
    },
    "every_tick": {
        "icon": `${IMAGE_PATH}/time-tick.png`,
        "enabled": false,
        "group": "macro-trigger-groups.time"
    },
    "on_item_used": {
        "icon": `${IMAGE_PATH}/item-use.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_activated": {
        "icon": `${IMAGE_PATH}/item-identify.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_activated": {
        "icon": `${IMAGE_PATH}/item-on.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_deactivated": {
        "icon": `${IMAGE_PATH}/item-off.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_aura_activated": {
        "icon": `${IMAGE_PATH}/item-aura-on.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_aura_deactivated": {
        "icon": `${IMAGE_PATH}/item-aura-off.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_effect_activated": {
        "icon": `${IMAGE_PATH}/item-effect-on.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_effect_deactivated": {
        "icon": `${IMAGE_PATH}/item-effect-off.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_received": {
        "icon": `${IMAGE_PATH}/item-received.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_attuned": {
        "icon": `${IMAGE_PATH}/item-attune-on.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_unattuned": {
        "icon": `${IMAGE_PATH}/item-attune-off.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_equipped": {
        "icon": `${IMAGE_PATH}/item-equip-on.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_unequipped": {
        "icon": `${IMAGE_PATH}/item-equip-off.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_charges_spent": {
        "icon": `${IMAGE_PATH}/misc-binary.png`,
        "enabled": false,
        "group": "macro-trigger-groups.item"
    },
    "on_item_charges_recovered": {
        "icon": `${IMAGE_PATH}/item-charge-gain.png`,
        "enabled": false,
        "group": "macro-trigger-groups.item"
    },
    "on_item_charges_depleted": {
        "icon": `${IMAGE_PATH}/item-charge-spend.png`,
        "enabled": false,
        "group": "macro-trigger-groups.item"
    },
    "on_item_discharged": {
        "icon": `${IMAGE_PATH}/item-charge-spend.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_recharged": {
        "icon": `${IMAGE_PATH}/item-charge-gain.png`,
        "enabled": false,
        "group": "macro-trigger-groups.item"
    },
    "on_item_zone_entered": {
        "icon": `${IMAGE_PATH}/token-zone-enter.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_item_zone_exited": {
        "icon": `${IMAGE_PATH}/token-zone-exit.png`,
        "enabled": true,
        "group": "macro-trigger-groups.item"
    },
    "on_token_create": {
        "icon": `${IMAGE_PATH}/owner-token-create.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-token"
    },
    "on_token_delete": {
        "icon": `${IMAGE_PATH}/owner-token-delete.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-token"
    },
    "on_token_move": {
        "icon": `${IMAGE_PATH}/owner-token-move.png`,
        "enabled": true,
        "group": "macro-trigger-groups.owner-token"
    },
    "inflict_attack": {
        "icon": `${IMAGE_PATH}/inflict-attack-any.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_melee_attack": {
        "icon": `${IMAGE_PATH}/inflict-attack-melee.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_ranged_attack": {
        "icon": `${IMAGE_PATH}/inflict-attack-ranged.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_spell_attack": {
        "icon": `${IMAGE_PATH}/inflict-attack-spell.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_weapon_attack": {
        "icon": `${IMAGE_PATH}/inflict-attack-weapon.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_damage": {
        "icon": `${IMAGE_PATH}/inflict-hp-down.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_death": {
        "icon": `${IMAGE_PATH}/inflict-death.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_resurrection": {
        "icon": `${IMAGE_PATH}/inflict-resurrection.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_bloodied": {
        "icon": `${IMAGE_PATH}/inflict-bloodied.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_critical_hit": {
        "icon": `${IMAGE_PATH}/inflict-critical-hit.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_hp_zero": {
        "icon": `${IMAGE_PATH}/inflict-hp-zero.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_hp_change": {
        "icon": `${IMAGE_PATH}/inflict-hp-change.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_hp_gain": {
        "icon": `${IMAGE_PATH}/inflict-hp-up.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_hp_damage": {
        "icon": `${IMAGE_PATH}/inflict-hp-down.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_knocked_out": {
        "icon": `${IMAGE_PATH}/inflict-knockout.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_thp_gained": {
        "icon": `${IMAGE_PATH}/inflict-thp-up.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_thp_damage": {
        "icon": `${IMAGE_PATH}/inflict-thp-down.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_thp_zero": {
        "icon": `${IMAGE_PATH}/inflict-thp-zero.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_saving_throw": {
        "icon": `${IMAGE_PATH}/inflict-saving-throw.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_saving_throw_success": {
        "icon": `${IMAGE_PATH}/inflict-saving-throw-success.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_saving_throw_fail": {
        "icon": `${IMAGE_PATH}/inflict-saving-throw-fail.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_ability_check": {
        "icon": `${IMAGE_PATH}/inflict-skill-check.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_ability_check_success": {
        "icon": `${IMAGE_PATH}/inflict-skill-check-success.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_ability_check_fail": {
        "icon": `${IMAGE_PATH}/inflict-skill-check-fail.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_condition": {
        "icon": `${IMAGE_PATH}/inflict-condition-inflict.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_condition_cure": {
        "icon": `${IMAGE_PATH}/inflict-condition-remove.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_buff": {
        "icon": `${IMAGE_PATH}/inflict-buff.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "inflict_debuff": {
        "icon": `${IMAGE_PATH}/inflict-debuff.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "owner_death": {
        "icon": `${IMAGE_PATH}/owner-dead.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_resurrection": {
        "icon": `${IMAGE_PATH}/inflict-resurrection.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "owner_stabilize": {
        "icon": `${IMAGE_PATH}/owner-stabilize.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-inflicts"
    },
    "owner_bloodied": {
        "icon": `${IMAGE_PATH}/owner-bloodied.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_hp_zero": {
        "icon": `${IMAGE_PATH}/owner-hp-zero.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_attacked": {
        "icon": `${IMAGE_PATH}/receive-attack-any.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_attacked_by_melee": {
        "icon": `${IMAGE_PATH}/receive-attack-melee.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_attacked_by_ranged": {
        "icon": `${IMAGE_PATH}/receive-attack-ranged.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_attacked_by_spell": {
        "icon": `${IMAGE_PATH}/receive-attack-spell.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_hp_changed": {
        "icon": `${IMAGE_PATH}/receive-hp-change.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_hp_damaged": {
        "icon": `${IMAGE_PATH}/receive-hp-down.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_hp_gained": {
        "icon": `${IMAGE_PATH}/receive-hp-up.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_critical_hit": {
        "icon": `${IMAGE_PATH}/receive-critical-hit.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_thp_gain": {
        "icon": `${IMAGE_PATH}/receive-thp-up.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_thp_loss": {
        "icon": `${IMAGE_PATH}/receive-thp-down.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_thp_zero": {
        "icon": `${IMAGE_PATH}/receive-thp-zero.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_death_save": {
        "icon": `${IMAGE_PATH}/owner-death-save.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_death_save_success": {
        "icon": `${IMAGE_PATH}/owner-death-save-success.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_death_save_fail": {
        "icon": `${IMAGE_PATH}/owner-death-save-fail.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_saving_throw": {
        "icon": `${IMAGE_PATH}/receive-saving-throw.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_saving_throw_success": {
        "icon": `${IMAGE_PATH}/receive-saving-throw-success.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_saving_throw_fail": {
        "icon": `${IMAGE_PATH}/receive-saving-throw-fail.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_ability_check": {
        "icon": `${IMAGE_PATH}/owner-skill-check.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_ability_check_success": {
        "icon": `${IMAGE_PATH}/owner-skill-check-success.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_ability_check_fail": {
        "icon": `${IMAGE_PATH}/owner-skill-check-fail.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_buffed": {
        "icon": `${IMAGE_PATH}/receive-buff.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_debuffed": {
        "icon": `${IMAGE_PATH}/receive-debuff.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_condition_inflicted": {
        "icon": `${IMAGE_PATH}/receive-condition-inflict.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_condition_cured": {
        "icon": `${IMAGE_PATH}/receive-condition-remove.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_use_action": {
        "icon": `${IMAGE_PATH}/owner-action-normal.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_use_reaction": {
        "icon": `${IMAGE_PATH}/owner-action-reaction.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    },
    "owner_use_bonus_action": {
        "icon": `${IMAGE_PATH}/owner-action-bonus.png`,
        "enabled": false,
        "group": "macro-trigger-groups.owner-receives"
    }
};

export const ItemMacroTriggerList = [
    "Effect.Create",
    "Effect.Delete",
    "Effect.On",
    "Effect.Off",
    "Effect.Update",
    "Spell.Cast",
    "Spell.Prepare",
    "Item.Acquire",
    "Item.Lose",
    "Item.Use",
    "Item.Equip",
    "Item.Unequip",
    "Item.Attune",
    "Item.Unattune",
    "Item.Identify",
    "Effect.Filter.User",
    "Effect.Filter.Target"
];
import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export function register_helper()
{
    info(`Registering SFRPG Helpers`);
  /*
    Override
  */
  game.sfrpg.rollItemMacro = (itemName) => {
    const speaker = ChatMessage.getSpeaker();
    let actor;

    if (speaker.token) actor = game.actors.tokens[speaker.token];
    if (!actor) actor = game.actors.get(speaker.actor);
    const item = actor ? actor.items.find(i => i.name === itemName) : null;
    if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);

    if(item.hasMacro() && settings.value("defaultmacro"))
    {
      return item.executeMacro();
    }else{
      if (item.data.type === 'spell') return actor.useSpell(item);
      return item.roll();
    }
  }
}

export function sheetHooks()
{
  const renderSheets = {
    ActorSheetSFRPGCharacter : ".item .item-image",
    ActorSheetSFRPGNPC : ".item .item-image",
    ActorSheetSFRPGStarship : ".item .item-image",
    ActorSheetSFRPGVehicle : ".item .item-image",
    ActorSheetSFRPGDrone : ".item .item-image",
  };
  const renderedSheets = {

  };

  return { render : renderSheets, rendered : renderedSheets };
}


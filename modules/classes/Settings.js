import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API } from "../aadj-foundry-helper.js";

export default class Settings {
    static value(str){
      return game.settings.get(Settings.data.name, str);
    }
    static i18n(key){
      return aadj.localize(key);
    }
    static register_module(key){
      Settings.data = game.modules.get(key)?.data;
      if(!Settings.data) return aadj.error("Module Registration Error | Data Error | ", key);
    }

    static register(){
      Settings.register_module(aadj.MODULE_NAME);
      aadj.info(`Registering All Settings.`);
      Settings.register_settings();
    }

    static register_settings(){
      const settingData = {
        debug : {
          scope : "client", config : true, default : false, type : Boolean
        },
        defaultmacro : {
          scope : "world", config : true, default : false, type : Boolean, onChange :  () => window.location.reload(),
        },
        charsheet : {
          scope : "world", config : true, default : false, type : Boolean, onChange :  () => window.location.reload(),
        },
        visibilty : {
          scope : "world", config : true, default : false, type : Boolean
        },
        icon : {
          scope : "world", config : true, default : false, type : Boolean
        },
        click : {
          scope : "world", config : true, default : false, type : Boolean, onChange :  () => window.location.reload(),
        },
      };


      Object.entries(settingData).forEach(([key, data])=> {
        game.settings.register(
            Settings.data.name, key, {
            name : aadj.localize(`settings.${key}.title`),
            hint : aadj.localize(`settings.${key}.hint`),
            ...data
          }
        );
      })
    }
  }
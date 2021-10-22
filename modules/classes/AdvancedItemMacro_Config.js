import aadj, { log, warn, error, debug, timelog, localize, AADJ_Helper_API, Settings } from "../aadj-foundry-helper.js";

export default class AdvancedItemMacro_Config extends MacroConfig {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "modules/aadj-foundry-helper/templates/aadj-macro-editor-main.html",
            classes: ["aadj-macro-editor", "macro-editor", "sheet"],
            width: 1024,
            height: 700,
            resizable: true,
            editable: true,
            scrollY: ["section.directory-sidebar"],
        });
    };

    /*
        Overrides, and provides a getter for compatibility with things designed
        to work with Item-Macro module.
    */
    async getData() {
        const data = super.getData();
        let mostRecentlyEditedMacro = await this.object.getFlag(aadj.MODULE_NAME, `mostRecentlyEditedMacro`) || aadj.DEFAULT_TRIGGER;
        data.triggerGroups = aadj.MACRO_TRIGGER_GROUP_DATA;
        data.triggers = aadj.MACRO_TRIGGER_DATA;
        data.openMacroKey = mostRecentlyEditedMacro;
        data.macroData = this.object.getMacros();
        data.macro = this.object.getMacro(mostRecentlyEditedMacro);
        //Object.defineProperty(data, 'command', { get: function() { return this.object.getMacros() || ""; } } );

        return data;
    };

    _onEditImage(event) {
        return ui.notifications.error(aadj.localize("error.editImage"));
    }

    /*
        Override
    */
    async _updateObject(event, formData, trigger = aadj.DEFAULT_TRIGGER) {
        await this.updateMacro(mergeObject(formData, {
            type: "script",
            "trigger": trigger
        }));
    };

    /*
        Override
    */
    async _onExecute(event, trigger = aadj.DEFAULT_TRIGGER) {
        event.preventDefault();
        await this.updateMacro({
           command: this._element[0].querySelectorAll('textarea')[0].value,
           "trigger": trigger
        });
    };

    async updateMacro({ command, type, trigger = aadj.DEFAULT_TRIGGER }) {
        await this.object.setMacro(null, trigger, new Macro({
            "name": this.object.data.name,
            "type": type,
            "scope": "global",
            "command": command,
            "author": game.user.id,
            "trigger": trigger,
        }, trigger));
    }

    async _render(force, options = {}) {
        await super._render(force, options);
    }

    saveCurrentScript(form) {
        let saveScript = form.find("textarea").val();
        let currentKey = form.find("input[name=currentKey]").val();

        this.object.setMacro(currentKey, {
            "name": this.object.data.name,
            "type": type,
            "scope": "global",
            "command": saveScript,
            "author": game.user.id,
            "key": currentKey
        });
    }

    loadScript(form, key) {
        let loadScript = this.object.getMacro(key) || "";
        form.find("textarea").val(loadScript?.command || "");
        form.find("input[name=currentKey]").val(key);
    }

    onChangeEvent(event) {
        const form = $(this.form);
        let key = form.find("select[name=trigger]").val();

        this.object.unsetFlag(aadj.MODULE_NAME,`mostRecentlyEditedMacro`);
        this.object.setFlag(aadj.MODULE_NAME, `mostRecentlyEditedMacro`, key);

        this.saveCurrentScript(form);


        this.loadScript(form, key);
    }

    onSaveButtonClick(event) {
        event.preventDefault();
        this.saveCurrentScript();
    }

    activateListeners(html) {
        super.activateListeners(html);

        $('.sidebar-toggle', html).on('click', $.proxy(function() {
            if (this._collapsed)
                this.expandSidebar();
            else
                this.collapseSidebar();
        }, this));

        let form = html.find("form");
        if (form.length === 0) form = html;

        form.find("select[name=trigger]").on("change", this.onChangeEvent.bind(this));
        form.find("select[name=savemacrocmd]").on("click",this.onSaveButtonClick.bind(this));
    }

    static _init(app, html, data) {
        aadj.debug(" App | ", app);
        aadj.debug(" HTML | ", html);
        aadj.debug(" Data | ", data);

        if((aadj.Settings.value("visibilty") && app.object.isOwner) || game.user.isGM){
            let openButton = $(`<a class="open-itemacro" title="itemacro"><i class="fas fa-sd-card"></i>${aadj.Settings.value("icon") ? "" : "Item Macro"}</a>`);
            openButton.click(event => {
                let Macro = null;
                for (let key in app.document.apps) {
                    let obj = app.document.apps[key];
                    if (obj instanceof AdvancedItemMacro_Config) {
                        Macro = obj;
                        break;
                    }
                }
                if(!Macro) Macro = new AdvancedItemMacro_Config(app.document,{});
                Macro.render(true);
            });
            html.closest('.app').find('.open-itemacro').remove();
            let titleElement = html.closest('.app').find('.window-title');
            openButton.insertAfter(titleElement);
        }
    }

    expandSidebar() {
        this._collapsed = false;
        $('.aadj-macro-editor', this.element).removeClass('collapse');
        $('.sidebar-toggle i', this.element).removeClass('fa-caret-left').addClass('fa-caret-right');
    }
    collapseSidebar() {
        this._collapsed = true;
        $('.aadj-macro-editor', this.element).addClass('collapse');
        $('.sidebar-toggle i', this.element).removeClass('fa-caret-right').addClass('fa-caret-left');

    }
}
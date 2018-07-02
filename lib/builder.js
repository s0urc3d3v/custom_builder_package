'use babel';

import BuilderView from './builder-view';
import { CompositeDisposable } from 'atom';

export default {

  builderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.builderView = new BuilderView(state.builderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.builderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'builder:build': () => this.build()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'builder:editCommands': () => this.editCommands()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.builderView.destroy();
  },

  serialize() {
    return {
      builderViewState: this.builderView.serialize()
    };
  },

  build() {
    var config_exits = atom.project.contains(atom.project.getPaths() + "/builder.setup") //Does not support multi path projects yet
    if (config_exits){
      //run config
    }
  }

/*  editCommands(){
    this.modalPanel.visible = true
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  } */

};

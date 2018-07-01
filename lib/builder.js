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
      'builder:toggle': () => this.toggle()
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

  toggle() {
    console.log('Builder was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

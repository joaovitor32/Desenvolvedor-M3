import {
  Components
} from '../../Shared/Component.js';

export class Header extends Components {

  constructor(renderHookId) {
    super(renderHookId,false);
    this.render()
  }

  render() {

    const header = this.createRootElement('div', 'header-grid');
    header.innerHTML = `<div class="row1">
      <img  src="images/m3.png">
    </div>
    <div class="row2">
      <img class="logo-menu" src="images/wallet.svg" />
      <div id="box-carrinho-display" class="hide-carrinho">
        
      </div>
    </div>`

  }

}
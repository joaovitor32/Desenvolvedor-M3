import {
    Components
  } from '../../Shared/Component.js';
  
  export class Footer extends Components {
  
    constructor(renderHookId) {
      super(renderHookId,false);
      this.render()
    }
  
    render() {
  
      const footer = this.createRootElement('footer');
      footer.innerHTML = `<p>Agência M3 - Agência de Performance Digital</p>`
  
    }
  
  }
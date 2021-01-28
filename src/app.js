import {Header} from './components/Header/Header.js';
import {Footer} from './components/Footer/Footer.js';
import {BarraLateralEsquerda} from './components/BarraLateralEsquerda/BarraLateralEsquerda.js'
import {Cart} from './components/Cart/Cart.js'
import {SecaoProdutos} from './components/SecaoProdutos/SecaoProdutos.js'

export class App{

    static init(){
        new Header('app');
        new BarraLateralEsquerda('app');
        new Footer('app');
        
        this.secaoProdutos = new SecaoProdutos('app');
        this.cart = new Cart();
    }

    static addProductToCart(product) {
        this.cart.addCartProduct(product);
    }

    static sendFilters(filtros) {
        this.secaoProdutos.ApplyFilters(filtros);
    }

}

window.onload =App.init();  
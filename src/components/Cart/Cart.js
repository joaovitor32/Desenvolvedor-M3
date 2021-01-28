import {
    Components
  } from '../../Shared/Component.js';

export class Cart extends Components {

    items = [];
    boxCarrinhoDisplay;

    constructor(renderHookId) {
        super(renderHookId,false);
        this.render();
    }

    get totalAmount() {
        const sum = this.items.reduce(
            (prevValue, curItem) => prevValue + curItem.sum, 0
        );
        return sum;
    }

    render = () => {
        const boxCarrinhoDisplay = document.getElementById('box-carrinho-display');

        let innerCarrinho = "";
        if (this.items.length == 0) {
            innerCarrinho = "<p class='carrinho-p-empty'>O carrinho está vazio</p>"
        } else {
            this.items.forEach(cartItem => {
                innerCarrinho += `<p class="carrinho-p">Nome: ${cartItem.nome} - ${cartItem.quantity} -  R$ ${cartItem.sum.toFixed(2)}</p>`
            })
            innerCarrinho += `<p class="sum-p">Total: ${this.totalAmount.toFixed(2)} reais</p>`
        }
        boxCarrinhoDisplay.innerHTML = innerCarrinho;
    }

    addCartProduct(produto) {
        let hasValue = this.items.some(item => item.id == produto.codProduto);
        if (hasValue) {
            this.items.forEach(cartItem => {
                if (cartItem.id == produto.codProduto) {
                    cartItem.quantity += 1;
                    cartItem.sum += produto.preco;
                    return
                }
            })
        } else {
            this.items.push({
                id: produto.codProduto,
                quantity: 1,
                sum: produto.preco,
                nome: produto.nome
            });
        }
        this.render();
    }
}
import {
    Components
} from '../../Shared/Component.js';

import {App} from '../../app.js';


export class SecaoProdutos extends Components {

    #produtos=[];

    #datbaseProdutos=[
        {"codProduto":1,"nome":"CAMISETA MESCLA","preco":28,"cor":"Branca","tamanho":"G","parcelas":3,"imagem":"img_2","value":1},
        {"codProduto":2,"nome":"SAIA EM COURO","preco":398,"cor":"Laranja","tamanho":"GG","parcelas":5,"imagem":"img_3","value":4},
        {"codProduto":3,"nome":"CARDIGAN TIGRE","preco":398,"cor":"Laranja","tamanho":"M","parcelas":5,"imagem":"img_4","value":4},
        {"codProduto":4,"nome":"CARDIGAN OFF WHITE","preco":99.99,"cor":"Branca","tamanho":"P","parcelas":3,"imagem":"img_5","value":2},
        {"codProduto":5,"nome":"BODY LEOPARDO","preco":129.90,"cor":"Marrom","tamanho":"36","parcelas":3,"imagem":"img_6","value":3},
        {"codProduto":6,"nome":"CASACO PELOS","preco":398,"cor":"Rosa","tamanho":"38","parcelas":5,"imagem":"img_7","value":4},
        {"codProduto":7,"nome":"CROPPED STRIPES","preco":120,"cor":"Azu","tamanho":"40","parcelas":3,"imagem":"img_8","value":3},
        {"codProduto":8,"nome":"CAMISA TRANSPARENTE","preco":398,"cor":"Preta","tamanho":"42","parcelas":5,"imagem":"img_9","value":4},
        {"codProduto":9,"nome":"POCHETE CLUTCH","preco":398,"cor":"Preta","parcelas":3,"tamanho":"46","imagem":"img_10","value":4}
    ]

    selectPrecos;

    constructor(renderHookId) {
        super(renderHookId, false);
        
        this.#produtos = this.#datbaseProdutos;
        
        this.render();
        this.fetchProdutos();

        this.selectPrecos=document.getElementById("select-precos");

        this.addFiltro();
    
    }

    addFiltro() {
        Array.prototype.forEach.call(this.selectPrecos, (nodeOption) => {
            this.selectPrecos.addEventListener('change', (node) => {
                switch (node.target.value) {
                    case 'decrescente':
                        this.ordernarMaiorMenor();
                        break;
                    case 'crescente':
                        this.ordernarMenorMaior();
                        break;
                }
            })
        });
    }

    cardEffects = () => {
        let cards = document.getElementsByClassName('card');
        let delay = 0.2;
        Object.values(cards).forEach(card => {
            card.style.animationDelay = delay + "s"
            delay += 0.1;
        })
    }

    fetchProdutos = () => {
        let card = ""
        let cardBox = document.getElementById('container-cards');

        cardBox.innerHTML = "";
        cardBox.removeAttribute('class');

        if (this.#produtos.length!=0) {
            cardBox.classList.add('container-cards-style');
            this.#produtos.forEach(produto => {

                const card = document.createElement('div');
                card.className = "card";

                card.innerHTML = `<div class="card-content">
                 <img src="images/${produto.imagem}.png">
                 <p class="nome">${produto.nome}</p>
                 <p class="preco">R$ ${produto.preco}</p>
                 <p class="parcelas">até ${produto.parcelas}x de R$ ${(produto.preco / produto.parcelas).toFixed(2)}</p>
                <button class="btn-comprar"  name="add-prod">COMPRAR</button></div>`

                const button = card.querySelector('button');
                button.addEventListener('click', () => {
                    App.addProductToCart(produto);
                })

                cardBox.append(card);
            });

        } else {
            cardBox.classList.add('no-product-style');
            card += '<div class="card-no-product">'
            card += "<div class='no-product'>Nenhum produto foi encontrado.</div>"
            card += '</div>';
            cardBox.innerHTML = card;
            
            setTimeout(()=>{
                this.#produtos=this.#datbaseProdutos;
                this.fetchProdutos();
            },1500)

        }
        this.cardEffects();
       
    }

    ApplyFilters({tag,value}){  

        switch(tag){

            case 'tam':
                this.#produtos=this.#produtos.filter(elem => elem.tamanho==value);
                break
            case 'preco':
                this.#produtos=this.#produtos.filter(elem => elem.value==value);
                break;
            case 'cor':
                this.#produtos=this.#produtos.filter(elem => elem.cor==value);
                break;

        }

        this.fetchProdutos();        
    
    }

    ordernarMaiorMenor() {

        this.#produtos = this.#produtos.sort((a, b) => {
            return b.preco - a.preco;
        });

        this.fetchProdutos();
    }

    ordernarMenorMaior() {

        this.#produtos = this.#produtos.sort((a, b) => {
            return a.preco - b.preco;
        });

        this.fetchProdutos();
    }


    render() {

        const div = this.createRootElement('div','card-box');
        div.innerHTML = `
            <div class="container-select-box">
                <select id="select-precos"> 
                    <option >Mais recentes</option>
                    <option value="crescente" >Menor preço</option>
                    <option value="decrescente" >Maior preço</option>
                </select>
            </div>
                <div id="container-cards">
                
                </div>
            <div class="carregar-mais">
                <button id="btn-card" onclick="carregarMais()">CARREGAR MAIS</button>
            <div>
        `

    }

}
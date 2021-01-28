import { App } from '../../app.js';
import {
    Components
} from '../../Shared/Component.js';

export class BarraLateralEsquerda extends Components {

    #cores=[];
    #tamanhos=[];
    #precos=[];

    constructor(renderHookId) {
        super(renderHookId, false);
        
        this.#cores=[
            {"codCor":1,"cor":"Azul"},
            {"codCor":2,"cor":"Branca"},
            {"codCor":3,"cor":"Preta"},
            {"codCor":4,"cor":"Amarela"},
            {"codCor":5,"cor":"Rosa"},
            {"codCor":6,"cor":"Laranja"}
        ],

        this.#tamanhos=[
            {"codTamanho":1,"tamanho":"P"},
            {"codTamanho":2,"tamanho":"M"},
            {"codTamanho":3,"tamanho":"G"},
            {"codTamanho":4,"tamanho":"GG"},
            {"codTamanho":5,"tamanho":"U"},
            {"codTamanho":6,"tamanho":"36"},
            {"codTamanho":7,"tamanho":"38"},
            {"codTamanho":8,"tamanho":"40"},
            {"codTamanho":9,"tamanho":"42"},
            {"codTamanho":10,"tamanho":"44"},
            {"codTamanho":11,"tamanho":"46"}
        ]

        this.#precos=[
            {"codPreco":1,"preco":"R$ 0 até R$ 50","value":1},
            {"codPreco":2,"preco":"R$ 51 até R$ 150","value":2},
            {"codPreco":3,"preco":"R$ 151 até R$ 300","value":3},
            {"codPreco":4,"preco":"R$ 301 até R$ 500","value":4}
        ]

        this.render()
        
        this.fetchCor();
        this.fetchPrecos();
        this.fetchTamanhos();

        this.monitoringCor();
        this.monitoringTamanho();
        this.monitoringPreco();
        
    }
    
    checkBoxPickOne = (checkboxes, checkbox) => {
        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false
        })
    }

    monitoringCor() {
        let coresCheck =  document.getElementById('box-cor').querySelectorAll("input");
        Array.prototype.forEach.call(coresCheck, (node) => {
            node.addEventListener('change', () => {
                this.checkBoxPickOne(coresCheck, node);
                if (node.checked) {
                    this.sendFilters({tag:'cor',value:node.value});
                }
            })
        })
    }

    monitoringTamanho() {
        let btnTam = document.getElementsByName('button-tamanho');
        Array.prototype.forEach.call(btnTam, (btn) => {
            btn.addEventListener('click', () => {
                this.sendFilters({tag:'tam',value:btn.value});
            })
        })
    }

    monitoringPreco() {
        let precosCheck = document.getElementsByName('check-preco');
        Array.prototype.forEach.call(precosCheck, (node) => {
            node.addEventListener('change', () => {
                this.checkBoxPickOne(precosCheck, node);
                if (node.checked) {
                    this.sendFilters({tag:'preco',value:node.value});
                }
            })
        })
    }

    sendFilters({tag,value}){
        App.sendFilters({tag,value})
    }

    fetchCor(){
        
        let htmlCor = '';
        
        this.#cores.forEach(cor => {
            htmlCor += `<div><input type="checkbox" name="check-cor" value="${cor.cor}" /><label>${cor.cor}</label></div>`
        })

        document.getElementById('box-cor').innerHTML=htmlCor
    }

    fetchPrecos = () => {
        let boxPreco = document.getElementById('box-preco');
        let htmlPreco = '';
        
        this.#precos.forEach(preco => {
            htmlPreco += `<div><input type="checkbox" name="check-preco" value="${preco.codPreco}"><label>de ${preco.preco}</label></div>`
        })
        
        boxPreco.innerHTML=htmlPreco

    }

    fetchTamanhos = () => {
        let boxTam=document.getElementById("box-tam");
        
        let htmlTam = '';
        this.#tamanhos.forEach(tam => {
            htmlTam += `<button name="button-tamanho" value="${tam.tamanho}">${tam.tamanho}</button>`
        })

        boxTam.innerHTML=htmlTam;
    }

    render() {

        const header = this.createRootElement('div', 'box-filters');
        header.innerHTML = ` <div class="box-content">
            <p class="blusas-p">Blusas</p>
          
            <div class="box-cores">
                <p>CORES</p>
                <div id="box-cor"  class="box-input-cores">
                            
                </div>
            </div>
            
            <div class="box-tamanhos">
                <p>TAMANHOS</p>
                <div  id="box-tam" class="box-button-tamanhos">
                        
                </div>
            </div>


            <div class="box-precos">
                <p>FAIXAS DE PRECO</p>
                <div id="box-preco" class="box-input-precos">
                            
                </div>
            </div>

        </div>`

    }

}
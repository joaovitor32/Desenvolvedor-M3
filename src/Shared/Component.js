export class Components{

    constructor(renderHookId,shouldRender=true){

        this.hookId=renderHookId;
        if(shouldRender){
            this.render();
        }

    }

    render(){}

    createRootElement(tag,cssClasses,atrributes){

        const rootElement = document.createElement(tag);

        if(cssClasses){
            rootElement.className=cssClasses;
        }

        if(atrributes && atrributes.length>0){
            
            for(const attr of atrributes){
                rootElement.setAttribute(attr.name,attr.value);
            }

        }

        document.getElementById(this.hookId).append(rootElement);
        return rootElement;

    }

}
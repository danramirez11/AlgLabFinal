import stylesItem from "./Item.css"

export enum Attribute {
    "name" = "name",
    "quantity" = "quantity",
    "price" = "price",
    "img" = "img"
}

class Item extends HTMLElement{
    
    name?: string
	quantity?: number
    price?: number
    img?: string
    
    static get observedAttributes(){
        const attrs: Record<Attribute,null> = {
            name: null,
            quantity: null,
            price: null,
            img: null,
        }
        return Object.keys(attrs);
    }
    
    attributeChangedCallback(propName:Attribute,oldValue: string | undefined,newValue: string | undefined){
        switch(propName){
            case Attribute.quantity:
                this.quantity = newValue ? Number(newValue) : undefined;
            break;
            case Attribute.price:
                this.price = newValue ? Number(newValue) : undefined;
            break;
            default: 
            this[propName] = newValue;
            break;
        }
        this.render();
    }
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();
        
    }
    
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <style>${stylesItem}</style>
            <section>
            <h3>${this.name}</h3>
            <p>$${this.price}</p>
            <p>Quantity: ${this.quantity}</p>
            <img src="${this.img}">
            </section>
            `
        }
    }
}

customElements.define("my-item", Item);
export default Item;
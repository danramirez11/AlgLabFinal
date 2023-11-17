import firebase from "../../utils/firebase";
import events from "../../utils/events";
import styles from "./Forms.css"

const forms = {
    name: " ",
	quantity: " ",
    price: " ",
    img: " ",
}



export default class Forms extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();

		const button = this.shadowRoot?.querySelector('button');
		button?.addEventListener('click', this.upload)

		const name = this.shadowRoot?.querySelector('.name');
		name?.addEventListener('change', this.changeName)

		const quantity = this.shadowRoot?.querySelector('.quantity');
		quantity?.addEventListener('change', this.changeQ)

		const price = this.shadowRoot?.querySelector('.price');
		price?.addEventListener('change', this.changePrice);

		const img = this.shadowRoot?.querySelector('.img');
		img?.addEventListener('change', this.changeImg)
	}

	changeName(e: any){
        forms.name = e.target.value;
    }

	changeQ(e: any){
        forms.quantity = e.target.value;
    }

	changePrice(e: any){
        forms.price = e.target.value;
    }

	changeImg(e: any){
        forms.img = e.target.value;
    }

	upload(){
		firebase.addPost(forms)
		console.log(forms)
		events.dispatchEvent(new Event('uploadData'));
	}

	render() {
		if (this.shadowRoot)
			this.shadowRoot.innerHTML = `<style>${styles}</style>
		    <section>
			<input type="text" class="name" placeholder="name">
			<input type="text" class="quantity" placeholder="quantity">
            <input type="text" class="price" placeholder="price">
            <input type="text" class="img" placeholder="img">
			<button>Upload</button>
			</section>
        `;

		
	}
}

customElements.define('my-forms', Forms);
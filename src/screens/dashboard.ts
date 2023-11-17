import Forms from "../components/Forms/Forms";
import  Item, { Attribute } from "../components/Item/Item";
import firebase from "../utils/firebase";
import events from "../utils/events";
import { serverTimestamp } from "firebase/firestore";

export default class Dashboard extends HTMLElement {

	items: Item[] = []

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const postData = await firebase.getPost()
        
        postData.forEach(async (post: any) => {
            const newpost = this.ownerDocument.createElement("my-item") as Item;
            newpost.setAttribute(Attribute.img, post.img);
            newpost.setAttribute(Attribute.name, post.name);
            newpost.setAttribute(Attribute.price, post.price);
			newpost.setAttribute(Attribute.quantity, post.quantity)
            this.items.push(newpost);
        })

		this.render();

		events.addEventListener('uploadData', async () => {
		const postData = await firebase.getPost()

		this.items = [ ]
        
        postData.forEach(async (post: any) => {
            const newpost = this.ownerDocument.createElement("my-item") as Item;
            newpost.setAttribute(Attribute.img, post.img);
            newpost.setAttribute(Attribute.name, post.name);
            newpost.setAttribute(Attribute.price, post.price);
			newpost.setAttribute(Attribute.quantity, post.quantity)
            this.items.push(newpost);
        })

		this.render();
	})
		
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `<style></style>`;

		const forms = this.ownerDocument.createElement('my-forms');
        this.shadowRoot?.appendChild(forms)

		const section = this.ownerDocument.createElement('section');
		this.shadowRoot?.appendChild(section);

		this.items.forEach((item) => {
			section.appendChild(item)
		})

	}
}

customElements.define('app-dashboard', Dashboard);
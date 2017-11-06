import Wallet from './core/wallet';

window.addEventListener('load',() => {

	let walletApp = new Wallet();
	walletApp.transactions();


document.getElementById("cards").addEventListener("click", (e) => {
	console.log(e);
	if(e.target && e.target.nodeName == "LI") {
		let id = e.target.getAttribute('data-id');
		console.log(id);
		walletApp.transactions(id);
	}
});

	// });
	// document.querySelector('super-ultra-element').shadowRoot;

});
import Wallet from './wallet';

// waiting for the page loading
window.addEventListener('load',() => {

  let walletApp = Wallet.getInstance();

  // listening to event click on the LI element inside of #cards
  document.getElementById("cards").addEventListener("click", (e) => {
    if(e.target && e.target.nodeName == "LI") {
      let id = e.target.getAttribute('data-id');
      walletApp.transactions(id);

      // checking the cards to add the active class
      let elements = document.getElementById('cards').children;
      for (let i = 0; i < elements.length; ++i) {
          elements[i].classList.remove("active");
      }
      e.target.classList.add("active");

    }
  }, true);

});
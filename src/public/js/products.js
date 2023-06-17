import { cartService } from "./../../services/carts.service.js"; //no se importa

let idCart = "";

async function addCart() {
  const btnAdd = document.querySelector('.btn-add');
  const result = await cartService.addProductToCart(idCart, btnAdd.value);
  console.log(result);
}

async function createCart() {
  const cart = await cartService.createCart();
  idCart = cart._id;
  console.log(idCart)
}

window.addEventListener('DOMContentLoaded', async function() {
  await createCart();
});
import HttpMethods from './httpMethods.js';

const cardContainer = document.querySelector('.cartContainer');
const templateCart = document.getElementById('templateCart').content;
const templateListProduct = document.getElementById(
	'templateListProduct'
).content;
const templateTitleListProduct = document.getElementById(
	'templateTitleListProduct'
).content;
const fragment = document.createDocumentFragment();
const fragmentProduct = document.createDocumentFragment();
const fragmentListProduct = document.createDocumentFragment();

const cartForm = document.getElementById('cartFormPost');

const imageDefault =
	'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png';

cartForm.addEventListener('submit', (e) => {
	cartForm.querySelector('input').focus();
});

const getCarts = () => {
	fetch(`/api/carrito`)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				return (cardContainer.innerHTML = `<h1>${data.error}</h1>`);
			}
			console.log(data);
			data.map((item) => {
				const clone = templateCart.cloneNode(true);
				clone.querySelector('.cart h1').innerText =
					item.cartName.toUpperCase();
				clone
					.querySelectorAll('.cardCart .iconDeleteCart i')
					.forEach((icon) => (icon.id = item.id));
				if (item.products.length) {
					item.products.forEach((product) => {
						const li = document.createElement('li');
						li.innerText = product.name;

						fragmentProduct.appendChild(li);
					});
					clone
						.querySelector('.cart ul')
						.appendChild(fragmentProduct);
				} else
					clone.querySelector('.cart ul').innerHTML =
						'<p>Carrito vacío</p>';
				fragment.appendChild(clone);
			});

			cardContainer.appendChild(fragment);
		});
};

const getListProductFromCart = (id) => {
	fetch(`/api/carrito/${id}/productos`)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				return (cardContainer.innerHTML = `<h1>${data.error}</h1>`);
			}
			const clone = templateTitleListProduct.cloneNode(true);
			data.forEach((item) => {
				if (!item.products.length)
					return (cardContainer.innerHTML = `<div class="buttonsCart">
					<button><a href="/productos">Agregar productos</a></button>
					<button><a href="/carrito">Volver</a></button>
					</div>`);
				item.products.map((product) => {
					const clone = templateListProduct.cloneNode(true);

					if (
						product.url.includes('http') ||
						product.url.includes('https')
					) {
						clone.querySelector('.product img').src = product.url;
					} else
						clone.querySelector('.product img').src = imageDefault;

					clone.querySelector('.product h1').innerText = product.name;
					clone.querySelector('.product h3').innerText =
						product.price;
					clone.querySelector('.product h4').innerText =
						product.stock;

					clone.querySelector('.product button').id = item.id;
					clone
						.querySelector('.product button')
						.setAttribute('id_prod', product.id);

					fragmentListProduct.appendChild(clone);
				});
				cardContainer.appendChild(clone);
				cardContainer.appendChild(fragmentListProduct);
			});
		});
};

document.addEventListener('HtmlDomLoad', getCarts());

const http = new HttpMethods();

document.addEventListener('click', (e) => {
	if (e.target.classList.value == 'delete') {
		cardContainer.innerHTML = '';
		http.delete(`/api/carrito/${e.target.id}/productos`);
		getCarts();
	}
	if (e.target.classList.value == 'deleteListProduct') {
		cardContainer.innerHTML =
			'<div class="backButton"><button><a href="/carrito">Volver</a></button></div>';
		http.delete(
			`/api/carrito/${e.target.id}/productos/${e.target.getAttribute(
				'id_prod'
			)}`
		);
		getListProductFromCart(e.target.id);
	}
	if (e.target.classList.value == 'fa-solid fa-trash-can') {
		cardContainer.innerHTML = '';
		http.delete(`/api/carrito/${e.target.id}`);
		getCarts();
	}
	if (e.target.classList.value == 'fa-solid fa-eye') {
		cardContainer.innerHTML =
			'<div class="backButton"><button><a href="/carrito">Volver</a></button></div>';
		http.get(`/api/carrito/${e.target.id}/productos`);
		getListProductFromCart(e.target.id);
	}
});

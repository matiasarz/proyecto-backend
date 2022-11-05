import HttpMethods from './httpMethods.js';

const cardContainer = document.querySelector('.cardContainer');
const templateCard = document.getElementById('templateCard').content;
const fragment = document.createDocumentFragment();
const fragmentOption = document.createDocumentFragment();

const imageDefault =
	'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png';

const cartNames = async () => {
	let response = [];
	await fetch('/api/carrito')
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				return { error: 'Cart no found' };
			}
			data.forEach((item) => response.push(item));
		});

	return response;
};

const getData = () => {
	cartNames().then((cartData) => {
		fetch('/api/productos')
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					return (cardContainer.innerHTML = `<h1>${data.error}</h1>`);
				}
				data.map((item) => {
					console.log;
					const clone = templateCard.cloneNode(true);
					clone.querySelector('.card h1').innerText = item.name;
					if (
						item.url.includes('http') ||
						item.url.includes('https')
					) {
						clone.querySelector('.card img').src = item.url;
					} else clone.querySelector('.card img').src = imageDefault;
					clone.querySelector('.card img').alt = item.name;
					clone.querySelector('.card p').innerText = `$${item.price}`;
					clone.querySelector(
						'.card span'
					).innerText = `stock: ${item.stock}`;

					cartData.forEach((cart) => {
						const option = document.createElement('option');
						option.innerText = cart.cartName;
						option.id = cart.id;

						fragmentOption.appendChild(option);
					});
					if (!cartData.length) {
						clone.querySelector('.card .selectCart').style.display =
							'none';
						clone.querySelector('.card .addCart').style.disabled =
							'active';
					}
					clone
						.querySelector('.card .selectCart')
						.appendChild(fragmentOption);

					if (userFromLocalStorage.userType === 'usuario') {
						clone.querySelector(
							'.card .buttonsEdit .delete'
						).style.display = 'none';
					}
					clone.querySelector('.card .delete').id = item.id;
					clone.querySelector('.card .addCart').id = item.id;

					fragment.appendChild(clone);
				});

				cardContainer.appendChild(fragment);
			});
	});
};
document.addEventListener('DOMContentLoaded', getData());

const http = new HttpMethods();

document.addEventListener('click', (e) => {
	if (e.target.classList.value == 'delete') {
		cardContainer.innerHTML = '';
		http.delete(`/api/productos/${e.target.id}`);
		getData();
	}
});

setTimeout(() => {
	document
		.querySelectorAll('.cardContainer .card .formAddToCart')
		.forEach((item) =>
			item.addEventListener('submit', (e) => {
				const cartName = item.querySelector('.selectCart').value;

				const select = item.querySelector('.selectCart');

				let cartID;

				select.querySelectorAll('option').forEach((option) => {
					if (option.value == cartName) {
						cartID = option.id;
					}
				});

				const productID = item.querySelector('.addCart').id;

				select.name = productID;

				item.action = `/api/carrito/${cartID}/productos`;
			})
		);
}, 500);

import HttpMethods from './httpMethods.js';

const http = new HttpMethods();

if (userFromLocalStorage.userType === 'administrador') {
	userView.style.display = 'none';
} else {
	adminView.style.display = 'none';
}

const formGet = document.getElementById('formGet');
const inputGetID = document.getElementById('idGet');

const formPut = document.getElementById('formPut');

const list = document.querySelector('.list');
const getAll = document.getElementById('allProducts');

const sendData = (object) => {
	inputGetID.value = '';
	list.innerHTML = '';
	if (object.error) {
		return (list.innerHTML = `<h1>${object.error}</h1>`);
	}
	object.map((product) => {
		list.innerHTML += `<div><h1>${product.name}</h1>
		<img src=${product.url} alt=${product.name}>
		<p>$${product.price}</p>
		<span>Stock:${product.stock}</span></div>
				`;
	});
};

formGet.addEventListener('submit', (e) => {
	e.preventDefault();
	const value = inputGetID.value;
	fetch(`/api/productos/${value}`)
		.then((res) => res.json())
		.then((data) => {
			sendData(data);
		});
	inputGetID.focus();
});

getAll.addEventListener('click', (e) => {
	fetch(`/api/productos`)
		.then((res) => res.json())
		.then((data) => {
			sendData(data);
		});
});

const inputName = document.getElementById('namePut');
const inputID = document.getElementById('idPut');
const inputPrice = document.getElementById('pricePut');
const inputStock = document.getElementById('stockPut');
const inputUrl = document.getElementById('urlPut');

formPut.addEventListener('submit', (e) => {
	e.preventDefault();
	const updateProduct = {
		id: inputID.value,
		name: inputName.value,
		price: inputPrice.value,
		stock: inputStock.value,
		url: inputUrl.value,
	};

	const product = JSON.stringify(updateProduct);

	http.put(`/api/productos/${inputID.value}`, product);

	inputID.value = '';
	inputName.value = '';
	inputPrice.value = '';
	inputStock.value = '';
	inputUrl.value = '';
});

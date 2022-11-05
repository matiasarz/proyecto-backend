const formGetUser = document.getElementById('formGetUser');
const inputGetIDUser = document.getElementById('idGetUser');

const listUser = document.querySelector('.listUser');
const getAllUser = document.getElementById('allProductsUser');

const sendDataUser = (object) => {
	inputGetIDUser.value = '';
	listUser.innerHTML = '';
	if (object.error) {
		return (listUser.innerHTML = `<h1>${object.error}</h1>`);
	}
	object.map((product) => {
		listUser.innerHTML += `<div><h1>${product.name}</h1>
		<img src=${product.url} alt=${product.name}>
		<p>$${product.price}</p>
		<span>Stock:${product.stock}</span></div>
				`;
	});
};

formGetUser.addEventListener('submit', (e) => {
	e.preventDefault();
	const value = inputGetIDUser.value;
	fetch(`/api/productos/${value}`)
		.then((res) => res.json())
		.then((data) => {
			sendDataUser(data);
		});
	inputGetIDUser.focus();
});

getAllUser.addEventListener('click', (e) => {
	fetch(`/api/productos`)
		.then((res) => res.json())
		.then((data) => {
			sendDataUser(data);
		});
});

const form = document.getElementById('form');
const inputName = document.getElementById('inputName');
const user = document.getElementById('user');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const newUser = {
		name: inputName.value,
		userType: user.value,
	};
	localStorage.setItem('user', JSON.stringify(newUser));
	window.location.replace('/');
});

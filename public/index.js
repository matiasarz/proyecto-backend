const iconUser = document.getElementById('iconUser');
const adminView = document.getElementById('admin');
const userView = document.getElementById('user');

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

if (!userFromLocalStorage) {
	window.location.replace('/log-in');
}

if (userFromLocalStorage.userType) {
	iconUser.className = 'fa-regular fa-user';
	iconUser.textContent = userFromLocalStorage.userType;
} else iconUser.className = 'fa-solid fa-arrow-right-to-bracket';

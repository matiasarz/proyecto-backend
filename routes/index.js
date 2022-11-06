const express = require('express');

const fs = require('fs');

class Product {
	constructor(name) {
		this.name = name;
		this.fs = fs;
	}

	getAllProducts() {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			return arrayProductsParseado.length
				? arrayProductsParseado
				: { error: 'Product not found' };
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	getProductById(id) {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			const product = arrayProductsParseado.filter(
				(item) => item.id == id
			);
			return product.length ? product : { error: 'Product not found' };
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	createProduct(object) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);
			object.id = prevParseado.length + 1;
			prevParseado.push(object);
			this.fs.writeFileSync(
				`${this.name}.txt`,
				JSON.stringify(prevParseado)
			);
		} catch (e) {
			object.id = 1;
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify([object]));
		}
	}

	updateProductById(id, update) {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			const productUpdated = arrayProductsParseado.map((product) => {
				if (product.id == id) {
					update.id = id;
					return (product = update);
				} else {
					return product;
				}
			});
			this.fs.writeFileSync(
				`${this.name}.txt`,
				JSON.stringify(productUpdated)
			);
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	deleteProductById(id) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);
			const producstRemaining = prevParseado.filter(
				(product) => product.id != id
			);
			let newID = 0;
			const newArr = producstRemaining.map((item) => {
				item.id = ++newID;
				return item;
			});
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify(newArr));
		} catch (e) {
			return { error: 'Product not found' };
		}
	}
}

class Cart {
	constructor(name) {
		this.name = name;
		this.fs = fs;
	}

	getAllCarts() {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			return arrayProductsParseado.length
				? arrayProductsParseado
				: { error: 'Product not found' };
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	getListProductFromCart(id) {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			const product = arrayProductsParseado.filter(
				(item) => item.id == id
			);
			return product.length ? product : { error: 'Product not found' };
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	createCart(object) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);
			object.id = prevParseado.length + 1;
			prevParseado.push(object);
			this.fs.writeFileSync(
				`${this.name}.txt`,
				JSON.stringify(prevParseado)
			);
		} catch (e) {
			object.id = 1;
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify([object]));
		}
	}

	getAllProductsFromCart() {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			return arrayProductsParseado.cart.products.length
				? arrayProductsParseado
				: { error: 'Product not found' };
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	addProductToCart(id, object) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);

			const updateCart = prevParseado.map((cart) => {
				if (cart.id == id) {
					cart.products.push(object);
				}
				return cart;
			});

			this.fs.writeFileSync(
				`${this.name}.txt`,
				JSON.stringify(updateCart)
			);
		} catch (e) {
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify(object));
		}
	}

	deleteCartById(id) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);
			const producstRemaining = prevParseado.filter(
				(product) => product.id != id
			);
			let newID = 0;
			const newArr = producstRemaining.map((item) => {
				item.id = ++newID;
				return item;
			});
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify(newArr));
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	deleteProductById(cartID, productID) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);
			const producstRemaining = prevParseado.map((cart) => {
				if (cart.id == cartID) {
					cart.products = cart.products.filter(
						(product) => product.id != productID
					);
				}
				return cart;
			});
			let newID = 0;
			const newArr = producstRemaining.map((item) => {
				item.id = ++newID;
				return item;
			});
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify(newArr));
		} catch (e) {
			return { error: 'Product not found' };
		}
	}
}

class Save {
	constructor(name) {
		this.name = name;
		this.fs = fs;
	}

	saveName(name) {
		try {
			const listName = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const arrayListName = JSON.parse(listName);
			arrayListName.push(name);

			this.fs.writeFileSync(
				`${this.name}.txt`,
				JSON.stringify(arrayListName)
			);
		} catch (e) {
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify([name]));
		}
	}
}

module.exports = { Product, Cart, Save, express };

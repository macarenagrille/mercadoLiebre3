const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		res.render("index", {products, toThousand, title: "Inicio"})
	},
	search: (req, res) => {
		let busqueda = req.query.keywords
		let resultado = []
		products.forEach(product => {
			if (product.name.toLowerCase().includes(busqueda.toLowerCase())){
				resultado.push(product)
			}
		});
		res.render("results", {title: "Resultados de la busqueda: " + req.query.search, resultado, busqueda, toThousand})
	},
};

module.exports = controller;

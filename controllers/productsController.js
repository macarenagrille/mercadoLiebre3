const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render("products", {products, toThousand, title: "Todos los productos"})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let producto = products.find(product=>{
            return product.id == req.params.productId
		});
		let title = "Detalles"
		res.render("detail", {title, producto, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let {name, price , discount, category, description} = req.body;
		let lastId = 1
		products.forEach(producto => {
			if (producto.id > lastId){
				lastId = producto.id
			}
		});
		let nuevoProducto = {
			id: lastId + 1,
			name,
			price,
			discount,
			category,
			description,
			image : "default-image.png"
		}
		products.push(nuevoProducto);
		fs.writeFileSync('./data/productsDataBase.json',JSON.stringify(products),'utf-8');

        res.redirect("/products/detail/" + nuevoProducto.id);
	},

	// Update - Form to edit
	edit: (req, res) => {
		let producto = products.find(product=>{
            return product.id == req.params.productId
		});
		res.render("product-edit-form", {producto, toThousand})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount, category, description} = req.body;


        products.forEach(producto => {
            if(producto.id === +req.params.productId){
                producto.id = +req.params.productId;
                producto.name = name;
                producto.price = price;
                producto.discount = discount;
				producto.description = description;
				producto.image = producto.image
                producto.category = category;
            }
        });

        fs.writeFileSync('./data/productsDataBase.json',JSON.stringify(products),'utf-8');

        res.redirect("/products/detail/" + req.params.productId);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		products.forEach(producto => {
            if(producto.id === +req.params.productId){
                let eliminar = products.indexOf(producto);
                products.splice(eliminar,1)
            }
        });

        fs.writeFileSync('./data/productsDataBase.json',JSON.stringify(products),'utf-8');

        res.redirect("/products");
	}
};

module.exports = controller;
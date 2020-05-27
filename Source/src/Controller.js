class ProductsController {
  
    constructor() {
        this.categories = [{
            id: 1,
            name: 'Monitor'
        },
        {
            id:2,
            name:'Mainboard'
        },
        {
            id:3,
            name:'Graphic Card'
        },
        {
            id:4,
            name:'Ram'
        },
        {
            id:5,
            name:'Cooling Devices'
        },
        {
            id:6,
            name:'Power Source'
        }];
    }

    _findProductById(id) {
        const product = this.categories.find(product => product.id === id);
        if (!product) {
            throw new Error('Product not found.');
        }
        return product;
    }

    getAll() {
        return this.categories;
    }

    getById(id) {
        return this._findProductById(id);
    }

    create(id, name) {
        const newProduct = {
            id: id,
            name: name
        };
        this.categories.push(newProduct);
    }

    update(id, name) {
        const foundProduct = this._findProductById(id);
        foundProduct.name = name;
        return foundProduct;
    }

    del(id) {
        const foundProduct = this._findProductById(id);
        this.categories.splice(this.categories.indexOf(foundProduct), 1);
    }
}

module.exports = new ProductsController();
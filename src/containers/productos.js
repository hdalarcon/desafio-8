const fs = require('fs');
class Contenedor {
    constructor(file) {
        this.file = file;
    }

    getById(id) {
        const prod = this.productos.find(prod => prod.id == id)
        return prod || { error: 'producto no encontrado' }
    }

    async getAll(){
        let productos = await fs.promises.readFile(this.file);
        let productosObj = JSON.parse(productos);
        return productosObj;
    }
    
    async save(producto){
        let productosObj = await this.getAll();
        productosObj.push(producto);
        await fs.promises.writeFile(this.file,JSON.stringify(productosObj));
    }

    modifById(prod, id) {
        const newProd = { id: Number(id), ...prod }
        const index = this.productos.findIndex(p => p.id == id)
        if (index !== -1) {
            this.productos[index] = newProd
            return newProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }

    deleteById(id) {
        const index = this.productos.findIndex(prod => prod.id == id)
        if (index !== -1) {
            return this.productos.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }
}

module.exports = Contenedor

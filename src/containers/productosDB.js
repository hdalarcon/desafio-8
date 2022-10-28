const KnexLib = require('knex')

class ContenedorDB{
    constructor(config, table){
        this.knex = KnexLib(config);
        this.table = table;
    }

    createTableProducts() {
        return this.knex.schema.dropTableIfExists(this.table)
          .finally(() => {
            return this.knex.schema.createTable(this.table, table => {
                table.increments('id').primary();
                table.string('nombre', 60).notNullable();
                table.float('precio').notNullable();
                table.string('foto').notNullable();
            })
          })
    }

    createTableMessages() {
        return this.knex.schema.dropTableIfExists(this.table)
          .finally(() => {
            return this.knex.schema.createTable(this.table, table => {
                table.increments('id').primary();
                table.string('autor').notNullable();
                table.timestamp('timestamp').defaultTo(this.knex.fn.now()).notNullable();
                table.string('mensaje').notNullable();
            })
          })
    }    

    getById(id){
        return this.knex.from(this.table).select('*').where('id','=', id)
    }

    async getAll(){
        const datos = await this.knex(this.table).select('*')
        let datosObj = JSON.parse(JSON.stringify(datos));
        return datosObj
    }

    async save(data){
       const datos = await this.knex(this.table).insert(data)
       return datos
    }

    deleteById(id) {
        return this.knex.from(this.table).where('id', id).del()
    }

    deleteAll(){
        return this.knex.from(this.table).del()
    }

    close() {
        this.knex.destroy();
    }
}

module.exports = ContenedorDB
'use strict';

const Schema = use('Schema');

class KardexSchema extends Schema {
    up() {
        this.create('kardexes', (table) => {
            table.increments();
            table.string('detail', 80);
            table.integer('product_id').unsigned();
            table
                .foreign('product_id')
                .references('products.id')
                .onDelete('cascade');
            table.timestamps();
        });
    }

    down() {
        this.drop('kardexes');
    }
}

module.exports = KardexSchema;

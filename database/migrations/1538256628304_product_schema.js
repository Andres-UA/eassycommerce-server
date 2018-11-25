'use strict';

const Schema = use('Schema');

class ProductSchema extends Schema {
    up() {
        this.create('products', table => {
            table.increments();
            table.string('name', 30).notNullable();
            table.decimal('price');
            table.text('description').nullable();
            table.string('image', 255).nullable();
            table.integer('company_id').unsigned();
            table
                .foreign('company_id')
                .references('companies.id')
                .onDelete('cascade');
            table.timestamps();
        });
    }

    down() {
        this.drop('products');
    }
}

module.exports = ProductSchema;

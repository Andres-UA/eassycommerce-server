'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductPurchaseSchema extends Schema {
    up() {
        this.create('product_purchase', (table) => {
            table.increments();
            table.integer('quantity');
            table.decimal('amount');
            table.integer('purchase_id').unsigned();
            table
                .foreign('purchase_id')
                .references('purchases.id')
                .onDelete('cascade');
            table.integer('product_id').unsigned();
            table
                .foreign('product_id')
                .references('products.id')
                .onDelete('cascade');
        });
    }

    down() {
        this.drop('product_purchase');
    }
}

module.exports = ProductPurchaseSchema;

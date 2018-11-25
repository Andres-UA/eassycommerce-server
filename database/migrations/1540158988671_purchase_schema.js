'use strict';

const Schema = use('Schema');

class PurchaseSchema extends Schema {
    up() {
        this.create('purchases', table => {
            table.increments();
            table.decimal('total_amount');
            table.integer('company_id').unsigned();
            table
                .foreign('company_id')
                .references('companies.id')
                .onDelete('cascade');
            table.timestamps();
        });
    }

    down() {
        this.drop('purchases');
    }
}

module.exports = PurchaseSchema;

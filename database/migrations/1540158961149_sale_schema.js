'use strict';

const Schema = use('Schema');

class SaleSchema extends Schema {
    up() {
        this.create('sales', table => {
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
        this.drop('sales');
    }
}

module.exports = SaleSchema;

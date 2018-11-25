'use strict';

const Schema = use('Schema');

class OutputSchema extends Schema {
    up() {
        this.create('outputs', (table) => {
            table.increments();
            table.integer('quantity');
            table.decimal('unit_value');
            table.decimal('total_value');
            table.integer('kardex_id').unsigned();
            table
                .foreign('kardex_id')
                .references('kardexes.id')
                .onDelete('cascade');
                table.integer('sale_id').unsigned();
                table
                    .foreign('sale_id')
                    .references('sales.id')
                    .onDelete('cascade');
            table.timestamps();
        });
    }

    down() {
        this.drop('outputs');
    }
}

module.exports = OutputSchema;

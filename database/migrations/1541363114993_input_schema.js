'use strict';

const Schema = use('Schema');

class InputSchema extends Schema {
    up() {
        this.create('inputs', (table) => {
            table.increments();
            table.integer('quantity');
            table.decimal('unit_value');
            table.decimal('total_value');
            table.integer('kardex_id').unsigned();
            table
                .foreign('kardex_id')
                .references('kardexes.id')
                .onDelete('cascade');
            table.timestamps();
        });
    }

    down() {
        this.drop('inputs');
    }
}

module.exports = InputSchema;

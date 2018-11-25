"use strict"

const Schema = use("Schema")

class InventorySchema extends Schema {
    up() {
        this.create("inventories", (table) => {
            table.increments()
            table.enu("type", ["PEPS", "PP"])
            table.integer("company_id").unsigned()
            table
                .foreign("company_id")
                .references("companies.id")
                .onDelete("cascade")
            table.timestamps()
        })
    }

    down() {
        this.drop("inventories")
    }
}

module.exports = InventorySchema

"use strict"

const Schema = use("Schema")

class ProductSaleSchema extends Schema {
    up() {
        this.create("product_sale", (table) => {
            table.increments()
            table.integer("quantity")
            table.integer("sale_id").unsigned()
            table
                .foreign("sale_id")
                .references("sales.id")
                .onDelete("cascade")
            table.integer("product_id").unsigned()
            table
                .foreign("product_id")
                .references("products.id")
                .onDelete("cascade")
        })
    }

    down() {
        this.drop("product_sale")
    }
}

module.exports = ProductSaleSchema

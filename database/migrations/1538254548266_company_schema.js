"use strict"

const Schema = use("Schema")

class CompanySchema extends Schema {
    up() {
        this.create("companies", (table) => {
            table.increments()
            table.string("name").notNullable()
            table.text("description").nullable()
            table.integer("user_id").unsigned()
            table
                .foreign("user_id")
                .references("users.id")
                .onDelete("cascade")
            table.timestamps()
        })
    }

    down() {
        this.drop("companies")
    }
}

module.exports = CompanySchema

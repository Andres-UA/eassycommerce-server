"use strict"

const Model = use("Model")

class Inventory extends Model {
    company() {
        return this.belongsTo("App/Models/Company")
    }
}

module.exports = Inventory

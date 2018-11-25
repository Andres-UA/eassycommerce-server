"use strict"

const Model = use("Model")

class Company extends Model {
    user() {
        return this.belongsTo("App/Models/User")
    }

    products() {
        return this.hasMany("App/Models/Product")
    }

    sales() {
        return this.hasMany("App/Models/Sale")
    }

    purchases() {
        return this.hasMany("App/Models/Purchase")
    }

    inventory() {
        return this.hasOne("App/Models/Inventory")
    }
}

module.exports = Company

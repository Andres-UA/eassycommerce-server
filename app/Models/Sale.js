"use strict";

const Model = use("Model");

class Sale extends Model {
    company() {
        return this.belongsTo("App/Models/Company");
    }

    products() {
        return this.belongsToMany("App/Models/Product").withPivot(['quantity']);
    }

    outputs() {
        return this.hasMany('App/Models/Output');
    }
}

module.exports = Sale;

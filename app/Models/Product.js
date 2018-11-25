'use strict';

const Model = use('Model');

class Product extends Model {
    company() {
        return this.belongsTo('App/Models/Company');
    }

    kardex() {
        return this.hasMany('App/Models/Kardex');
    }

    stocks() {
        return this.manyThrough('App/Models/Kardex', 'stocks');
    }

    sales() {
        return this.belongsToMany('App/Models/Sale').withPivot(['quantity']);
    }

    purchases() {
        return this.belongsToMany('App/Models/Purchase').withPivot(['quantity', 'amount']);
    }
}

module.exports = Product;

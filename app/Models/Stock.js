'use strict';

const Model = use('Model');

class Stock extends Model {
    kardex() {
        return this.belongsTo('App/Models/Kardex');
    }
}

module.exports = Stock;

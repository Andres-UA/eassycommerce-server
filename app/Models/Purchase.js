'use strict';

const Model = use('Model');

class Purchase extends Model {
    company() {
        return this.belongsTo('App/Models/Company');
    }

    products() {
        return this.belongsToMany('App/Models/Product').withPivot(['quantity', 'amount']);
    }
}

module.exports = Purchase;

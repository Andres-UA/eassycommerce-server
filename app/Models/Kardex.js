'use strict';

const Model = use('Model');

class Kardex extends Model {
    inputs() {
        return this.hasMany('App/Models/Input');
    }
    outputs() {
        return this.hasMany('App/Models/Output');
    }
    stocks() {
        return this.hasMany('App/Models/Stock');
    }
}

module.exports = Kardex;

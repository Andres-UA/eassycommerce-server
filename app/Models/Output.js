'use strict';

const Model = use('Model');

class Output extends Model {
    kardex() {
        return this.belongsTo('App/Models/Kardex');
    }
}

module.exports = Output;

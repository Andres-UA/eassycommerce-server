'use strict';

const Model = use('Model');

class Input extends Model {
    kardex() {
        return this.belongsTo('App/Models/Kardex');
    }
}

module.exports = Input;

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _language = require('./language');

var _language2 = _interopRequireDefault(_language);

var _error = require('../error');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

const validate = exports.validate = (data, schema) => {
    const options = {
        language: _language2.default
    };

    const result = _joi2.default.validate(data, schema, options);
    const error = result.error;
    if (!error) {
        return result.value;
    } else {
        throw new _error.BusinessError(result.error.details[0].message);
    }
};

exports.default = _joi2.default;
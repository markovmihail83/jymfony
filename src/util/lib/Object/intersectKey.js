'use strict';

global.__jymfony = global.__jymfony || {};

/**
 * @param {Object} obj
 * @param {...Object} arrays
 *
 * @returns {Object}
 */
const intersectKey = function (obj, ...arrays) {
    const inArrays = key => {
        for (const array of arrays) {
            if (key in array) {
                return true;
            }
        }

        return false;
    };

    return Object.keys(obj)
        .filter( key => inArrays(key) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );
};

__jymfony.intersect_key = intersectKey;

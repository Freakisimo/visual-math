"use strict";

/**
 * Return true if mudule of n % m is zero
 * @param {number} n
 * @param {number} m 
 */
const isMod = (n,m) => (n % m) === 0 

/**
 * Return array generated with n items starting in zero
 * @param {number} n
 */
const range = n => [...Array(n).keys()]

/**
 * Return array from arrays of n items
 * @param {Object[]} arr
 * @param {number} size
 */
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

/**
 * Return the default object with new object values if exists
 * @param {Object} defaultJson 
 * @param {Object} newJson 
 */
const completeJson = (defaultJson, newJson) => {
    if(newJson){
        Object.keys(defaultJson).forEach(e => {
            if (newJson[e]) defaultJson[e] = newJson[e];
        });
    }
    return defaultJson;
}

/**
 * Return if n has pair root exact and the pair root number
 * @param {number} n
 * @param {number} steps 
 */
const pairRoot = (n, steps=1) => {
    if(n==2) {
        return {
            isPairRoot:true, 
            root: steps
        }
    } else if (isMod(n, 2)) {
        return pairRoot(n/2, steps+1);
    } else {
        return {
            isPairRoot:false, 
            root: steps
        }
    }
}

export {isMod, range, chunk, completeJson, pairRoot}
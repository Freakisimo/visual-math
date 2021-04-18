"use strict";

// Return true if mudule of n % m is zero
const isMod = (n,m) => (n % m) === 0 

// Return array generated with n items
const range = n => [...Array(n).keys()]

const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

/**
 * Return the default object with new object values if exists
 * @param {object} default_json 
 * @param {object} new_json 
 */
const complete_json = (default_json, new_json) => {
    if(new_json){
        Object.keys(default_json).forEach(e => {
            if (new_json[e]) default_json[e] = new_json[e];
        });
    }
    return default_json;
}


const pairRoot = (n, steps=0) => {
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

export {isMod, range, chunk, complete_json, pairRoot}
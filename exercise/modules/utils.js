"use strict";

// Return true if mudule of n % m is zero
const isMod = (n,m) => (n % m) === 0 

// Return array generated with n items
const range = n => [...Array(n).keys()]

export {isMod, range}
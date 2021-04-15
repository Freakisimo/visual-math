"use strict";

import {isMod,range} from './utils.js'

class PrimeNumbers {
    constructor (args) {
        this.localStoragePrimeKey = args.primes || "primes";
        this.mls = window.localStorage
        this.primes = null;
    }

    calculatePrimes(n) {
        let primes = this.getStoredPrimes() || [],
            maxPrime = Math.max(...primes);
        if (n < maxPrime) {
            this.primes = primes.filter(p => p <= n);
            return
        }
        let newRange = range(n + 1),
            sliceValue = newRange.indexOf(maxPrime) + 1 || 2,
            validRange = newRange.slice(sliceValue),
            checkRange = primes.concat(validRange);
        
        for (let i of validRange) {
            let x = 0;
            for (let j of checkRange) {
                if(isMod(i, j)) {
                    x = x + 1;
                } else if(x === 2) {
                    break;
                }
            }
            if (x === 1 && !primes.includes(i)) {
                primes.push(i)
            }
        }
        this.mls.setItem(this.localStoragePrimeKey, primes.join())
        this.primes = primes;
    }

    getStoredPrimes() {
        let stored = this.mls.getItem(this.localStoragePrimeKey) || false;
        if (stored) {
            return stored.split(",").map(n => parseInt(n))
        }
        return stored;
    }

    getPrimes(n) {
        this.calculatePrimes(n);
        return this.primes;
    }

}

export {PrimeNumbers}
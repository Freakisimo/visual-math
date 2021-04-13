"use strict";

import {PrimeNumbers} from './primes.js'
import {isMod} from './utils.js'

class FactoringNumber {

    constructor(args) {
        this.number = args.number || 10;
        this.primes = args.primes || [];
        this.factors = {};
    }

    factorize () {
        let v = this.number
        let branch = 0;
        do {
            for (let i of this.primes) {
                if(isMod(v, i)) {
                    v = v / i;
                    if (v !== 1) {
                        this.factors[`${branch}`] = [v,i]
                        branch = branch + 1
                    }
                    break
                }
            }
        } while (v !== 1)
    }

    setNumber (n) {
        this.number = n;
    }

    getTreeFactors() {
        let primesClass = new PrimeNumbers({
            localStoragePrimeKey: "primes"
        });
        this.primes = primesClass.getPrimes(this.number)
        this.factorize();
        return this.factors;
    }
    
}

export {FactoringNumber}
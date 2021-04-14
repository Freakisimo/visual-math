"use strict";

import {PrimeNumbers} from './primes.js'
import {isMod} from './utils.js'

class FactoringNumber {

    constructor(args) {
        this.number = args.number || 10;
        this.primes = args.primes || [];
        this.factors = [];
    }

    addFactor(value, depth, prime, id, parent) {
        this.factors.push({
            "parent": parent,
            "depth": depth,
            "id": id,
            "value": value,
            "prime": prime
        })
    }

    factorize () {
        let value = this.number,
            depth = 0;
        this.addFactor(value, depth, false, `${value}_${depth}`)
        do {
            for (let p of this.primes) {
                if(isMod(value, p)) {
                    depth = depth + 1;
                    let parent = value;
                    value = value / p;
                    if (value > 1) {
                        this.addFactor(value, depth, value-1?false:true, `${value}_${depth}`, `${parent}_${depth-1}`);
                        this.addFactor(p, depth, true, `${p}_${depth}`, `${parent}_${depth-1}`);
                        for (let f of this.factors) {
                            if (f.prime && f.depth === depth-1) {
                                this.addFactor(f.value, depth, f.prime, `${f.id}_${depth}`,  `${f.id}`)
                            }
                        }
                    }
                    break
                }
            }
        } while (value !== 1)
    }

    setNumber (n) {
        this.number = n;
        this.factors = [];
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
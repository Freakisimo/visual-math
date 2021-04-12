"use strict";

const isMod = (n,m) => (n % m) === 0 

const range = n => [...Array(n).keys()]

const getPrimes = n => {
    let safeN = parseInt(n) + 1,
        newRange = range(safeN),
        validRange = newRange.slice(2),
        primes = [];
    for (let i of validRange) {
        let x = 0;
        for (let j = 0; j < i; j++ ) {
            if(isMod(i, validRange[j])) {
                x = x + 1;
            } else if(x === 2) {
                break;
            }
        }
        if (x === 1) {
            primes.push(i)
        }
    }
    return primes;
}

const factorize = (v, p) => {
    let tree = {},
        branch = 0;
    do{
        for (let i of p) {
            if(isMod(v, i)) {
                v = v / i;
                tree[`branch_${branch}`] = [v,i]
                branch = branch + 1
                break
            }
        }
    } while (v !== 1)
    return tree;
}

class FactoringNumber {

    constructor(args) {
        this.input_number = document.querySelector("#input-number");
        this.btn = document.querySelector("#calculate");
    }

    main() {
        this.btn.addEventListener("click", () => {
            let v = this.input_number.value,
                safeV = parseInt(v);
            if (safeV >= 2 & safeV <= 1000000) {
                let primes = getPrimes(safeV);
                console.log(primes)
                let f = factorize(safeV, primes);
                console.log(f);
            } else {
                console.log("Number grater than 1 and less than 1_000_000 required")
            }
        })
    }

    factorize() {

    }
    
}

let fn = new FactoringNumber();
fn.main();
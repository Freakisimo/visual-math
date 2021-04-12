"use strict";

const mls = window.localStorage;

const isMod = (n,m) => (n % m) === 0 

const range = n => [...Array(n).keys()]

const storedPrimes = () => {
    let stored = mls.getItem("primes") || false;
    if (stored) {
        return stored.split(",").map(n => parseInt(n))
    }
    return stored;
}

const getPrimes = n => {
    let primes = storedPrimes() || [],
        maxPrime = Math.max(...primes);
    if (n < maxPrime) {
        return primes
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
    mls.setItem("primes", primes.join())
    return primes;
}

const factorize = (v, p) => {
    let tree = {},
        branch = 0;
    do{
        for (let i of p) {
            if(isMod(v, i)) {
                v = v / i;
                if (v !== 1) {
                    tree[`branch_${branch}`] = [v,i]
                    branch = branch + 1
                }
                break
            }
        }
    } while (v !== 1)
    return tree;
}

class FactoringNumber {

    constructor(args) {
        this.input_selector = args.input_selector ? args.input_selector : "#input-value";
        this.btn_selector = args.btn_selector ? args.btn_selector : "#calculate";
        this.output_selector = args.output_selector ? args.output_selector : "#output-value";

        this.input_value = document.querySelector(this.input_selector);
        this.btn = document.querySelector(this.btn_selector);
        this.output_value = document.querySelector(this.output_selector);
    }

    main() {
        this.btn.addEventListener("click", () => {
            let v = this.input_value.value,
                safeV = parseInt(v);
            if (safeV >= 2 & safeV <= 1000000) {
                let p = getPrimes(safeV);
                let f = factorize(safeV, p);
                for (let i in f) {
                    console.log(i, f[i])
                }
            } else {
                console.log("Number grater than 1 and less than 1_000_000 required")
            }
        })
    }

    factorize() {

    }
    
}

let fn = new FactoringNumber({});
fn.main();
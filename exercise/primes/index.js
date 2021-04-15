"use strict";

import {PrimeNumbers} from '../modules/primes.js'
import {PrimesGrid} from '../modules/charts/primeGrids.js'

let main = () => {
    let pn = new PrimeNumbers({});
    let input = document.querySelector("#input-value"),
        btn = document.querySelector("#calculate"),
        output = document.querySelector("#output-value");
    
    btn.addEventListener("click", ()=> {
        let n = parseInt(input.value);
        if (n > 2 && n <= 1_000_000) {
            let primes = pn.getPrimes(n);
            if (primes.length) {
                let pg = new PrimesGrid({
                    data: primes
                })
                pg.draw();
            }
            
            console.log(primes)
        } else {
            console.log("Number must be grater than 2 and lesser than 1 Milion")
        }
    })
}

main();
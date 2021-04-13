"use strict";

import {FactoringNumber} from '../modules/factoring.js'

let main = () => {
    let fn = new FactoringNumber({});
    let input = document.querySelector("#input-value"),
        btn = document.querySelector("#calculate"),
        output = document.querySelector("#output-value");
    
    btn.addEventListener("click", ()=> {
        let n = parseInt(input.value);
        if (n > 2 && n <= 1_000_000) {
            fn.setNumber(n);
            let factors = fn.getTreeFactors();
            if (Object.keys(factors).length !== 0) {
                let template = Object.keys(factors).map(k => {
                    let primeString = factors[k].join(" y ");
                    return `<p>El branch ${k} se forma de los primos ${primeString}</p>`
                }).join("");
                output.innerHTML = template;
            }
        } else {
            console.log("Number must be grater than 2 and lesser than 1 Milion")
        }
    })
}

main();
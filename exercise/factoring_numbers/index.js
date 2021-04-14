"use strict";

import {FactoringNumber} from '../modules/factoring.js'
import {HierarchicalNodeTree} from '../modules/charts/hierarchicalNodeTree.js'

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
            if (factors.length) {
                let hnt = new HierarchicalNodeTree({data: factors})
                hnt.draw();
            }
        } else {
            console.log("Number must be grater than 2 and lesser than 1 Milion")
        }
    })
}

main();
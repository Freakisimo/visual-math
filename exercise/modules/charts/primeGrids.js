'use strict';

import {complete_json, chunk} from '../utils.js';

class PrimesGrid {

    constructor(args) {
        const margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        };
        const width = 600, height = 800, squarePerRow = 10;

        this.selector = args.selector || "#chart-grid";
        this.margin = args.margin || complete_json(margin, args.margin);
        this.width = args.width || width - this.margin.left - this.margin.right;
        this.height = args.height || height - this.margin.top - this.margin.bottom;
        this.element = document.querySelector(this.selector);
        this.squarePerRow = args.squarePerRow || squarePerRow;
        this.squareSize = args.squareSize || this.width / this.squarePerRow;

        if (!args.data) {
            console.error("Need some pass data to continue");
            return;
        }

        try {
            this.data = this.prepareData(args.data, this.squarePerRow, this.squareSize);
        } catch (error) {
            console.error(error);
        }

    }

    prepareData(data, chunkSize, squareSize) {
        let chunkedArray = chunk(data, chunkSize),
            xPos = 1,
            yPos = 1;
        let newData = chunkedArray.map((row, ir) => {
            return row.map((column, ic) => {
                return {
                    value: column,
                    xpos: xPos + (squareSize * ic),
                    ypos: yPos + (squareSize * ir)
                }
            })
        })
        return newData;
    }

    draw() {
        // set up parent element and SVG
        this.element.innerHTML = '';

        const svg = d3.select(this.element).append('svg');
        svg.attr('width', this.width + (this.margin.left + this.margin.right));
        svg.attr('height', this.height + (this.margin.top + this.margin.bottom));

        // we'll actually be appending to a <g> element
        this.plot = svg.append('g')
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        this.createChart();

    }

    createChart() {
        let _this = this;

        let row = _this.plot.selectAll(".row")
            .data(_this.data)
            .enter().append("g")
            .attr("class", "row");
        
        let column = row.selectAll(".square")
            .data(d => d)
            .enter().append("rect")
            .attr("class","square")
            .attr("x", d => d.xpos )
            .attr("y", d => d.ypos )
            .attr("width", _this.squareSize )
            .attr("height", _this.squareSize )
            .style("fill", "#fff")
            .style("stroke", "#222")
            .on("click", (e,d) => {
                // console.log(d3.select(e.target))
                console.log(d)
                d3.select(e.target)
                    .transition()
                    .duration(750)
                    .attr("transform", `translate(${d.ypos},${d.xpos}) rotate(10)`)
            })
        
        row.selectAll(".text-values")
            .data(d => d)
            .enter().append("text")
            .attr("class","text-values")
            .attr("y", d => d.ypos + _this.squareSize / 2)
            .attr("x", d => d.xpos + _this.squareSize / 2)
            .attr("text-anchor", d => "middle")
            .attr("dy", ".35em")
            .text(d => d.value);
        
    }

}

export {PrimesGrid}
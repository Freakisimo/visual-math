'use strict';

import {complete_json} from '../utils.js';

class HierarchicalNodeTree {

    constructor(args) {
        const margin = {
            top: 10,
            right: 100,
            bottom: 50,
            left: 100
        };
        const width = 600, height = 500;

        this.selector = args.selector || "#chart-nodeTree"
        this.margin = args.margin || complete_json(margin, args.margin);
        this.width = args.width || width - this.margin.left - this.margin.right;
        this.height = args.height || height - this.margin.left - this.margin.right;
        this.element = document.querySelector(this.selector)
        this.radius = Math.min(this.width, this.height) / 2;
        if (!args.data) {
            console.error("Need some pass data to continue");
            return;
        }

        try {
            this.root = this.treeData(args.data, this.width);
        } catch (error) {
            console.error(error);
        }
        console.log(this.root)

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
            .attr("font-size", 10)
            .attr('transform', `translate(${this.width/2},${(this.height/2)+10})`);

        this.createChart();

    }

    treeData(data, width) {
        const root = d3.stratify()
            .id(d => d.id )
            .parentId(d => d.parent)
            (data)
        root.dx = 10;
        root.dy = width / (root.height + 1);
        return d3.tree().nodeSize([root.dx, root.dy])(root);
    }

    createChart() {
        let _this = this;

        let x0 = Infinity;
        let x1 = -x0;
        
        _this.root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const link = _this.plot.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
        .selectAll("path")
            .data(_this.root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));

        const node = _this.plot.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(_this.root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);
        
        node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5);
        
        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.value)
            .clone(true).lower()
            .attr("stroke", "white");
        
    }

}

export {HierarchicalNodeTree}
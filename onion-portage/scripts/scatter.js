// set the dimensions and margins of the graph
let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#myChart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",`translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://data1500.github.io/test-project/providenceTemp.csv", data => {

    // Add X axis
    let x = d3.scaleLinear()
        .domain([1945, 2023])
        .range([ 0, width ]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3.scaleLinear()
        .domain([56, 66])
        .range([ height, 0]);

    let colors = d3.scaleLinear()
        .domain([54, 66])
        .range(["#1f78b4", "#e31a1c"]);    

    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    let dots = svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.avgHigh))
            .attr("r", 8)
            .style("fill", "#666666")
            .style("opacity", 0.5)
            .style("fill", d => colors(d.avgHigh))
            .on("mouseover", function(d) {
                d3.select(this)
                .transition()
                .duration(400)
                .attr("r", 20)
                let rounded = "Year: " + Math.round(d.avgHigh *10)/10 + "°F";
                d3.select("#myTooltip")
                    .html(rounded)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .style("border-radius", "8px")
                    .transition()
                    .delay(100)
                    .duration(500)
                    .style("opacity", 1);
                })
            .on("mouseout", function(d) {
                d3.select(this)
                .transition()
                .duration(400)
   		        .attr("r", 8)
                d3.select("#myTooltip")
                   .transition()
                   .duration(500)
                   .style("opacity", 0);
                });     
})
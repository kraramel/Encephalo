// set the dimensions and margins of the graph
const margin1 = { top: 10, right: 30, bottom: 30, left: 60 },
    width1 = 800 - margin1.left - margin1.right,
    height1 = 620 - margin1.top - margin1.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz_1")
    .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform",
        `translate(${margin1.left}, ${margin1.top})`);

//Read the data
d3.csv("./new_data_test_scatter.csv").then(function (data) {

    // Add X axis
    const x = d3.scaleLinear()
        .domain([-20, 20])
        .range([0, width1]);
    svg.append("g")
        .attr("transform", `translate(0, ${height1})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([-20, 20])
        .range([height1, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append('text')
        .attr('x', 10)
        .attr('y', 10)
        .attr('class', 'label')
        .text('Y');

    svg.append('text')
        .attr('x', width1)
        .attr('y', height1 - 10)
        .attr('text-anchor', 'end')
        .attr('class', 'label')
        .text('X');

    // HemiGlobe
    // Color scale: give me a specie name, I return a color
    // const color = d3.scaleOrdinal()
    //     .domain(["LC", "RC", "RT", "LT"])
    //     .range(["#fafa6e", "#5bc489", "#008d8c", "#2a4858"])

    // Lobe
     // Color scale: give me a specie name, I return a color
     const color = d3.scaleOrdinal()
     .domain(["C", "F", "P", "T"])
     .range(["#fafa6e", "#5bc489", "#008d8c", "#2a4858"])
    // -1- Create a tooltip div that is hidden by default:
    const tooltip = d3.select("#my_dataviz_1")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "80px")
        .style("padding", "20px")
        .style("color", "white")


    // Highlight the specie that is hovered
    const highlight = function (event, d) {

        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html("Zone cérébral: " + d.name)
            .style("left", (event.x) / 20 + "px")
            .style("top", (event.y) / 400 + 30 + "px")

        selected_specie = d.Lobe
        d3.selectAll(".dot")
            .transition()
            .duration(200)
            .style("fill", "lightgrey")
            .attr("r", 3)

        d3.selectAll("." + selected_specie)
            .transition()
            .duration(200)
            .style("fill", color(selected_specie))
            .attr("r", 7)
    }

    // Highlight the specie that is hovered
    const doNotHighlight = function (event, d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)

        d3.selectAll(".dot")
            .transition()
            .duration(200)
            .style("fill", d => color(d.Lobe))
            .attr("r", 5)
    }




    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    const showTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html("Zone cérébral: " + d.name)
            .style("left", (event.x) / 2 + "px")
            .style("top", (event.y) / 2 + 30 + "px")
    }
    const moveTooltip = function (event, d) {
        tooltip
            .style("left", (event.x) / 2 + "px")
            .style("top", (event.y) / 2 + 30 + "px")
    }
    const hideTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function (d) { return "dot " + d.Lobe })
        .attr("cx", function (d) { return x(d.y); })
        .attr("cy", function (d) { return y(d.x); })
        .attr("r", 5)
        .style("fill", function (d) { return color(d.Lobe) })
        .on("mouseover", highlight)
        .on("mouseleave", doNotHighlight)
        // -3- Trigger the functions
        // .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
    // .on("mouseleave", hideTooltip)

    // create a list of keys
    var keys = ["C", "F", "P", "T"]
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
        .attr("cx", 700)
        .attr("cy", function (d, i) { return 50 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 8)
        .style("fill", function (d) { return color(d) })

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 720)
        .attr("y", function (d, i) { return 55.5 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
        .text(function (d) { return d })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

})


// set the dimensions and margins of the graph
const margin_2 = { top: 50, right: 20, bottom: 30, left: 50 },
    width_2 = 800 - margin_2.left - margin_2.right,
    height_2 = 620 - margin_2.top - margin_2.bottom;

// append the svg object to the body of the page
const svg_2 = d3.select("#my_dataviz_2")
    .append("svg")
    .attr("width", width_2 + margin_2.left + margin_2.right)
    .attr("height", height_2 + margin_2.top + margin_2.bottom)
    .append("g")
    .attr("transform", `translate(${margin_2.left},${margin_2.top})`);

//Read the data
d3.csv("./new_data_test_scatter.csv").then(function (data) {

    // Add X axis
    const x2 = d3.scaleLinear()
        .domain([-20, 20])
        .range([0, width_2]);
    svg_2.append("g")
        .attr("transform", `translate(0, ${height_2})`)
        .call(d3.axisBottom(x2));

    // Add Y axis
    const y2 = d3.scaleLinear()
        .domain([-20, 20])
        .range([height_2, 0]);
    svg_2.append("g")
        .call(d3.axisLeft(y2));

    // Add a scale for bubble size
    const z = d3.scaleLinear()
        .domain([200000, 1310000000])
        .range([4, 40]);

    // Add a scale for bubble color
    // const myColor = d3.scaleOrdinal()
    //     .domain([200000, 1310000000])
    // .range(d3.schemeSet2);

    var myColor = d3.scaleLinear().domain([1, 50])
        .range(["#efeaf4", "green"])

    // d3.rgb('red').brighter()
    // var myColor = d3.scaleLinear().domain([1,50])
    // .range([d3.rgb('yellow').brighter(), "blue"])

    //         var myColor = d3.scaleSequential().domain([1,50])
    //   .interpolator(d3.interpolatePuRd);
    // -1- Create a tooltip div that is hidden by default:
    const tooltip1 = d3.select("#my_dataviz_2")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip1")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    const showTooltip1 = function (event, d) {
        tooltip1
            .transition()
            .duration(200)
        tooltip1
            .style("opacity", 1)
            .html("Zone cérébral: " + d.name)
            .style("left", (event.x2) / 2 + "px")
            .style("top", (event.y2) / 2 + 30 +"px")
    }
    const moveTooltip1 = function (event, d) {
        tooltip1
            .style("left", (event.x) / 2 + "px")
            .style("top", (event.y) / 2 + 850 + "px")
    }
    const hideTooltip1 = function (event, d) {
        tooltip1
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    frequenceArray = []

    for (let index = 0; index < 100; index++) {
        frequenceArray.push("f" + index)
    }

    d3.select('#frequence').html(frequenceArray[0]);
    d3.select('#slider').attr("max", frequenceArray.length - 1);

    d3.select("#slider").on("input", function () {
        updateViz(this.value);
        // console.log(this.value)
    });

    function updateViz(value) {
        d3.select('#frequence').html(frequenceArray[value]);
        // console.log(frequenceArray[value])
        drawMap(frequenceArray[value]);
    }

    function drawMap(frequence) {
        // console.log(frequence)

        // Add dots
        svg_2.append('g')
            .selectAll("dot")
            .data(data)
            .join("circle")
            .attr("class", "bubbles")
            .attr("cx", d => x2(d.x))
            .attr("cy", d => y2(d.y))
            .attr("r", d => d.z * 1.4)
            .style("fill", d => myColor(d[frequence]))
            // -3- Trigger the functions
            .on("mouseover", showTooltip1)
            .on("mousemove", moveTooltip1)
            .on("mouseleave", hideTooltip1)

    }

    drawMap(frequenceArray[0])
})  
// set the dimensions and margins of the graph
const margin = { top: 80, right: 30, bottom: 50, left: 110 },
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg_3 = d3v6.select("#my_dataviz_3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "whitesmoke")
    .append("g")
    .attr("transform",
        `translate(${margin.left}, ${margin.top})`);

const svg_3_1 = d3v6.select("#my_dataviz_3_1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "whitesmoke")
    .append("g")
    .attr("transform",
        `translate(${margin.left}, ${margin.top})`);

const svg_3_2 = d3v6.select("#my_dataviz_3_2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "whitesmoke")
    .append("g")
    .attr("transform",
        `translate(${margin.left}, ${margin.top})`);

//read data
d3v6.csv("./new_data_test_scatter.csv").then(function (data) {

    // Get the different categories and count them
    //   const categories = ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23", "f24", "f25", "f26", "f27", "f28", "f29", "f30", "f31", "f32", "f33", "f34", "f35", "f36", "f37", "f38", "f39", "f40", "f41", "f42", "f43", "f44", "f45", "f46", "f47", "f48", "f49", "f50", "f51", "f52", "f53", "f54", "f55", "f56", "f57", "f58", "f59", "f60", "f61", "f62", "f63", "f64", "f65", "f66", "f67", "f68", "f69", "f70", "f71", "f72", "f73", "f74", "f75", "f76", "f77", "f78", "f79", "f80", "f81", "f82", "f83", "f84", "f85", "f86", "f87", "f88", "f89", "f90", "f91", "f92", "f93", "f94", "f95", "f96", "f97", "f98", "f99" ]
    // const categories = ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f15", "f20", "f25", "f30", "f40", "f50", "f60", "f70", "f80"]

    const categories = ["f0", "f1", "f2", "f3", "f4"]
    const categories_1 = ["f4", "f5", "f6", "f7"]
    const categories_2 = ["f20", "f30", "f40", "f50", "f60", "f70"]

    // [f1 -> f12, f15, f20, f25, f30, f40, f50, f60, f70, f80]
    //   const categories = ["Almost Certainly", "Very Good Chance", "We Believe", "Likely", "About Even", "Little Chance", "Chances Are Slight", "Almost No Chance" ]

    const n = categories.length
    const n1 = categories_1.length
    const n2 = categories_2.length

    //   fi  = []

    //   for (let index = 0; index < 100; index++) {
    //     fi.push("f"+index   )
    //   }
    //   console.log(fi);
    // Compute the mean of each group
    allMeans = []
    allMeans_1 = []
    allMeans_2 = []

    for (i in categories) {
        currentGroup = categories[i]
        mean = d3v6.mean(data, function (d) { return +d[currentGroup] })
        allMeans.push(mean)
    }

    for (i in categories_1) {
        currentGroup = categories_1[i]
        mean = d3v6.mean(data, function (d) { return +d[currentGroup] })
        allMeans_1.push(mean)
    }

    for (i in categories_2) {
        currentGroup = categories_2[i]
        mean = d3v6.mean(data, function (d) { return +d[currentGroup] })
        allMeans_2.push(mean)
    }

    // Create a color scale using these means.
    const myColor = d3v6.scaleSequential()
        .domain([0, 100])
        .interpolator(d3v6.interpolateViridis);

    // Add X axis
    const x = d3v6.scaleLinear()
        .domain([-20, 200])
        .range([0, width]);

    svg_3.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3v6.axisBottom(x).tickValues([0, 25, 50, 75, 100, 125, 150, 175, 200]).tickSize(-height))
        .select(".domain").remove()

    svg_3_1.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3v6.axisBottom(x).tickValues([0, 25, 50, 75, 100, 125, 150, 175, 200]).tickSize(-height))
        .select(".domain").remove()

    svg_3_2.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3v6.axisBottom(x).tickValues([0, 25, 50, 75, 100, 125, 150, 175, 200]).tickSize(-height))
        .select(".domain").remove()

    // Add X Y axis label:
    svg_3.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Intensité cérébrale des canaux");

        svg_3.append("text")
        .attr("text-anchor", "end")
        .attr("x", 170)
        .attr("y", height - 330)
        .text("Nombre de canaux par fréquence");
    // Add X Y axis label:
    svg_3_1.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Intensité cérébrale des canaux");

    svg_3_1.append("text")
        .attr("text-anchor", "end")
        .attr("x", 170)
        .attr("y", height - 330)
        .text("Nombre de canaux par fréquence");

    // Add X Y axis label:
    svg_3_2.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Intensité cérébrale des canaux");
svg_3_2.append("text")
        .attr("text-anchor", "end")
        .attr("x", 170)
        .attr("y", height - 330)
        .text("Nombre de canaux par fréquence");
    // .text("Densité des fréquences");
    // Create a Y scale for densities
    const y = d3v6.scaleLinear()
        .domain([0, 0.25])
        .range([height, 0]);

    // Create the Y axis for names
    const yName = d3v6.scaleBand()
        .domain(categories)
        .range([0, height])
        .paddingInner(1)
    const yName_1 = d3v6.scaleBand()
        .domain(categories_1)
        .range([0, height])
        .paddingInner(1)
    const yName_2 = d3v6.scaleBand()
        .domain(categories_2)
        .range([0, height])
        .paddingInner(1)

    svg_3.append("g")
        .call(d3v6.axisLeft(yName).tickSize(0))
        .select(".domain").remove()
    svg_3_1.append("g")
        .call(d3v6.axisLeft(yName_1).tickSize(0))
        .select(".domain").remove()
    svg_3_2.append("g")
        .call(d3v6.axisLeft(yName_2).tickSize(0))
        .select(".domain").remove()
    // Compute kernel density estimation for each column:
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
    const allDensity = []
    const allDensity_1 = []
    const allDensity_2 = []

    for (i = 0; i < n; i++) {
        key = categories[i]
        density = kde(data.map(function (d) { return d[key]; }))
        allDensity.push({ key: key, density: density })
    }

    for (i = 0; i < n1; i++) {
        key = categories_1[i]
        density = kde(data.map(function (d) { return d[key]; }))
        allDensity_1.push({ key: key, density: density })
    }

    for (i = 0; i < n2; i++) {
        key = categories_2[i]
        density = kde(data.map(function (d) { return d[key]; }))
        allDensity_2.push({ key: key, density: density })
    }
    // Add areas
    svg_3.selectAll("areas")
        .data(allDensity)
        .join("path")
        .attr("transform", function (d) { return (`translate(0, ${(yName(d.key) - height)})`) })
        .attr("fill", function (d) {
            grp = d.key;
            index = categories.indexOf(grp)
            value = allMeans[index]
            return myColor(value)
        })
        .datum(function (d) { return (d.density) })
        .attr("opacity", 0.7)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.1)
        .attr("d", d3v6.line()
            .curve(d3v6.curveBasis)
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); })
        )

        svg_3_1.selectAll("areas")
        .data(allDensity_1)
        .join("path")
        .attr("transform", function (d) { return (`translate(0, ${(yName_1(d.key) - height)})`) })
        .attr("fill", function (d) {
            grp = d.key;
            index = categories_1.indexOf(grp)
            value = allMeans_1[index]
            return myColor(value)
        })
        .datum(function (d) { return (d.density) })
        .attr("opacity", 0.7)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.1)
        .attr("d", d3v6.line()
            .curve(d3v6.curveBasis)
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); })
        )

        svg_3_2.selectAll("areas")
        .data(allDensity_2)
        .join("path")
        .attr("transform", function (d) { return (`translate(0, ${(yName_2(d.key) - height)})`) })
        .attr("fill", function (d) {
            grp = d.key;
            index = categories_2.indexOf(grp)
            value = allMeans_2[index]
            return myColor(value)
        })
        .datum(function (d) { return (d.density) })
        .attr("opacity", 0.7)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.1)
        .attr("d", d3v6.line()
            .curve(d3v6.curveBasis)
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); })
        )
})

// This is what I need to compute kernel density estimation
function kernelDensityEstimator(kernel, X) {
    return function (V) {
        return X.map(function (x) {
            return [x, d3v6.mean(V, function (v) { return kernel(x - v); })];
        });
    };
}
function kernelEpanechnikov(k) {
    return function (v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
}
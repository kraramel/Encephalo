


function drawLinechart(chartId, metal, cumul, reserve, data) {
    // Preprocess
    reserve = reserve && data[metal].reserve;

    var finalData = [];
    for (var key in data[metal]) {
        if (key != 'reserve') {
            finalData.push({'year': d3.timeParse("%Y")(key), 'values': data[metal][key], 'reserve': data[metal]['reserve']})
        }
    }
    if (cumul) {
        for (var i = 0; i < finalData.length; i++) {
            finalData[i].reserve += finalData[finalData.length-1].values.cumul;
        }
    }

    // Clear div, and compute responsive width/height
    d3.select(chartId).html('');
    var width = Math.min(d3.select(chartId).node().parentNode.clientWidth, 800) - 205;
    var height = width*0.5;

    var svg = d3
        .select(chartId)
        .append("svg")
        .attr("width", width+175)
        .attr("height", height+50)
        .append("g")
        .attr("transform", "translate(" + 150 + "," + 25 + ")");

    // Scale and reverse scale for x axis
    var x = d3.scaleUtc()
        .domain(d3.extent(finalData, (d) => d['year']))
        .range([0, width]);
    var reverseX = d3.scaleUtc()
        .domain([0, width])
        .range(d3.extent(finalData, (d) => d['year']));
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Scale and reverse scale for y axis (domain change when reserve is on)
    let yDomain = [0, d3.max(finalData, (d) => ((cumul) ? +d.values.cumul:+d.values.value))];
    if (reserve) {
        yDomain[1] = d3.max(finalData, (d) => Math.max(((cumul) ? +d.values.cumul:+d.values.value), d.reserve));
    }
    var y = d3
        .scaleLinear()
        .domain(yDomain)
        .range([height, 0]);
    var reverseY = d3
        .scaleLinear()
        .domain([height, 0])
        .range(yDomain);
    svg.append("g").call(d3.axisLeft(y));


    // Plot data line
    svg.append("path")
        .datum(finalData)
        .attr("fill", "none")
        .attr("stroke", "#4e79a7")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x((d) => x(d.year))
            .y((d) => y((cumul) ? +d.values.cumul:+d.values.value))
        );

    // Plot data line legend
    svg.append("path")
        .datum([[30, 30],[80, 30]])
        .attr("fill", "none")
        .attr("stroke", "#4e79a7")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x((d) => d[0])
            .y((d) => d[1])
        )
    svg.append('text')
        .attr("y", 35)
        .attr("x", 90)
        .text((cumul) ? 'Production cumulée depuis 1975 (tonne)':'Production (tonne)');

        
    // Add a line with circle that follow cursor/curve
    let vLine = null;
    let bubble = null;

    // Rect over whole plot for mouse interactions
    svg.append('rect')
        .attr('width', width+5)
        .attr('height', height)
        .attr('class', 'linechartrect')
        .style('opacity', 0.)
        .on('mousemove', function (e, d) {
            var mousePosition = d3.pointer(e, svg);

            let xValue = reverseX(d3.pointer(e)[0]).getFullYear();
            let yValue = null;

            // Get the y value of the curve
            for (var i = 0; i < finalData.length; i++) {
                if (finalData[i].year.getFullYear() == xValue) {
                    yValue = ((cumul) ? +finalData[i].values.cumul:+finalData[i].values.value);
                }
            }

            // Tooltip display part
            d3.select('.toolTip')
                .classed('hidden', false)
                .style('left', (mousePosition[0] + 20) + 'px')
                .style('top', (mousePosition[1] + 20) + 'px');
            d3.select('.toolTipName').html('Année : ' + xValue + ', Production : ' + yValue);
            d3.select('.toolTipData').html('Souris : (' + xValue + ', ' + reverseY(d3.pointer(e)[1]) + ')');

            // Remove old line
            if (vLine)
                vLine.remove();

            // Display new line
            vLine = svg.append("path")
                .datum([[x(d3.timeParse("%Y")(xValue)), 0], [x(d3.timeParse("%Y")(xValue)), height]])
                .attr("fill", "none")
                .attr("stroke", "#ADADAD")
                .attr("stroke-width", 0.5)
                .attr("d", d3.line()
                    .x((d) => d[0])
                    .y((d) => d[1])
                )
                .attr('pointer-events', "none");

            // Remove old circle on curve
            if (bubble)
                bubble.remove();

            // Display new circle on curve
            bubble = svg.append("circle")
                .datum([x(d3.timeParse("%Y")(xValue)), yValue])
                .attr("fill", "#ADADAD")
                .attr("r", 5)
                .attr("cx", (d) => d[0])
                .attr("cy", (d) => y(d[1]))
                .attr('pointer-events', "none");

            // To use linechart as a slider
            if (mouseDown) {
                d3.select('#mapSlider').node().value = xValue;
                d3.select('#mapSlider').dispatch('input');
            }
            d3.select(this).on('click', function (d) {
                d3.select('#mapSlider').node().value = xValue;
                d3.select('#mapSlider').dispatch('input');
            });
        })
        .on('mouseout', function (d) {
            // Clear all additional displays
            if (vLine)
                vLine.remove();

            if (bubble)
                bubble.remove();

            d3.select('.toolTip').classed('hidden', true);
            d3.select('.toolTipData').html('');
        });

    if (reserve) {
        // Plot reserve line
        svg.append("path")
            .datum(finalData)
            .attr("fill", "none")
            .attr("stroke", "#E15759")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x((d) => x(d.year))
                .y((d) => y(d.reserve))
            )
            .attr('stroke-dasharray', "10,10");

        // Plot reserve line legend
        svg.append("path")
            .datum([[30, 60],[80, 60]])
            .attr("fill", "none")
            .attr("stroke", "#E15759")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x((d) => d[0])
                .y((d) => d[1])
            )
            .attr('stroke-dasharray', "10,10");
        svg.append('text')
            .attr("y", 65)
            .attr("x", 90)
            .text((cumul) ? 'Réserves 1975 (tonne)':'Réserves 2018 (tonne)');
    }
}



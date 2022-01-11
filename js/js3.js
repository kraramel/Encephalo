
  function transf3(dt, fi){
    a = [];
    var LC = 0;
    var LCind = 0;
    var RC = 0;
    var RCind = 0;
    var RF = 0;
    var RFind = 0;
    var LF = 0;
    var LFind = 0;

    var RP = 0;
    var RPind = 0;
    var RT = 0;
    var RTind = 0;
    var LT = 0;
    var LTind = 0;
    var LP = 0;
    var LPind = 0;
    for (var i = 0; i < dt.length; i++) {
      if(dt[i].HemiLobe === "LC"){
        //LB = LB + Number(dt[i].f0); 
        LC = LC + Number(dt[i][fi]); 
        LCind = LCind + 1; 
      };
      if(dt[i].HemiLobe === "RC"){
        RC = RC + Number(dt[i][fi]);  
        RCind = RCind + 1;
    };
    if(dt[i].HemiLobe === "RF"){
        RF = RF + Number(dt[i][fi]); 
        RFind = RFind + 1; 
    };
    if(dt[i].HemiLobe === "LF"){
        LF = LF + Number(dt[i][fi]);  
        LFind = LFind + 1;
    };


    if(dt[i].HemiLobe === "RP"){
        //LB = LB + Number(dt[i].f0); 
        RP = RP + Number(dt[i][fi]); 
        RPind = RPind + 1; 
      };
      if(dt[i].HemiLobe === "RT"){
        RT = RT + Number(dt[i][fi]);  
        RTind = RTind + 1;
    };
    if(dt[i].HemiLobe === "LT"){
        LT = LT + Number(dt[i][fi]); 
        LTind = RFind + 1; 
    };
    if(dt[i].HemiLobe === "LP"){
        LP = LP + Number(dt[i][fi]);  
        LPind = LPind + 1;
    };

    };
    var ind =  [
        {
          className: 'f0', // optional can be used for styling
          axes: [
            {axis: "LC", value: LC/LCind}, 
            {axis: "RC", value: RC/RCind}, 
            {axis: "LF", value: LF/LFind}, 
            {axis: "RF", value: RF/RFind},

            {axis: "RP", value: RP/RPind}, 
            {axis: "RT", value: RT/RTind}, 
            {axis: "LT", value: LT/LTind}, 
            {axis: "LP", value: LP/LPind}

        ]
    }
    ]
    return ind
  }


  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var svg6 = d3.select('#my_dataviz_4').append('svg')
  .attr('width', cfg.w + cfg.w + 50)
  .attr('height', cfg.h + cfg.h / 4)
  .style("margin-left", 500+"px")
  var one = undefined;
  var fi = "f0";
  var es = undefined;
  var p = undefined;
  alll(0,0, fi);


  d3.select("#participant").on("input", function () {
    p = this.value;
    console.log(p);
    one = 1;
    if (es === undefined){
      alll(p-1,0,fi);

    }else {
      alll(p-1,es,fi);
    }
    
    
});

  d3.select("#sliderE").on("input", function () {
    d3.select('#E').html("Essai:"+this.value);
    es = this.value;
    one = 1;
    if (p === undefined){
      alll(0,0,fi);
      p = 1;
    }else{
      alll(p-1,es,fi);

    }
    console.log(p);
    
    
    
});

d3.select("#sliderF").on("input", function () {
    d3.select('#F').html("F"+this.value);
    console.log(p);
    fi = "f"+ this.value;
    one = 1;
    if (es === undefined){
      es = 0;
      if(p!== undefined){
        alll(p-1,0,fi);
      }else{
        p = 0;
        alll(0,0,fi);}
      
    }else{
      if(p!== undefined){
        alll(0,es,fi);
      }else{alll(p-1,es,fi);}
    }

});




  function alll(par, essai, f){
    console.log(essai);
    console.log(f);

    var dataSource = './data_modified/P'+par+'E'+essai+'_modified.csv';
    console.log(dataSource);
    d3.csv(dataSource, function(err, data) {
        var ind = undefined;
        if (one === undefined){
          //var one = "f0";
          ind = transf3(data, f);
          svg6.append('g').classed('single', 1).datum(ind).call(chart);
        }
        else {
          ind = transf3(data, f);
          draw(ind);

        }
    
        function draw(ind){
            svg6.select('g').classed('single', 1).datum(ind).call(chart);
        };


    });
}

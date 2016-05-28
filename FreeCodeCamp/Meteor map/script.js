// uses babel
// uses d3
// uses topojson

const dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
const earthMap = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json';
      
const CHART_HEIGHT = 600,
      CHART_WIDTH = 945;

d3.json(earthMap, geoJson => {  
 
  // build main svg window
  const map = d3.select(".chart-wrap")
    .append("svg")
    .attr({
      'height': CHART_HEIGHT,
      'width': CHART_WIDTH
    }).append('g');
  
  // projection info
  const projection = d3.geo.mercator()
                       .scale( 150 ) // tbd
                       .rotate( [71.057,0] ) // tbd
                       .center( [0, 30] ) // tbd
                       .translate( [CHART_WIDTH/2,CHART_HEIGHT/2] );
  
  const geoPath = d3.geo.path()
                    .projection( projection );
  
  // draw country paths
  map.selectAll( "path" )
  .data( topojson.feature(geoJson, geoJson.objects.countries).features )
  .enter()
  .append( "path" )
  .attr({
    'fill': "#4EC700",
    "stroke": "#000",
    "d": geoPath
  });
  
  const zoom = d3.behavior.zoom()
               .size([CHART_HEIGHT, CHART_WIDTH])
               .scaleExtent([.4, 15])
               .on('zoom', () => { map.attr({
                                 'transform': 'translate(' +
                                   d3.event.translate.join(',') +
                                   ') scale(' +
                                   d3.event.scale+
                                   ')'
                                  })
               });
  d3.select(".chart-wrap").call(zoom);
  
  // load meteoite strike data
  d3.json(dataUrl, data => {
    
    //scale for meteor mass
    const massScale = d3.scale.pow().exponent(0.5)                       
                        .domain(d3.extent(data.features, d => d.properties.mass / Math.PI))
                        .range([1,15])
    
    const meteors = map.append('g').selectAll( "path" )
       .data( data.features )
       .enter()
       .append( "path" )
       .attr({
          "class": "strike",
          "fill": "#911", // set color of strike if you like
          "fill-opacity": 0.7,
          "stroke": "none",
          "d": geoPath.pointRadius( d =>  massScale(d.properties.mass) ) 
       });
    
    
    // ToolTip handleing
    const toolTip = d3.select('.toolTip');

    meteors.on('mouseover', (d) => {
      const { pageX, pageY } = d3.event;
      toolTip.style({
        'left': (pageX) + 'px',
        'top': (pageY + 20) + 'px',
        'display': 'block'        
      });
      const {name, mass, reclong, reclat, year, recclass} = d.properties;
      const formattedYear = new Date(year).getFullYear()
      toolTip.select('.name').text('Name: ' + name);
      toolTip.select('.mass').text('mass: ' + mass);
      toolTip.select('.class').text('class: ' + recclass);
      toolTip.select('.loc').text(`lat: ${reclat}, lon ${reclong}`);
      toolTip.select('.year').text('Year: ' + formattedYear);
   });

  meteors.on('mouseout', (d) => {
    toolTip.style('display', 'none');
  });
    
  }); 

});

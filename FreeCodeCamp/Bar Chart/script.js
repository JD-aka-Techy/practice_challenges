// uses d3
// uses babel

const dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

d3.json(dataUrl, (data) => {

  // parse data points
  data = data.data.map( (dp) => [ new Date(dp[0]), dp[1] ] );
  // cacheing selections
  const toolTip = d3.select('.toolTip'),
        ttGDP = d3.select('.toolTip .gdp'),
        ttDate = d3.select('.toolTip .date');
  // Constants
  const MARGINS = { top: 20, right: 20, bottom: 30, left: 50 },
        SVG_X =  800, // main svg canvas width
        SVG_Y = 500, // main svg canvas height
        CHART_HEIGHT = SVG_Y - MARGINS.left - MARGINS.right, // inner group canvas width
        CHART_WIDTH = SVG_X - MARGINS.top - MARGINS.bottom, // inner group canvas height
        BAR_WIDTH = CHART_WIDTH / data.length;

  const maxGDP = d3.max( data, (dp) => dp[1] );
  const dateRange = d3.extent( data, (dp) => dp[0] );

  const scaleX = d3.time.scale().domain(dateRange).range([0, CHART_WIDTH]),
        scaleY = d3.scale.linear().domain([0, maxGDP]).range([CHART_HEIGHT, 0]),
        axisY = d3.svg.axis().scale(scaleY).orient('left'),
        axisX = d3.svg.axis().scale(scaleX);

  // build main svg window with inner padding
  const chart = d3.select(".chart-wrap")
    .append("svg")
    .attr({
      'height': SVG_Y,
      'width': SVG_X
    })
    .append('g') // pad sides => chart now refers to inner group
    .attr('transform', `translate( ${ MARGINS.left } , ${ MARGINS.top } )`);

  // Add bars to chart
  const bars = chart.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr({
         'class': 'bar',
         'x': d => scaleX(d[0]),
         'y': d => scaleY(d[1]),
         'width': d => BAR_WIDTH + 1,
         'height': d => CHART_HEIGHT - scaleY(d[1])
       });

  // Add axis
  // Y axis
  chart.append('g')
    .attr('class', 'y-axis')
    .call(axisY);
  // X axis
  chart.append('g')
    .attr('class', 'x-axis')
    .call(axisX)
    .attr('transform', `translate(0,${ CHART_HEIGHT } )`);

// ToolTip handleing
  bars.on('mouseover', (d) => {
    const { pageX, pageY } = d3.event;
    ttGDP.text( '$' + d[1] + 'bn' );
    ttDate.text( d3.time.format('%B %Y')(d[0]) );
    toolTip.style({
      'left': (pageX) +'px',
      'top': (pageY + 20) + 'px',
      'display': 'block'
    });
  });

  bars.on('mouseout', (d) => {
    toolTip.style('display', 'none');
  });

});

// uses babel
// uses d3

const dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

// Constants
const MARGINS = { top: 30, right: 100, bottom: 30, left: 30 },
      SVG_X =  900, // main svg canvas width
      SVG_Y = 500, // main svg canvas height
      CHART_HEIGHT = SVG_Y - MARGINS.top - MARGINS.bottom, // inner canvas width
      CHART_WIDTH = SVG_X - MARGINS.left - MARGINS.right, // inner canvas height
      DOPE_COLOR = '#FF4500',
      MAIN_COLOR = '#01CD54',
      CIRCLE_RADIUS = 5;

d3.json(dataUrl, (response) => {

  // Parse data
  const FASTEST_TIME = d3.min( response, d => d.Seconds );
  // Add time behind record time to each data point to be used for scaleX
  const data = response.map( d => {
    const SecondsToLead = new Date(0); // epoch date
    SecondsToLead.setSeconds( ( d.Seconds - FASTEST_TIME ) )
    return { ...d, SecondsToLead };
  });

  // build main svg window with inner padding
  const chart = d3.select(".chart-wrap")
    .append("svg")
    .attr({
      'height': SVG_Y,
      'width': SVG_X
    })
    .append('g') // pad sides => chart now refers to inner group
    .attr('transform', `translate( ${ MARGINS.left } , ${ MARGINS.top } )`);

  // scales
  const scaleY = d3.scale.linear()
                   .domain([0, 37]) // d3.extent(data, d => d.Place ) how to offset?
                   .range([0, CHART_HEIGHT]);

  const minTime = d3.min(data, d => d.SecondsToLead),
        maxTime = d3.max(data, d => d3.time.second.offset(d.SecondsToLead,5)),
        scaleX = d3.time.scale()
                   .domain( [maxTime, 0] )
                   .range([0, CHART_WIDTH]);

  // Y axis
  const axisY = d3.svg.axis().scale(scaleY).orient('left');
  chart.append('g')
    .attr('class', 'y-axis')
    .call( axisY )
    .append('text').text('Ranking')
    .attr({
      'transform': 'rotate(-90)',
      'text-anchor': 'end',
      'dy': '15px',
      'dx': '-1px'
    });

  // X axis
  const axisX = d3.svg.axis().scale( scaleX ).tickFormat( d3.time.format( "%M:%S" ) )
  chart.append('g')
    .attr('class', 'x-axis')
    .call( axisX )
    .attr('transform', `translate(0,${ CHART_HEIGHT } )`)
    .append('text').text( 'Mins behind leading time' )
    .attr({
      'text-anchor': 'start',
      'x' : `${CHART_WIDTH / 2 - 40}px`,
      'y' : '-6px'
    });

  // create points group
  const points = chart.selectAll('circle')
                      .data( data )
                      .enter()
                      .append('g');

  // draw circle at point origin
  points.append('circle')
    .attr({
    'cx': d => scaleX( d.SecondsToLead ),
    'cy': d => scaleY( d.Place ),
    'r' : CIRCLE_RADIUS,
    'fill': d => d.Doping ? DOPE_COLOR : MAIN_COLOR,
    'class': 'plot-point'
  });

  // name tags
  points.append('text')
        .attr({
              'x': d => ( scaleX( d.SecondsToLead ) + CIRCLE_RADIUS + 2 ),
              'y': d => ( scaleY( d.Place ) + 3 )
             })
         .text( d => d.Name );

  // Create the key -below other points or selectAll interferes
  const key = chart.append('g')
       .attr('transform', 'translate(50,5)')

  key.append('circle')
     .attr({
        'transform': 'translate(0,5)',
        'r': CIRCLE_RADIUS,
        'fill': DOPE_COLOR
     });

  key.append('text').text( 'Doping Allegations' )
     .attr({
       'transform': 'translate(5,5)',
       'dy': '4px',
       'dx': '8px'
     });

   key.append('circle')
      .attr({
         'transform': 'translate(0,25)',
         'fill': MAIN_COLOR,
         'r': CIRCLE_RADIUS,
      });

   key.append('text').text( 'No Allegations' )
      .attr({
        'transform': 'translate(5,25)',
        'dy': '4px',
        'dx': '8px'
      });

  // information tool tip
  const info = d3.select('#info')
                 .style({
                   'bottom': MARGINS.bottom + 120 +'px',
                   'right': MARGINS.right + 100+'px'
                 });

  // Handle info tooltip hover events
  points.on('mouseover', (d) => {
    const {Nationality, Name, Year, Time, Doping, URL} = d;
    info.select('.nation').text(Nationality);
    info.select('.name').text(Name);
    info.select('.year').text(`Year: ${Year}`);
    info.select('.time').text(`Time: ${Time}`);
    info.select('.dope').text(Doping);
    info.select('.url').html(`<a href="${URL}" target="_blank">${URL}</a>`);
  });
});

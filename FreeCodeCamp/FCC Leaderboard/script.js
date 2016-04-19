// uses Babel
// uses //cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.min.js
// uses https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.min.js
// uses https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.28.2/react-bootstrap.min.js


/*
* represents a sortable leaderboard
*/

let App = React.createClass({

  getCampers() {
    const urls = [
      'http://fcctop100.herokuapp.com/api/fccusers/top/recent',
      'http://fcctop100.herokuapp.com/api/fccusers/top/alltime'
    ];

    // top 100 recent and all time campers as array of (fetch) promises.
    let promises = urls.map(function(url){
      return fetch(url, { method: 'get' })
            .then(function(response){
              return response.json();
            })
            .catch(function(err) {
	            throw err;
            });
      });
    // cache scope
    const that = this;
    // when promises resolve concat the two arrays & hash seive for uniques.
    Promise.all(promises)
      .then(function(values){
        let hash = {};
        let campers = [].concat(...values)
          .filter( camper => {
            if (!hash[camper.username]) {
              hash[camper.username] = true;
              return true;
            }
          });
       that.setState({ campers: campers });
      });
  },

  sortFuncs: {
    'recent': (camperA, camperB) => camperB.recent - camperA.recent ,
    'alltime': (camperA, camperB) => camperB.alltime - camperA.alltime
  },

  handleClick(timeFrame) {
    this.setState({ sortBy: timeFrame });
  },

  getInitialState() {
    return {
      campers: [],
      sortBy: 'recent'
    };
  },

  componentDidMount(){
    this.getCampers();
  },

  render() {
    const CAMPERS_PER_PAGE = 100;
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th onClick={ this.handleClick.bind(this,"recent") } className="clickable">Points in past 30 days</th>
              <th onClick={ this.handleClick.bind(this,"alltime") } className="clickable">Points All time</th>
            </tr>
          </thead>
          <tbody>
            { this.state.campers
              .sort( this.sortFuncs[this.state.sortBy] )
              .slice(0, CAMPERS_PER_PAGE)
              .map( (camper, index) => <Camper data={camper} index={index + 1}/> ) }
          </tbody>
        </Table>
      </div>
    );
  }
});

/*
* represents a single camper on a leaderboard
*/
let Camper = React.createClass({
  render() {
    let camper = this.props.data,
        link = 'http://www.freecodecamp.com/' + camper.username;
    return (
       <tr>
         <td>{this.props.index}</td>
         <td>
           <a href={link} target="_blank">
             <img src={camper.img} />
             {camper.username}
           </a>
         </td>
         <td>{camper.recent}</td>
         <td>{camper.alltime}</td>
       </tr>
    );
  }
});

let Table = ReactBootstrap.Table;

ReactDOM.render(<App />, document.getElementById('app'));

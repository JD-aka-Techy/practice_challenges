// uses React
// uses ReactDOM
// uses babel

const { Component } = React;

const Cell = ({ onClick, cell }) => <span onClick={onClick} className={ cell ? "alive" : "dead"}></span>;

class Board extends Component {

  constructor(props) {
    super(props);
    this.BOARD_WIDTH = props.width || 20;
    this.BOARD_HEIGHT = props.height || 20;
    this.state = {
      board: this.props.board || this.setBoard(this.createBoard(this.BOARD_WIDTH, this.BOARD_HEIGHT),true),
      generation: 0,
      pause: false
    };
    this.interval = window.setInterval(this.nextTick.bind(this), 300);
  }

  /* returns a board with the game of life rules applied to each cell. */
  getNextBoardState( currBoard ) {
    return currBoard.map( ( row, rIndex ) => {
      return row.map( ( cell, cIndex ) => {
        return this.getNextCellState( currBoard, cell, this.getNeighbours( currBoard, [rIndex, cIndex] ) );
      } );
    } );
  }

  /* Applies game of life rules to a cell. */
  getNextCellState( board, currState, neighbours ) {
    // count live neighbours {1 is alive 0 dead}
    let num = neighbours.reduce( (acc, neighbour) => acc + board[neighbour[0]][neighbour[1]] , 0),
        fate;
    if (currState === 1){ // currently alive
      fate = (num === 2 || num === 3) ? 1 : 0;
    } else { // currently dead
      fate = num === 3 ? 1 : 0;
    }
    return fate;
  }

  /* returns array x,y locations of neighbouring cells. */
  getNeighbours( board, loc ) {
    // u, d, l, r, ul, ur, dl, dr;
    const vectors = [ [0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1] ],
          BOARD_WIDTH = board[0].length-1,
          BOARD_HEIGHT = board[0].length-1;
    return vectors.map( (v) => ( [ (v[0] + loc[0]), (v[1] + loc[1]) ] ))
                  .filter( (cell) => {
                    return cell[0] >= 0
                        && cell[0] <= BOARD_WIDTH
                        && cell[1] >= 0
                        && cell[1] <= BOARD_HEIGHT
                  });
  }

  /* handles next board update. */
  nextTick() {
    this.setState({
      board: this.getNextBoardState(this.state.board),
      generation: this.state.generation += 1
    });
  }


  toggleCell(loc) {
    let newBoard = this.state.board.slice(0);
    newBoard[loc[0]][loc[1]] = newBoard[loc[0]][loc[1]] ? 0 : 1;
    this.setState({
      board: newBoard
    });
  }

  toggleInterval() {
    if(this.interval) {
      window.clearInterval(this.interval);
      this.interval = false
    } else {
      this.interval = window.setInterval(this.nextTick.bind(this), 300);
    }
    this.setState({
      pause: !this.state.pause
    })
  }

  setBoard(board, randomise = false) {
    return board.map( (row) => row.map( (cell) => randomise ? Math.round(Math.random()) : 0  )  )
  }

  handleClear() {
    this.setState({
      board: this.setBoard(this.state.board),
      generation: 0
    });
  }

  handleRandomize() {
    this.setState({
      board: this.setBoard(this.state.board, true)
    })
  }

  /* returns a blank board of width x height*/
  createBoard(width, height) {
    return arrayOf( width, arrayOf( height, 0 ) )
    /* returns array of length: length, made of type board*/
    function arrayOf( length, type ) {
      return Array.apply(null, {length: length})
                  .map( () => Array.isArray(type) ? type.slice(0) : type );
    }
  }

  render() {
    const board = this.state.board.slice(0);
    return (
      <div className="board">
        <button onClick={this.toggleInterval.bind(this)}>{ this.state.pause ? 'start' : 'pause' }</button>
        <button onClick={this.handleClear.bind(this)}>clear</button>
        <button onClick={this.handleRandomize.bind(this)}>randomize</button>
        {board.map( ( row, rI) => {
           return (
             <div key={rI} className="row">
             {  row.map( ( cell, cI ) => <Cell onClick={this.toggleCell.bind(this, [rI,cI])} key={rI + cI} cell={cell}/>)  }
             </div>
           )
        })
        }
        {"Generation: " + this.state.generation}
      </div>
    );
  }
}

const Mount = () => (
  (
    <Board />
  )
)

ReactDOM.render(<Board />, document.getElementById('app'));

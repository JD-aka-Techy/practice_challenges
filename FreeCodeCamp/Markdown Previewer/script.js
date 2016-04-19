// uses https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react.js
// uses https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js
// uses https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.min.js
// uses Babel

var App = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.defaultData
    };
  },

  parseMarkdown: function(data) {
    return {
      __html: marked(data, {
        sanitized: true
      })
    };
  },

  handleInput: function(input) {
    this.setState({data: input});
  },

  render: function() {
    return (
      <div>
        <h1 className="title">Markdown previewer</h1>
        <MDInput value = { this.state.data } onInput = { this.handleInput }/>
        <MDOutput value = { this.parseMarkdown(this.state.data) } />
      </div>
    );
  }
})

var MDInput = React.createClass({

  handleChange: function(e){
    this.props.onInput(e.target.value);
  },

  render: function() {
    return (
      <div className = {'input'}>
        <h1>Input</h1>
        <textarea value = { this.props.value } onChange = { this.handleChange } />
      </div>
    );
  }
});

var MDOutput = React.createClass({
  render: function() {
    return (
      <div className = {'output'}>
        <h1>Output</h1>
        <div dangerouslySetInnerHTML = { this.props.value }>
        </div>
      </div>
    );
  }
});

// initial data.
var data = 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Techy](http://freecodecamp.com/jd-aka-techy)*'

ReactDOM.render( < App defaultData = { data } />,document.querySelector('.container'));

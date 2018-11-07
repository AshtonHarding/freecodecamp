// Example to marked. (MarkUp)
//document.getElementById('content').innerHTML =
//      marked('# Marked in browser\n\nRendered by **marked**.');

var big_text = "Heading\n=======\n\n";
big_text = big_text + "Sub-heading\n-----------";
big_text = big_text + "\n\n### Deeper header\n\n";
big_text = big_text + "Paragraphs are separated\n";
big_text = big_text + "by a blank line.\n\n";
big_text = big_text + "Text attributes *italic*,";
big_text = big_text + "**bold**, `monospace`, ~~strikeout~~";
big_text = big_text + "\n\nShopping list:\n\n*GeForce Quadro";
big_text = big_text + "\n*64GB(16*4) ram\n*boop";

class Markdown_Preview extends React.Component{
  
  getMarkedKid(){
    var raw = marked(big_text, {sanitize: true});
    return { __html: raw };
  }

  render(){
    return(
      <section id="main">
        <div dangerouslySetInnerHTML = {this.getMarkedKid()} />
      </section>
    );
  }
  
}

class Markdown_Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: big_text
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event){
    this.setState({value: event.target.value});
    big_text = event.target.value;
    console.log(big_text);
    ReactDOM.render(<Markdown_Preview />, document.getElementById("userInput"));
  }

  render(){
    return(
      // textarea rows=""
      <section id="main">
        <textarea rows="8" value={this.state.value}  onChange={this.handleChange} />
      </section>
    );
  }
  
}

// Renders everything.
ReactDOM.render(<Markdown_Preview />, document.getElementById("userInput"));
ReactDOM.render(<Markdown_Create />, document.getElementById("userDisplay"));

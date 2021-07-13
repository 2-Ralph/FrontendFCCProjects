marked.setOptions({
	breaks: true
})

let placeholder = 
`

# Hello
*THE COOL FEATURE*
**also very cool**
#*hello*
## subheading
### subsubheading

\`<div class="lol"></div>\`

\`\`\`
if(name === main){

}
\`\`\`
- hey
- hello
- why hello there

1. nice
2. pretty nice
3. quite nice
> This is a blockquote!


we have some pretty nice [links](https://apple.com)

![apple logo](https://backendless.com/wp-content/uploads/2020/05/Login-with-Apple-Plugin-Feature-1200x770.png)

`

class App extends React.Component{
	constructor(props){
		super(props);	
		this.state = {
			markdown: placeholder
		}	
		this.handleChange = this.handleChange.bind(this);
		this.convertToHtml = this.convertToHtml.bind(this);
	}	
	handleChange(e){
		this.setState({
			markdown: e.target.value
		});
	};	
	convertToHtml(){
		return;
	}
	render(){
		return(
			<div>
				<h1>Markup Previewer (FREECODECAMP)</h1>
				<div className="row">
					<div className="editor-wrapper">
						<div className="editor-topbar">Markup</div>
						<textarea value={this.state.markdown} className="editor" id="editor" onChange={this.handleChange} />
					</div>
					<h1></h1>
					<div className="preview-wrapper">
						<div className="preview-topbar">Preview</div>
						<div className="preview-content" id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}></div>
					</div>
				</div>
			</div>
		);
	};
};




ReactDOM.render(<App/>, document.getElementById('app'));
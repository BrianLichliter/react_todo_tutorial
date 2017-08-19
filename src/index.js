import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class TodoList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { items: [] }
		this.removeItem = this.removeItem.bind(this)
		this.loadTodosFromServer = this.loadTodosFromServer.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
	}

	loadTodosFromServer() {
		axios.get(this.props.url)	
		.then(res => {
			this.setState({ items: res.data });
		})
	}

	componentDidMount() {
		this.loadTodosFromServer();
		setInterval(this.loadTodosFromServer, this.props.pollInterval);
	}

	addItem(e) {
		e.preventDefault();		

		var todo = ({ text: this._inputElement.value });

		axios.post(this.props.url, todo)
		.then(res => {
			this.setState({ items: res.data })
		})
		.catch(err => {
			console.error(err);
		})

		this._inputElement.value = "";
	}

	removeItem(id) {
		axios.delete(this.props.url+"/"+id)
		.then(res => {
			this.setState({ items: res.data })
			console.log("delete successful")
		})
		.catch(err => {
			console.error(err);
		});
	}

	render() {
		return (
			<div className="todoListMain">
				<div className="header">
					<form onSubmit={(e) => this.addItem(e)}>
						<input ref={(a) => this._inputElement  = a}
							   placeholder="enter task">
						</input>
						<button type="submit">add</button>
					</form>
				</div>
				<TodoItems entries={this.state.items} removeItem={this.removeItem}/>
			</div>
		);
	}

};		

class TodoItems extends React.Component {

	constructor(props) {
		super(props);
		this.createTasks = this.createTasks.bind(this);
	}

	createTasks(item) {
		return <li onClick={() => this.props.removeItem(item.id)} key={item.id}> {item.text} </li>;
	}

	render() {
		var todoEntries = this.props.entries;

		var listItems = todoEntries.map(this.createTasks);

		return (
			<ul className="theList">
				{listItems}
			</ul>
		);
	}
}

ReactDOM.render(
	<TodoList url="http://localhost:3001/api/todos" pollInterval={2000} />,
	document.querySelector("#container")
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {items: []}
		this.removeItem = this.removeItem.bind(this)
	}

	addItem(e) {
		e.preventDefault();		
		
		var itemArray = this.state.items;

		itemArray.push(
			{
				text: this._inputElement.value,
				key: Date.now()
			}
		);

		this.setState({
			items: itemArray
		});

		this._inputElement.value = "";
	}

	removeItem(key) {
		console.log("removing item" + key);

		var itemArray = this.state.items;

		var index = itemArray.findIndex(p => p && (p.key === key));

		delete(itemArray[index]);

		this.setState({items: itemArray});
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
		return <li onClick={() => this.props.removeItem(item.key)} key={item.key}> {item.text} </li>;
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
	<TodoList/>,
	document.querySelector("#container")
);
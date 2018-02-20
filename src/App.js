import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{ id: 1, name: 'Max', age: 28 },
			{ id: 2, name: 'Manu', age: 29 },
			{ id: 3, name: 'Stephanie', age: 26 }
		],
		showPersons: false
	}

	deletePersonHandler = (personIndex) => {
		// THIS IS THE OLD WAY: const persons = this.state.persons.slice();
		// Use the spread operator to create a new array
		const persons = [...this.state.persons];
		// Splice the array at the point of the personIndex
		persons.splice(personIndex, 1);
		// Update state with the new array
		this.setState({persons: persons});
	}

	nameChangedHandler = (event, id) => {
		// Get the index in the persons array and confirm that it matches the id argument.
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});
		// Use the spread operator (...) to create a new array with the updated object.
		const person = {
			...this.state.persons[personIndex]
		};
		// Update the current person object name value
		person.name = event.target.value;
		// Create a new persons array with the spread operator (...).
		const persons = [...this.state.persons];
		// Update the person in the persons array at the point of personIndex.
		persons[personIndex] = person;
		// Update state with the newly created persons array.
		this.setState( {persons: persons} )
	}

	togglePersonsHandler = () => {
		// Set a static variable to the state value of showPersons.
		const doesShow = this.state.showPersons;
		// Update state with the inverse of doesShow.
		this.setState({ showPersons: !doesShow })
	}

	render() {

		const style = {
			backgroundColor: 'green',
			color: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
			':hover': {
				backgroundColor: 'lightgreen',
				color: 'black'
			}
		};

		let persons = null;
		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return <Person 
							click={() => this.deletePersonHandler(index)}
							name={person.name} 
							age={person.age} 
							key={person.id}
							changed ={(event) => this.nameChangedHandler(event, person.id)} />
					})}
				</div>
			);

			style.backgroundColor = 'red';
		}

		const classes = [];

		if (this.state.persons.length <= 2) {
			classes.push('red'); // classes = ['red']
		}
		if (this.state.persons.length <= 1) {
			classes.push('bold'); // classes = ['red', 'bold']
		}

		return (
			<div className="App">
				<h1>Hi, I am a React App</h1>
				<p className={classes.join(' ')}>This is really working!</p>

				<button 
				style={style}
				onClick={this.togglePersonsHandler}>Toggle Persons</button>

				{persons}

			</div>
		);
	}
}

export default App;

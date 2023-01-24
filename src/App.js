import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import './App.css';


class App extends Component {
  
  constructor() {
    super();

    this.state = {
      characters: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => this.setState(() => {
      return {characters: users}
    }
    ,
    () => {
      //callback stuff goes here
    }
    ))
  }

  //optimization by not having anonymous function in "onChange", that would get re-initialized every call
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
     this.setState(() => {
      return { searchField };
    });
  }
  
  render() {
    //optimization not to call "this.xxx. or this."
    const { characters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredCharacters = characters.filter((char) => {
      return char.name.toLocaleLowerCase().includes(searchField);
    });


    return (
      <div className="App">
        <input className="search-box" 
        type="search" 
        placeholder="search characters" 
        onChange={this.onSearchChange} 
        />
        <CardList characters={filteredCharacters}/>

      </div>
    ); 
  }
  
}

export default App;

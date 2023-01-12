import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      characters: [],
      searchField: '',
    };
    console.log('constructor here');
  }

  componentDidMount() {
    console.log('component did mount here');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => this.setState(() => {
      return {characters: users}
    }
    ,
    () => {
      console.log(this.state)
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
    console.log('render');

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
        onChange={this.onSearchChange} />
        {
          filteredCharacters.map((character) => {
            return (
              <div key={character.id}>
                <h1>{character.name}</h1>
              </div>
            );
          })
        }
      </div>
    ); 
  }
  
}

export default App;

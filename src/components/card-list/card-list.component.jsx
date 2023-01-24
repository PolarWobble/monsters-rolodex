import { Component } from "react";

class CardList extends Component {
    render() {

        const { characters } = this.props;

        return (
            <div>
                {
                    characters.map(char => (
                        <h1 key={char.id}>{char.name}</h1>
                    ))
                }
            </div>
        )
    }
}

export default CardList;
import React from 'react';
import MovieCard from '../../../common/MovieCard'
import MovieDetailsDialog from './MovieDetailsDialog'

class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    selectHandler() {
        const { selected } = this.state;
        this.setState({ selected: !selected })
    }

    closeDialog() {
        const { selected } = this.state;
        this.setState({ selected : !selected })
    }
    
    render() {
        const { movie } = this.props
        const { selected } = this.state;
        return (
            <>
            {selected ? 
                <MovieDetailsDialog movie={movie} closeEmitter={() => this.closeDialog()}></MovieDetailsDialog>
                : 
                <p></p>}
            <MovieCard movie={movie} selectEmitter={() => this.selectHandler()}></MovieCard>
            </>
        );
    }
}

export default MoviesList;
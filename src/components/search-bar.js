import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/basic-style.css'
import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search_value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({search_value: event.target.value}, () => {
      this.props.onChangeSearch(this.state.search_value);
    });
  }

  render() {

    return (
      <div className="col-12 my-3">
        <div className="search">
          <form className="form-inline">
            <input
              value={this.state.search_value}
              className="form-control form-control-sm search-bar"
              type="search"
              placeholder="Search User by Name"
              onChange={ this.handleChange }
              aria-label="Search" />
          </form>
        </div>
      </div>
    );
  }

}

export default SearchBar;


import React from 'react';


class SearchForm extends React.Component {
  static propTypes = {
    handleSearch: React.PropTypes.func.isRequired
  };

  constructor() {
    super(...arguments);
    this.handleSubmit = ::this.handleSubmit;
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = this.input.value.trim();
    this.props.handleSearch(value);
  }

  render() {
    return (
      <div role="search">
        <form onSubmit={this.handleSubmit} noValidate>
          <input
            autoComplete="off"
            maxLength="60"
            placeholder="Search Tracks"
            ref={e => this.input = e}
            tabIndex="0"
            type="text"
          />
        </form>
      </div>
    );
  }
}

export default SearchForm;

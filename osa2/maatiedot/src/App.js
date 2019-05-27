import React from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'

class App extends React.Component {
  state = {
    filter: '',
    countries: []
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async componentWillMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then(result => {
      const countries = result.data
      this.setState({ countries })
    })
  }

  render() {
        const filteredCountries = this.state.countries.filter(country =>
          country.name.toLowerCase().includes(this.state.filter.toLowerCase())
        );
        return(
      <div>
      <Filter
        name='filter'
        values={this.state}
        onChange={this.handleChange}
      />
      <div>
        {
          filteredCountries.length > 10
            ? 'Too many matches! Be more specific.'
            : filteredCountries.length > 1
              ? filteredCountries.map(country => (
                <div key={country.name}>
                  {country.name}
                  <button
                    onClick={this.handleChange}
                    name='filter'
                    value={country.name}
                  >
                    show
                  </button>
                </div>
              ))
              : filteredCountries.length === 1
                ? <Country country={filteredCountries} />
                : 'No matches found!'
        }
      </div>
      </div >
    )
  }
}

export default App;

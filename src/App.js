import React, { Component } from 'react';

import {Cards} from './components/Cards/Cards';
import {Chart} from './components/Chart/Chart';
import {CountryPicker} from './components/CountryPicker/CountryPicker';

import styles from './App.module.css';
import covid from './covid.jpg';

import {fetchData} from './api/index.js';

export default class App extends Component {

  state = {
    data:{},
    country: '',
  }

  componentDidMount = async () => {
    const fetchedData = await fetchData();
    this.setState({ 
      data: fetchedData 
    })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState ({ data: fetchedData ,country: country });
  }

  render() {

    const {data,country} = this.state;

    return (
      <div className={styles.container}>
      <img className={styles.covid} src={covid} alt='covid-19' />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />                      
      </div>
    )
  }
}

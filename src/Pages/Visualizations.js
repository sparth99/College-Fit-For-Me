import React, { Component } from 'react';
import '../Styles/Home.css';
import Navigation from '../Components/Navigation';
import AttractionsTypeBubbleChart from '../Components/AttractionsTypeBubbleChart';
import UniversityStatesMap from '../Components/UniversityStatesMap';
import Footer from '../Components/Footer';
import CityStateBarGraph from '../Components/CityStateBarGraph';
import CountriesIncomeBubbleChart from '../Components/CountriesIncomeBubbleChart';
import CountriesPopulationBarGraph from '../Components/CountriesPopulationBarGraph';
import GDPPieChart from '../Components/GDPPieChart';

class Visualizations extends Component {
  state = {
    ourVisualizations: true,
    customerVisualizations: false,
  };

  render() {
    return (
      <div>
        <Navigation />
        <div className="btn-group d-flex" role="group" aria-label="...">
          <button
            type="button"
            className={
              this.state.ourVisualizations
                ? 'btn btn-primary'
                : 'btn btn-outline-primary'
            }
            id="dropdown-btn"
            onClick={() => {
              this.setState({
                ourVisualizations: true,
                customerVisualizations: false,
              });
            }}
          >
            Our Visualizations
          </button>
          <button
            type="button"
            className={
              this.state.customerVisualizations
                ? 'btn btn-primary'
                : 'btn btn-outline-primary'
            }
            id="dropdown-btn"
            onClick={() => {
              this.setState({
                ourVisualizations: false,
                customerVisualizations: true,
              });
            }}
          >
            Customer Visualizations
          </button>
        </div>

        {this.state.ourVisualizations && (
          <div>
            <h1>Types of Attractions</h1>
            <AttractionsTypeBubbleChart />
            <h1>States By Number of Universities</h1>
            <UniversityStatesMap />
            <h1>States By Number of Major Cities</h1>
            <CityStateBarGraph />
          </div>
        )}

        {this.state.customerVisualizations && (
          <div>
            <h1>Countries By Income Level</h1>
            <CountriesIncomeBubbleChart />
            <h1>Countries By Population</h1>
            <CountriesPopulationBarGraph />
            <h1>Major Countries By GDP Share</h1>
            <GDPPieChart />
            <p></p>
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default Visualizations;

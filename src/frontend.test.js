import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, configure} from 'enzyme';	
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Navigation from './Components/Navigation';
import Home from './Pages/Home';
import Cities from './Pages/Cities.js'
import Universities from "./Pages/Universities";
import Attractions from "./Pages/Attractions";
import CityProfile from "./Pages/CityProfile";
import UniversityProfile from "./Pages/UniversityProfile";
import AttractionProfile from "./Pages/AttractionProfile";
import AttractionFilters from "./Components/AttractionFilters";
import CityFilters from "./Components/CityFilters";
import UniversityFilters from "./Components/UniversityFilters";
import GitLab from "./Components/Gitlab";
import About from './Pages/About';

configure({ adapter: new Adapter() });

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Navigation Component', () => {
	it('should render a Navigation Bar', () => {
	  const nav = shallow(<Navigation />);

      expect(nav).toMatchSnapshot();
	  
	});
});

describe("Home Component", () => {
  const component = shallow(<Home/>);
  it('should render title', () => {
    expect(component.find('h1').at(0).text()).toEqual("Hello Students!")
  })
  it('should render description', () => {
    expect(component.find('p').at(0).text()).toEqual("Find the University that\'s the best fit for your needs and interests!Learn about life at different Universities, their surrounding areas, and explore attractions near them.")
  })
})

it('should render Cities', async () => {
  const component = shallow(<Cities/>);
  const data = component.instance();
  await data.componentDidMount();
  expect(component).toMatchSnapshot();	
  
});

it('should render Universities', async () => {
  const component = shallow(<Universities/>);
  const data = component.instance();
  await data.componentDidMount();
  expect(component).toMatchSnapshot();

});

it('should render Attractions', async () => {
  const component = shallow(<Attractions/>);
  const data = component.instance();
  await data.componentDidMount();
  expect(component).toMatchSnapshot();
  
});

it('should render CityProfile', async () => {
  const component = shallow(<CityProfile/>);
  const data = component.instance();
  await data.componentDidMount();
  expect(component).toMatchSnapshot();	
  
});

it('should render UniversityProfile', async () => {
  const component = shallow(<UniversityProfile/>);
  const data = component.instance();
  await data.componentDidMount();
  expect(component).toMatchSnapshot();

});

it('should render AttractionProfile', async () => {
  const component = shallow(<AttractionProfile/>);
  const data = component.instance();
  await data.componentDidMount();
  expect(component).toMatchSnapshot();
  
});
  
it('should render About', async () => {
  const component = shallow(<About/>);
  expect(component).toMatchSnapshot();
});

describe("About Component", () => {
  const component = shallow(<About/>);
  it('should render title', () => {
    expect(component.find('h1').at(0).text()).toEqual("About Us")
  })
  it('should render mission statement', () => {
    expect(component.find('h3').at(0).text()).toEqual("We are a group of developers passionate about helping students!")
  })
  it('should render data sources', () => {
    expect(component.find('h2').at(0).text()).toEqual("Data Sources/API")
  })
  it('should render university data', () => {
    expect(component.find('h3').at(1).text()).toEqual("University Data")
  })
  it('should render attraction data', () => {
    expect(component.find('h3').at(3).text()).toEqual("Attraction Data")
  })
  it('should render city data', () => {
    expect(component.find('h3').at(5).text()).toEqual("City Data")
  })
  it('should render tools', () => {
    expect(component.find('h2').at(1).text()).toEqual("Tools")
  })
  it('should render links', () => {
    expect(component.find('h2').at(2).text()).toEqual("Links")
  })
})

it('should render GitLabTable', async () => {
  const component = shallow(<GitLab/>);
  const data = component.instance();
  await data.componentDidMount();
  expect(component).toMatchSnapshot();
	
});

it('should render AttractionFilters', async () => {
  const component = shallow(<AttractionFilters/>);
  expect(component).toMatchSnapshot();
  }
);

it('should render CityFilters', async () => {
  const component = shallow(<CityFilters/>);
  expect(component).toMatchSnapshot();
  }
);

it('should render UniversityFilters', async () => {
  const component = shallow(<UniversityFilters/>);
  expect(component).toMatchSnapshot();
  }
);

describe("Attractions Test", function() {
  let querystring = {
    pathname: "/attractions",
    search: "?page=1"
  };

  it("Attractions doesn't have any data at first render", function() {
    const root = shallow(<Attractions location={querystring} />);
    expect(root.state("attractions") == null);
  });
})

describe("Cities Test", function() {
  let querystring = {
    pathname: "/cities",
    search: "?page=1"
  };

  it("Cities doesn't have any data at first render", function() {
    const root = shallow(<Cities location={querystring} />);
    expect(root.state("cities") == null);
  });
})

describe("Universities Test", function() {
  let querystring = {
    pathname: "/universities",
    search: "?page=1"
  };

  it("Universities doesn't have any data at first render", function() {
    const root = shallow(<Universities location={querystring} />);
    expect(root.state("universities") == null);
  });
})



  

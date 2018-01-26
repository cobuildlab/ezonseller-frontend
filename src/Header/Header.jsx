import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logo  from '../assets/logo.png'
import './header.css';
import { history } from '../_helpers';
import $ from 'jquery';

import { userActions } from '../_actions';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: {}
    };
    this.handleSearchProduct = this.handleSearchProduct.bind(this);
    this.handleChange        = this.handleChange.bind(this);
  }

    componentDidMount() {
      if(this.props.url.location.pathname === '/'){
        this.props.dispatch(userActions.getCountry());
      }
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { search } = this.state;

      this.setState({
        search: {
              ...search,
              [name]: value
          }
      })
  }

    handleSearchProduct(event) {
      event.preventDefault();
      this.setState({ submitted: true });
      const { search } = this.state;
      if(search.country && search.keyword && search.category){
        this.props.dispatch(userActions.getSearch(search))
        $().ready(function() {
          $(".fakeloader").show();
        });
      }
    }

    render() {
        const { country, url } = this.props;
        const { search }  = this.state;
        return (
          <div className="container-fluid no-padding">
            <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-faded shadow-nav">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img src={Logo} className="logo-nav center-block img-fluid" alt="Logo ezonSeller" />
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav hidden-md-up">
                <li className="nav-item">
                  <Link to="/" className="nav-link border">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link border">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Logout</Link>
                </li>
              </ul>
              <ul className="navbar-nav mr-auto">
                {url.location.pathname === '/' &&
                  <form className="form-inline hidden-sm-down" onSubmit={this.handleSearchProduct}>
                    <li className="nav-item">
                    {country.items  &&
                    <select className="custom-select rigth-input tam-input-nav" id="country_id" name="country" onChange={this.handleChange} required>
                      <option defaultValue="" selected>Select a Country</option>
                        {country.items.map((option, index)  => {
                          return <option value={option.code} key={index}>{option.name} - {option.code}</option>
                      })}
                    </select>
                    }
                    </li>
                    <li className="nav-item">
                      <select className="custom-select rigth-input tam-input-nav" onChange={this.handleChange} name="category">
                        <option selected>Category</option>
                        <option defaultValue="All">All</option>
                        <option defaultValue="Apparel">Apparel</option>
                        <option defaultValue="Appliances">Appliances</option>
                        <option defaultValue="ArtsAndCrafts">ArtsAndCrafts</option>
                        <option defaultValue="Automotive">Automotive</option>
                        <option defaultValue="Baby">Baby</option>
                        <option defaultValue="Beauty">Beauty</option>
                        <option defaultValue="Blended">Blended</option>
                        <option defaultValue="Books">Books</option>
                        <option defaultValue="Classical">Classical</option>
                        <option defaultValue="Collectibles">Collectibles</option>
                        <option defaultValue="DVD">DVD</option>
                        <option defaultValue="DigitalMusic">DigitalMusic</option>
                        <option defaultValue="Electronics">Electronics</option>
                        <option defaultValue="GiftCards">GiftCards</option>
                        <option defaultValue="GourmetFood">GourmetFood</option>
                        <option defaultValue="Grocery">Grocery</option>
                        <option defaultValue="HealthPersonalCare">HealthPersonalCare</option>
                        <option defaultValue="HomeGarden">HomeGarden</option>
                        <option defaultValue="Industrial">Industrial</option>
                        <option defaultValue="Jewelry">Jewelry</option>
                        <option defaultValue="KindleStore">KindleStore</option>
                        <option defaultValue="Kitchen">Kitchen</option>
                        <option defaultValue="LawnAndGarden">LawnAndGarden</option>
                        <option defaultValue="Marketplace">Marketplace</option>
                        <option defaultValue="MP3Downloads">MP3Downloads</option>
                        <option defaultValue="Magazines">Magazines</option>
                        <option defaultValue="Miscellaneous">Miscellaneous</option>
                        <option defaultValue="Music">Music</option>
                        <option defaultValue="MusicTracks">MusicTracks</option>
                        <option defaultValue="MusicalInstruments">MusicalInstruments</option>
                        <option defaultValue="MobileApps">MobileApps</option>
                        <option defaultValue="OfficeProducts">OfficeProducts</option>
                        <option defaultValue="OutdoorLiving">OutdoorLiving</option>
                        <option defaultValue="PCHardware">PCHardware</option>
                        <option defaultValue="PetSupplies">PetSupplies</option>
                        <option defaultValue="Photo">Photo</option>
                        <option defaultValue="Shoes">Shoes</option>
                        <option defaultValue="Software">Software</option>
                        <option defaultValue="PetSupplies">PetSupplies</option>
                        <option defaultValue="SportingGoods">SportingGoods</option>
                        <option defaultValue="Tools">Tools</option>
                        <option defaultValue="Toys">Toys</option>
                        <option defaultValue="UnboxVideo">UnboxVideo</option>
                        <option defaultValue="VHS">VHS</option>
                        <option defaultValue="Video">Video</option>
                        <option defaultValue="VideoGames">VideoGames</option>
                        <option defaultValue="Watches">Watches</option>
                        <option defaultValue="Wireless">Wireless</option>
                        <option defaultValue="WirelessAccessories">WirelessAccessories</option>
                      </select>
                    </li>
                    <li className="nav-item">
                      <div className="form-group">
                        <label htmlFor="inputPassword2" className="sr-only">Password</label>
                          <input type="text" className="form-control rigth-input tam-input-nav" name="keyword" id="inputPassword2" onChange={this.handleChange} placeholder="Keywords"/>
                          <button type="submit" className="btn btn-primary">Search</button>
                      </div>
                    </li>
                  </form>
                }
                {url.location.pathname === '/' &&
                  <form className="form-group hidden-md-up" onSubmit={this.handleSearchProduct}>
                    <li className="nav-item">
                    {country.items  &&
                    <select className="custom-select rigth-input tam-input-nav" id="country_id" name="country" onChange={this.handleChange} required>
                      <option defaultValue="" selected>Select a Country</option>
                        {country.items.map((option, index)  => {
                          return <option value={option.code} key={index}>{option.name} - {option.code}</option>
                      })}
                    </select>
                    }
                    </li>
                    <li className="nav-item">
                      <select className="custom-select rigth-input tam-input-nav" onChange={this.handleChange} name="category">
                        <option selected>Category</option>
                        <option defaultValue="All">All</option>
                        <option defaultValue="Apparel">Apparel</option>
                        <option defaultValue="Appliances">Appliances</option>
                        <option defaultValue="ArtsAndCrafts">ArtsAndCrafts</option>
                        <option defaultValue="Automotive">Automotive</option>
                        <option defaultValue="Baby">Baby</option>
                        <option defaultValue="Beauty">Beauty</option>
                        <option defaultValue="Blended">Blended</option>
                        <option defaultValue="Books">Books</option>
                        <option defaultValue="Classical">Classical</option>
                        <option defaultValue="Collectibles">Collectibles</option>
                        <option defaultValue="DVD">DVD</option>
                        <option defaultValue="DigitalMusic">DigitalMusic</option>
                        <option defaultValue="Electronics">Electronics</option>
                        <option defaultValue="GiftCards">GiftCards</option>
                        <option defaultValue="GourmetFood">GourmetFood</option>
                        <option defaultValue="Grocery">Grocery</option>
                        <option defaultValue="HealthPersonalCare">HealthPersonalCare</option>
                        <option defaultValue="HomeGarden">HomeGarden</option>
                        <option defaultValue="Industrial">Industrial</option>
                        <option defaultValue="Jewelry">Jewelry</option>
                        <option defaultValue="KindleStore">KindleStore</option>
                        <option defaultValue="Kitchen">Kitchen</option>
                        <option defaultValue="LawnAndGarden">LawnAndGarden</option>
                        <option defaultValue="Marketplace">Marketplace</option>
                        <option defaultValue="MP3Downloads">MP3Downloads</option>
                        <option defaultValue="Magazines">Magazines</option>
                        <option defaultValue="Miscellaneous">Miscellaneous</option>
                        <option defaultValue="Music">Music</option>
                        <option defaultValue="MusicTracks">MusicTracks</option>
                        <option defaultValue="MusicalInstruments">MusicalInstruments</option>
                        <option defaultValue="MobileApps">MobileApps</option>
                        <option defaultValue="OfficeProducts">OfficeProducts</option>
                        <option defaultValue="OutdoorLiving">OutdoorLiving</option>
                        <option defaultValue="PCHardware">PCHardware</option>
                        <option defaultValue="PetSupplies">PetSupplies</option>
                        <option defaultValue="Photo">Photo</option>
                        <option defaultValue="Shoes">Shoes</option>
                        <option defaultValue="Software">Software</option>
                        <option defaultValue="PetSupplies">PetSupplies</option>
                        <option defaultValue="SportingGoods">SportingGoods</option>
                        <option defaultValue="Tools">Tools</option>
                        <option defaultValue="Toys">Toys</option>
                        <option defaultValue="UnboxVideo">UnboxVideo</option>
                        <option defaultValue="VHS">VHS</option>
                        <option defaultValue="Video">Video</option>
                        <option defaultValue="VideoGames">VideoGames</option>
                        <option defaultValue="Watches">Watches</option>
                        <option defaultValue="Wireless">Wireless</option>
                        <option defaultValue="WirelessAccessories">WirelessAccessories</option>
                      </select>
                    </li>
                    <li className="nav-item">
                      <div className="form-group">
                        <label htmlFor="inputPassword2" className="sr-only">Password</label>
                          <input type="text" className="form-control rigth-input tam-input-nav" name="keyword" id="inputPassword2" onChange={this.handleChange} placeholder="Keywords"/>
                          <button type="submit" className="btn btn-primary btn-block">Search</button>
                      </div>
                    </li>
                  </form>
                }
              </ul>

              <ul className="navbar-nav hidden-sm-down">
                <li className="nav-item">
                  <div className="dropdown">
                    <div className="avatar-nav"></div>
                    <button className="btn btn-link dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu pos-menu" aria-labelledby="dropdownMenuButton">
                      <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                      <Link to="/profile" className="nav-link">Profile</Link>
                      <Link to="/login" className="nav-link">Logout</Link>
                    </div>
                  </div>
                </li>
              </ul>

            </div>
            </nav>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { country, search, user } = state;
    return {
        country,
        search,
        user
    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };

import React, { Component } from "react";
import './MainHeader.css'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CityDropdown from "../CityDropdown";
import SelectDate from "./SelectDate";
import GetId from "./GetId";


class MainHeader extends Component {

  render() {

  return (
    
    <div className="main-content">
      <div className="main-header">
          <div className="wrapper">

          <form onSubmit={this.props.LoadMainData}>
             <SelectDate />
             <CityDropdown  disabledlist={this.props.disabled}/>
             <GetId />

             <Button  type="submit" onClick={this.props.submitNote} variant="contained" color="primary" className="button">
                 Apply <Icon className="rightIcon"> send</Icon>
             </Button>
            </form>
             
  </div>
   
  </div>
  
  </div>
  );
}
}

export default MainHeader

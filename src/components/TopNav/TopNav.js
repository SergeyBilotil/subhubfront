import React, { Component } from 'react'
import './TopNav.css'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Main from '../SecondTab/Main';
import LastItem from '../Lastitem/LastItem';
import TaskTable from '../FirstTab/TaskTable';
import { Link } from 'react-router-dom';
function TabContainer({ children }) {
    return (
      <Typography component="div" >
        {children}
      </Typography>
    );
  }
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
   
  };
  
  
class TopNav extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            value: 0 ,
            setValue: 0,
            theme: useTheme,
            
        
        }   
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex= this.handleChangeIndex.bind(this);
            }


            
            handleChange(event, newValue) {
               this.setState({value: newValue});
              }
            handleChangeIndex(index) {
                this.setState({value: index})
              }
    render() {
        
        return (
            <div className="root">
              <div className = "logout-button"><Link to="/login">Logout</Link></div>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Scheduler" />
                <Tab label="DB Search" />
                <Tab label="Live Search" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={this.state.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            > 
              <TabContainer ><TaskTable /></TabContainer>
              <TabContainer ><Main className="main-tab"/></TabContainer>
              <TabContainer ><LastItem /></TabContainer>
            </SwipeableViews>
          </div>
        );
      }
        
    
}

export default TopNav
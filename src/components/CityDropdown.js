import React, { Component } from 'react'
import { userService } from './RegisterPage/_services/user.service'
import { authHeader } from './RegisterPage/_helpers/auth-header';
import Select ,  { components , createFilter }   from "react-select";
import './cityDropdown.css'
import { FixedSizeList as List } from "react-window";
import AbortController from "abort-controller"

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    let height =  children.length  / 10
    if(children.length  < 10 ) {
     height =  children.length * 40 }
     else if (children.length  === undefined) {
      height =  0
     }
     else  {
      height =  250
     }
     
    
    return (
      <List
        height={height}
        itemCount={children.length}
        itemCount={children.length}
        itemSize={35}

      >
        {({ index, style }) => <div style={style} className="psa">{children[index]}</div>}
      </List>
    );
  }
}

const Option = props => {
  
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
const controller = new AbortController()
const signal = controller.signal
class CityDropdown extends Component {
  _isMounted = false;
    constructor(props) {
        super(props);
          this.state = {
            Listcities: [],
            ListVenues: [],
            venue: '',
            venues: '',
            cityes: '',
            city: null,
            
            }
      }
      componentDidMount() {
        this._isMounted = true;
        const requestOptions = {
          headers: authHeader()
        }
        
       
        fetch(`https://stubhub.dataforest.tech/api/cities` , requestOptions) 
        
        .then(res => {
          
          if (res.status == 401) {
            userService.refreshToken()
          } else {
            
            return res.json()
            
          }
          
        })
       
        .then(
          (items) => {
            if (this._isMounted) {
            this.setState({
              Listcities: items,
            
            });
            
          }
          });
     
      }
     
     componentDidUpdate(prevState ,nextState ) {
        
      if (this.state.cityes!== nextState.cityes || this.state.cityes == '' && this.state.ListVenues == '') {
        const cityname = Array.prototype.join.call(this.state.cityes, "|")
      
        const requestOptions = {
          headers: authHeader(),
          signal: signal
        }

        fetch(`https://stubhub.dataforest.tech/api/venues?city=${cityname}` , requestOptions)
         
        .then(res => {
          
          if (res.status == 401) {
            userService.refreshToken()
          } else {
            return  res.json()
          }
         
        })
       
        .then(
          (items2) => {
            
            this.setState({
              ListVenues: items2,
             
            });
     
          });
         
        }
      }
      componentWillUnmount() {
        this._isMounted = false;
      }
      handleChangeVenu = name => event => { 
        if(event !== null ) {

        this.setState({
          venue: event,
          venues: event.map(item => {
            return item.value 
          })
          
        });
        
      } else {
        this.setState({
          venue: event,
          venues: '',
        
        });
      }
     
      };
     
    
    
       handleChange = name => event => {
     
      if(event !== null ) {
        this.setState({
          city: event,
          
          cityes: event.map(item => {
            return item.value 
          })
        });
        
       
      } else {
        this.setState({
          city: event,
          cityes: ''
        
        });
      }
      }    
      
    render() {
      
        return(
            <div className="city-dropdown">
             
              <Select
                defaultValue = ""
                
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ Option , MenuList}}
                name="city"
                ref="citylist"
                placeholder= "All city"
                enableSearch
                isMulti
                value={this.state.city}
                onChange={this.handleChange()}
                filterOption={createFilter({ ignoreAccents: false })}
                options={this.state.Listcities.map((item, ) => {
                  
                  return { value: item ,label: item , key: item};
                })}
              />  
            <Select
                defaultValue = ""
                enableSearch
                
                isDisabled={this.props.disabledlist}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                filterOption={createFilter({ ignoreAccents: false })}
                components={{ Option , MenuList}}
                placeholder= "All Venue"
                isMulti
                name="venue"
                value={this.state.venue}
                onChange={this.handleChangeVenu()}
                options={this.state.ListVenues.map(item => {
                  return { value: item.name ,label: item.name ,key: item.name};
                })}
            />
  
              
                
                </div>
         
           
       
        )
    }
}

export default CityDropdown
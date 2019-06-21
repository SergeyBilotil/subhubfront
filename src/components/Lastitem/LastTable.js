import React, { Component } from 'react'
import "./LastTable.css"
import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { userService } from '../RegisterPage/_services/user.service'
import NativeSelect from '@material-ui/core/NativeSelect';
import { authHeader } from '../RegisterPage/_helpers/auth-header';



class LastTable extends Component {
    constructor(props) {
        super(props);
          this.state = {
            Listcities: [],
          eventId: '',
          lastvenue: '',
          ListVenues: []
          }
      }
      componentDidMount() {
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
            
            this.setState({
              Listcities: items,
            
            });
            
          });
        
      }
      componentDidUpdate(prevState ,nextState ) {
        const requestOptions = {
          headers: authHeader()
        }
        const cityname = this.state.lastvenue
        if (this.state.lastvenue !== nextState.lastvenue) {
        fetch(`https://stubhub.dataforest.tech/api/venues?city=${cityname}` , requestOptions)
        .then(res => {
          if (res.status == 401) {
            userService.refreshToken()
          } else {
            return res.json()
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
      handleChange = name => event => {
    
        this.setState({
          
          
          lastvenue: '',
          [name]: event.target.value,
        });
      };
      handleChangeVenu = name => event => { 
        this.setState({
          
         
          venue: '',
          [name]: event.target.value,
        });
    
      };
    render() {
      const Listcities= this.state.Listcities
      const ListVenues = this.state.ListVenues
        return(
            <div >
              <form onSubmit={this.props.LoadData}>
               <div className="last-table">
                <div className="wrapper"> 
                <FormControl className="" >
        
        <NativeSelect
          name="lastvenue"
          value={this.state.lastvenue}
          onChange={this.handleChange('lastvenue')}
          input={<Input name="lastvenue" id="age-native-label-placeholder" />}
        >
          <option value="" >All Cities</option>
          {Listcities.map(item => (
                <option key={item} >
                  {item}
                </option>
              ))}
        </NativeSelect>
        
      </FormControl>
      <FormControl className="Location">
       
        <NativeSelect
          name="venue"
          value={this.state.venue}
          onChange={this.handleChangeVenu('venue')}
          input={<Input name="venue" id="age-native-label-placeholder" />}
        >
          <option value="">All venue</option>
          {ListVenues.map(item => (
                <option key={item.name}>
                  {item.name}
                </option>
              ))}
        </NativeSelect>
        
      </FormControl>
                <FormControl>
                <label >Event ID</label>
                 <Input
                 name="eventid"
                    placeholder=""
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                />
                </FormControl>
                <Button type="submit" onClick={this.props.submitNote} variant="contained" color="primary" className="button">
        Apply
       
        <Icon className="rightIcon"> send</Icon>
                </Button>
                
                </div>
               </div>
               </form>
            </div>
        )
    }
}

export default LastTable 
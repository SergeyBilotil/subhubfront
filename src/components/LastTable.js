import React, { Component } from 'react'
import "./LastTable.css"
import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


class LastTable extends Component {
    render() {
        return(
            <div className="last-table">
                <div className="wrapper"> 
                  <FormControl>
                <label for="first-input">Write you text</label>
                <Input
                    placeholder=""
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                    required
                />
                </FormControl>
                <FormControl>
                <label for="first-input">Write you text</label>
                 <Input
                    placeholder=""
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                />
                </FormControl>
                <Button variant="contained" color="primary" className="button">
        Apply
       
        <Icon className="rightIcon"> send</Icon>
                </Button>
                </div>
            </div>
        )
    }
}

export default LastTable 
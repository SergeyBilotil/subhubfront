import React, { Component } from "react";
import './MainHeader.css'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

class  SelectDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstselectedDate: null,
            SecondselecteDate: null,
        }
    }

    handleDateChange = (FirstselectedDate,SecondselecteDate) => date=> {

        this.setState({
            [FirstselectedDate]: date.format( "MM-DD-YYYY"),
            [SecondselecteDate]: date.format( "MM-DD-YYYY")
        })
    }

    render() {
        return (

            <div className="date-picker">

                            <MuiPickersUtilsProvider utils={MomentUtils}  >
                                <KeyboardDatePicker
                                    autoOk
                                    name="startdate"
                                    variant="inline"
                                    label="Date from"
                                    format="MM-DD-YYYY"
                                    value={this.state.FirstselectedDate}
                                    onChange={this.handleDateChange('FirstselectedDate')}
                                />

                                <KeyboardDatePicker
                                    autoOk
                                    name="enddate"
                                    variant="inline"
                                    label="Date to"
                                    format="MM-DD-YYYY"
                                    value={this.state.SecondselecteDate}
                                    onChange={this.handleDateChange('SecondselecteDate')}
                                />
                            </MuiPickersUtilsProvider>
            </div>
        );
    }
}

export default SelectDate

import React, { Component } from "react";
import './MainHeader.css'
import { FormControl } from "@material-ui/core";
import { Input } from "semantic-ui-react";

class  GetId extends Component {

    render() {
        return (

            <div className="getid">

                <FormControl>
                    <Input
                        name="eventid"
                        placeholder="Event ID"
                        className="input"
                    />
                </FormControl>

            </div>
        );
    }
}

export default  GetId

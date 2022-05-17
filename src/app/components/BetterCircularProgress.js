import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";

export default class BetterCircularProgress extends Component {
    render() {
        return (
            <div>
                {this.props.loading ?
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginTop: '25vh', marginBottom: '25vh' }}>
                            <CircularProgress color="inherit" style={{ color: "#147dbf" }} size={50} />
                        </div>
                    </div>
                    : this.props.children
                }
            </div>
        );
    }
}
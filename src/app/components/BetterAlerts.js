import React, { Component } from 'react';
import { Alert } from "react-bootstrap";

export default class BetterAlerts extends Component {

    render() {
        return (
            <div>
                {this.props.errors ?
                    this.props.errors.map((obj, i) => {
                        return <Alert key={i} variant="danger">{obj}</Alert>
                    })
                    : null
                }

                {this.props.success ?
                    this.props.success.map((obj, i) => {
                        return <Alert key={i} variant="success">{obj}</Alert>
                    })
                    : null
                }
            </div>
        );
    }
}
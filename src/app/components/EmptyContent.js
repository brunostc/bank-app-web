import React, { Component } from 'react';

export default class EmptyContent extends Component {
    render() {
        return (
            <div>
                <center>
                    <i className={`${this.props.icon} empty-icon`}></i>
                    <p className="empty-text">{this.props.text}</p>
                </center>
            </div>
        );
    }
}
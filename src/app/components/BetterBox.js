import React, { Component } from 'react';

export default class BetterBox extends Component {
    render() {
        return (
            <div className="kt-portlet">
                {(this.props.title || this.props.subtitle) ?
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">{this.props.title}
                                {this.props.subtitle ?
                                    <small>{this.props.subtitle}</small>
                                    : null
                                }
                            </h3>
                        </div>
                    </div>
                    : null
                }

                <div className="kt-portlet__body">
                    <div className="kt-portlet__preview">
                        <div>
                            {this.props.actions ?
                                <div>
                                    {this.props.actions}
                                    <div className="kt-separator kt-separator--dashed"></div>
                                </div>
                                : null
                            }

                            {this.props.children ?
                                <div className="kt-section__content">
                                    {this.props.children}
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
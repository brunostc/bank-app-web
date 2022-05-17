import React, { Component } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { getDashboard } from '../../../crud/dashboard.crud';
import BetterCircularProgress from '../../../components/BetterCircularProgress';
import { connect } from "react-redux";
import { formatCurrency } from "../../../utils/Utils";
import Swal from "sweetalert2";
import moment from "moment";
import { Link } from "react-router-dom";

class DashboardPage extends Component {
	state = {
		loading: false,
		data: null
	};

	componentDidMount = async () => {
		this.setState({ loading: true });

		const { data, status } = await getDashboard();

		if (status === 200) {
			this.setState({ data: data });
		} else {
			Swal.fire('Ops', 'There was an error trying to fetch your account info.', 'error');
		}

		this.setState({ loading: false });
	};

	render() {
		return (
			<BetterCircularProgress loading={this.state.loading}>
				{this.state.data ?
					<React.Fragment>
						<div className="row">
							<div className="col-lg-6">
								<Portlet className="kt-portlet--border-bottom-brand" fluidHeight={true}>
									<PortletBody>
										<div className="kt-widget26">
											<div className="kt-widget26__content">
												<span className="kt-widget26__number">{formatCurrency(this.state.data.balance?.bal_current_balance/100)}</span>
												<span className="kt-widget26__desc">{`Balance`}</span>
											</div>
										</div>
									</PortletBody>
								</Portlet>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-3">
								<Portlet className="kt-portlet--border-bottom-brand" fluidHeight={true}>
									<PortletBody>
										<div className="kt-widget26">
											<div className="kt-widget26__content">
												<span className="kt-widget26__number">{formatCurrency(this.state.data.incomes/100)}</span>
												<span className="kt-widget26__desc">{`Incomes`}</span>
											</div>
											<Link to="/deposit/new" className="btn btn-success"><i className="fa fa-plus"></i>Deposit a check</Link>
										</div>
									</PortletBody>
								</Portlet>
							</div>

							<div className="col-lg-3">
								<Portlet className="kt-portlet--border-bottom-brand" fluidHeight={true}>
									<PortletBody>
										<div className="kt-widget26">
											<div className="kt-widget26__content">
												<span className="kt-widget26__number">{formatCurrency(this.state.data.expenses/100)}</span>
												<span className="kt-widget26__desc">{`Expenses`}</span>
											</div>
											<Link to="/purchase/new" className="btn btn-success"><i className="fa fa-plus"></i>Purchase</Link>
										</div>
									</PortletBody>
								</Portlet>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<Portlet className="kt-portlet--border-bottom-brand" fluidHeight={true}>
									<PortletBody>
										<div className="kt-widget26">
											<div className="kt-widget26__content">
												<span className="kt-widget26__desc"><b>Last 5 transactions</b></span>
												{this.state.data?.last_five_transactions.length > 0 ?
													this.state.data?.last_five_transactions.map((value, index) => {
														return (
															<li><b>Type:</b> {value.tra_type} - <b>Amount:</b> {formatCurrency(value.tra_amount/100)} - <b>Date:</b> {moment(value.created_at).format('DD/MM/YYYY HH:m a')}
																<ul>
																	<li><b>Description:</b> {value.tra_description}</li>
																	<li><b>Previous balance:</b> {formatCurrency(value.tra_previous_balance/100)}</li>
																	<li><b>New balance:</b> {formatCurrency(value.tra_new_balance/100)}</li>
																</ul>
															</li>
														);
													})
													:
													<span className="kt-widget26__desc">{`You have no transactions so far.`}</span>
												}
											</div>
										</div>
									</PortletBody>
								</Portlet>
							</div>
						</div>

					</React.Fragment>
					: 
					null
				}
			</BetterCircularProgress>
		);
	}
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(DashboardPage);

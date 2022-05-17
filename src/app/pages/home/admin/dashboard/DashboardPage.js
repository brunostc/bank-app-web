import React, { Component } from "react";
import { Portlet, PortletBody } from "../../../../partials/content/Portlet";
import { getDashboard } from '../../../../crud/admin/dashboard.crud';
import BetterCircularProgress from '../../../../components/BetterCircularProgress';
import Swal from "sweetalert2";

export default class DashboardPage extends Component {
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
			Swal.fire('Ops', 'There was an error trying to fetch the dashboard info.', 'error');
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
												<span className="kt-widget26__number">{this.state.data.number_of_pending_deposits}</span>
												<span className="kt-widget26__desc">{`Pending Deposits`}</span>
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

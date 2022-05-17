import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";

const DashboardPage = lazy(() =>
	import("./dashboard/DashboardPage")
);

const DepositPage = lazy(() =>
	import("./deposit/DepositPage")
);

const PurchasePage = lazy(() =>
	import("./purchase/PurchasePage")
);

const TransactionPage = lazy(() =>
	import("./transaction/TransactionPage")
);

const AdminDashboardPage = lazy(() =>
	import("./admin/dashboard/DashboardPage")
);

const AdminDepositPage = lazy(() =>
	import("./admin/deposit/DepositPage")
);

function HomePage(props) {

	return (
		<Suspense fallback={<LayoutSplashScreen />}>
			{<Redirect exact from="/" to="/dashboard" />}

			{props.user.token_type === 'customer' ?
				<Switch>
					<Route path="/dashboard" component={DashboardPage} />
					<Route path="/deposit" component={DepositPage} />
					<Route path="/purchase" component={PurchasePage} />
					<Route path="/transaction" component={TransactionPage} />

				</Switch>
				:
				<Switch>
					<Route path="/dashboard" component={AdminDashboardPage} />
					<Route path="/deposit" component={AdminDepositPage} />
				</Switch>
			}
		</Suspense>
	);
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(HomePage);

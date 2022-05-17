import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PurchaseIndex from './PurchaseIndex';
import PurchaseNew from './PurchaseNew';

export default function PurchasePage() {
	return (
		<Switch>
			<Route exact path='/purchase/new' component={PurchaseNew} />
			<Route exact path='/purchase' component={PurchaseIndex} />
		</Switch>
	);
}

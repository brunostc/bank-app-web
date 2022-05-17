import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DepositIndex from './DepositIndex';

import DepositNew from './DepositNew';

export default function DepositPage() {
	return (
		<Switch>
			<Route exact path='/deposit/new' component={DepositNew} />
			<Route exact path='/deposit' component={DepositIndex} />
		</Switch>
	);
}

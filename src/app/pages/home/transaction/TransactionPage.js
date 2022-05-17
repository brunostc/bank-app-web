import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TransactionIndex from './TransactionIndex';

export default function TransactionPage() {
	return (
		<Switch>
			<Route exact path='/transaction' component={TransactionIndex} />
		</Switch>
	);
}

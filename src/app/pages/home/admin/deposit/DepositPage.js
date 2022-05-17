import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DepositIndex from './DepositIndex';

export default function DepositPage() {
	return (
		<Switch>
			<Route exact path='/deposit' component={DepositIndex} />
		</Switch>
	);
}

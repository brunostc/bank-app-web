import React, { Component } from "react";
import { getDataTable } from '../../../crud/transaction.crud';
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BetterBox from "../../../components/BetterBox";
import EmptyContent from "../../../components/EmptyContent";

export default class TransactionIndex extends Component {
	constructor() {
		super();

		this.state = {
			errors: [],
			success: [],
			data: [],
		};
	}

	componentDidMount = async () => {
		const { status, data } = await getDataTable();

		if (status === 200) {
			this.setState({ data: data });
		}
	};

	render() {
		return (
			<>
				<BetterBox title="Transactions">
					{this.state.data.length > 0 ?
						<DataTable value={this.state?.data ?? []}>
							<Column header="ID" field="id" />
							<Column header="Type" field="tra_type" />
							<Column header="Amount" field="amount_formatted" />
							<Column header="Previous Balance" field="old_amount_formatted" />
							<Column header="New Balance" field="new_amount_formatted" />
							<Column header="Description" field="tra_description" />
							<Column header="Datetime" field="created_at_format" />
						</DataTable>
						:
						<EmptyContent icon='fas fa-exclamation-triangle' text="No transactions so far." />
					}
				</BetterBox>
			</>
		);
	}
}

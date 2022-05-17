import React, { Component } from "react";
import { getDataTable } from '../../../crud/purchase.crud';
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BetterBox from "../../../components/BetterBox";
import EmptyContent from "../../../components/EmptyContent";

export default class DepositIndex extends Component {
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
				<BetterBox title="Purchases">

					<Link style={{ marginBottom: '10px' }} to="/purchase/new" className="btn btn-primary btn-bold"><i className="fa fa-plus-square margin-icon"></i>New</Link>

					{this.state.data.length > 0 ?
						<DataTable value={this.state?.data ?? []}>
							<Column header="ID" field="id" />
							<Column header="Amount" field="amount_formatted" />
							<Column header="Description" field="pur_description" />
							<Column header="Datetime" field="created_at_format" />
						</DataTable>	
						:
						<EmptyContent icon='fas fa-exclamation-triangle' text="No purchases so far." />
					}
				</BetterBox>
			</>
		);
	}
}

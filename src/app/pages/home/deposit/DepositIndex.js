import React, { Component } from "react";
import { getDataTable } from '../../../crud/deposit.crud';
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
			data: null,
			pending: [],
			approved: [],
			reproved: [],
		};
	}

	componentDidMount = async () => {
		const { status, data } = await getDataTable();

		if (status === 200) {
			data.forEach((value) => {
				value.url_format = <a rel="noopener noreferrer" target="_blank"href={value.file.url}>File</a>;
			});
			
			const pending = data?.filter((value) => value.dep_approved_at === null && value.dep_reproved_at === null);
			const approved = data?.filter((value) => value.dep_is_approved === 1);
			const reproved = data?.filter((value) => value.dep_is_approved === 0 && value.dep_admin_id !== null);

			this.setState({ data: data, pending, approved, reproved });
		}
	};

	render() {
		return (
			<>
				<BetterBox title="Deposits">

				<Link to="/deposit/new" className="btn btn-primary btn-bold"><i className="fa fa-plus-square margin-icon"></i>New</Link>

					<Tabs style={{marginTop: '20px'}}>
						<TabList>
							<Tab>Pending</Tab>
							<Tab>Accepted</Tab>
							<Tab>Rejected</Tab>
						</TabList>

						<TabPanel>
							{this.state.pending.length > 0 ?
								<DataTable value={this.state.pending}>
									<Column header="ID" field="id" />
									<Column header="Amount" field="amount_formatted" />
									<Column header="Check Image Url" field="url_format" />
									<Column header="Datetime" field="created_at_format" />
								</DataTable>
							:
								<EmptyContent icon='fas fa-exclamation-triangle' text="No pending deposits so far." />
							}
						</TabPanel>
						<TabPanel>
							{this.state.approved.length > 0 ?				
								<DataTable value={this.state.approved}>
									<Column header="ID" field="id" />
									<Column header="Amount" field="amount_formatted" />
									<Column header="Check Image Url" field="url_format" />
									<Column header="Datetime" field="created_at_format" />
								</DataTable>
								:
								<EmptyContent icon='fas fa-exclamation-triangle' text="No approved deposits so far." />
							}
						</TabPanel>
						<TabPanel>
							{this.state.reproved.length > 0 ?	
								<DataTable value={this.state.reproved}>
									<Column header="ID" field="id" />
									<Column header="Amount" field="amount_formatted" />
									<Column header="Check Image Url" field="url_format" />
									<Column header="Datetime" field="created_at_format" />
								</DataTable>
								:
								<EmptyContent icon='fas fa-exclamation-triangle' text="No reproved deposits so far." />
							}
						</TabPanel>
					</Tabs>
				</BetterBox>
			</>
		);
	}
}

import React, { Component } from "react";
import { approve, getDataTable, reprove } from '../../../../crud/admin/deposit.crud';
import 'react-tabs/style/react-tabs.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BetterBox from "../../../../components/BetterBox";
import EmptyContent from "../../../../components/EmptyContent";
import Swal from "sweetalert2";
import BetterCircularProgress from "../../../../components/BetterCircularProgress";
import { LayoutSubheader } from "../../../../../_metronic";

export default class DepositIndex extends Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			errors: [],
			success: [],
			pending: [],
		};
	}

	componentDidMount = async () => {
		this.setState({ loading: true });

		const { status, data } = await getDataTable();

		if (status === 200) {
			data.forEach((value) => {
				value.url_format = <a rel="noopener noreferrer" target="_blank"href={value.file.url}>File</a>;
			});

			this.setState({ pending: data });
		}

		this.setState({ loading: false });
	};
	
	getOptionsColBody = (obj, index) => {
		return (
			<center>
				<button onClick={() => this.approveItem(obj, index)} type="button" className="btn btn-primary btn-table-action"><i className="fas fa-check"></i></button>
				<button onClick={() => this.reproveItem(obj, index)} type="button" className="btn btn-danger btn-table-action"><i className="fas fa-trash-alt"></i></button>
			</center>
		)
	};

	approveItem = (obj, index) => {
		Swal.fire({
			title: 'Warning!',
			text: 'Are you sure you want to approve this deposit?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: "No",
			confirmButtonText: 'Yes'
		}).then(async (result) => {
			if (result.value) {
				this.setState({ loading: true });

				let response;

				try {
					response = await approve(obj.id);
				} catch (error) {
					const apiError = error.response.data.errors[0].length > 0 
						? error.response.data.errors[0]
						: null;

					this.setState({ loading: false });

					return Swal.fire('Ops', `${apiError ?? 'There was an error while trying to approve the deposit. Please, get in contact with the support team.'}`, 'warning');
				}

				this.setState({ loading: false });

				if (response.status === 200) {
					this.componentDidMount();
				}
			}
		});
	};

	reproveItem = (obj, index) => {
		Swal.fire({
			title: 'Warning!',
			text: 'Are you sure you want to reprove this deposit?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: "No",
			confirmButtonText: 'Yes'
		}).then(async (result) => {
			if (result.value) {
				this.setState({ loading: true });

				let response;

				try {
					response = await reprove(obj.id);
				} catch (error) {
					const apiError = error.response.data.errors[0].length > 0 
						? error.response.data.errors[0]
						: null;

					this.setState({ loading: false });

					return Swal.fire('Ops', `${apiError ?? 'There was an error while trying to reprove the deposit. Please, get in contact with the support team.'}`, 'warning');
				}

				this.setState({ loading: false });

				if (response.status === 200) {
					this.componentDidMount();
				}
			}
		});
	};

	render() {
		return (
			<>
				<LayoutSubheader title={`Deposits`} />

				<BetterCircularProgress loading={this.state.loading}>

					<BetterBox title="Deposits">
						{this.state.pending.length > 0 ?
							<DataTable value={this.state.pending}>
								<Column header="ID" field="id" />
								<Column header="User" field="user.username" />
								<Column header="Amount" field="amount_formatted" />
								<Column header="Check Image Url" field="url_format" />
								<Column header="Datetime" field="created_at_format" />
								<Column body={(obj, i) => this.getOptionsColBody(obj, i.rowIndex)} header="Options" />
							</DataTable>
						:
							<EmptyContent icon='fas fa-exclamation-triangle' text="No pending deposits so far." />
						}
					</BetterBox>
				</BetterCircularProgress>
			</>
		);
	}
}

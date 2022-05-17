import { TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import BetterBox from '../../../components/BetterBox';
import BetterAlerts from '../../../components/BetterAlerts';
import BetterCircularProgress from '../../../components/BetterCircularProgress';
import { LayoutSubheader } from '../../../../_metronic/layout/LayoutContext';
import { formatCurrencyInput } from '../../../utils/Utils';
import Swal from 'sweetalert2';
import { store } from '../../../crud/purchase.crud';

export default class PurchaseNew extends Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			submitted: false,
			success: false,
			errors: [],
			check_image_url: null,
			check_image: null,
		};
	}

	componentDidMount = () => {
	}

	getInitialValues = () => {
		return {
			pur_amount: '',
			pur_description: '',
		};
	};
	
	clearCoin = (value) => {
		value = value.replace("US$", "");
		value = value.replace(".", "");
		value = value.replace(",", "");
		value = value.replace('/^\p{Z}+|\p{Z}+$/u', '');
		value = value.trim();

		return value;
	};

	onSubmit = async (values) => {
		if (values.pur_amount == '' || values.pur_description == '') {
			return Swal.fire('Ops', 'You must fill all the required fields. Please, try again.', 'warning');
		}

		this.setState({ loading: true });

		const formData = new FormData();

		formData.append('amount', this.clearCoin(values.pur_amount));
		formData.append('description', values.pur_description);

		let response;
		try {
			response = await store(formData);
		} catch (error) {
			const apiError = error.response.data.errors[0];

			this.setState({ loading: false });

			return Swal.fire('Ops!', `${apiError ?? 'An error ocurred while trying to make your purchase. Please, try again.'}`, 'error');
		} 

		Swal.fire('Success!', 'Your purchase has been made.', 'success');
		
		this.setState({ success: true, loading: false });
	};

	render() {
		return (
			<div>
				<LayoutSubheader title={`Make a new purchase`} />

				<BetterCircularProgress loading={this.state.loading}>
					<div>
						<BetterAlerts errors={this.state.errors} />

						{this.state.success ?
							<Redirect to={{ pathname: '/purchase', state: { success: ['Purchase created!'] } }} />
							: null
						}

						<Formik initialValues={this.getInitialValues()} onSubmit={(values) => this.onSubmit(values)}>
							{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
								<form noValidate={true} autoComplete='off' onSubmit={handleSubmit}>
									<BetterBox title='Data' subtitle='Fill all required fields.'>
										<div className='row'>
											<div className='col-sm-12'>
												<TextField
													name='pur_amount'
													label='Amount (USD) *'
													margin='normal'
													variant='outlined'
													onBlur={handleBlur}
													onChange={e => handleChange(formatCurrencyInput(e))}
													value={values.pur_amount}
													helperText={touched.pur_amount && errors.pur_amount}
													error={Boolean(touched.pur_amount && errors.pur_amount)} />
											</div>

											<div className='col-sm-12'>
												<TextField
													name='pur_description'
													label='Description *'
													margin='normal'
													variant='outlined'
													onBlur={handleBlur}zbra
													onChange={handleChange}
													value={values.pur_description}
													helperText={touched.pur_description && errors.pur_description}
													error={Boolean(touched.pur_description && errors.pur_description)} />
											</div>
										</div>
									</BetterBox>

									<BetterBox>
										<Link to={'/purchase'} className='btn btn-danger btn-bold'><i className='fa fa-arrow-left margin-icon'></i>Back</Link>

										<button type='submit' disabled={this.state.submitted} className='btn btn-success btn-bold pull-right'>
											<i className={`margin-icon ${this.state.submitted ? 'fas fa-sync fa-spin' : 'fa fa-check-square'}`}></i>Submit
                                        </button>
									</BetterBox>
								</form>
							)}
						</Formik>
					</div>
				</BetterCircularProgress>
			</div>
		);
	}
}

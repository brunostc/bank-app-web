import { TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import BetterBox from '../../../components/BetterBox';
import BetterAlerts from '../../../components/BetterAlerts';
import BetterCircularProgress from '../../../components/BetterCircularProgress';
import { LayoutSubheader } from '../../../../_metronic/layout/LayoutContext';
import { toAbsoluteUrl } from '../../../../_metronic';
import { formatCurrencyInput } from '../../../utils/Utils';
import Swal from 'sweetalert2';
import { store } from '../../../crud/deposit.crud';

export default class DepositNew extends Component {
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
			dep_amount: '',
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
		const { check_image } = this.state;

		if (!check_image) {
			return Swal.fire('Ops', 'You must insert a check image before submitting.', 'warning');
		}

		this.setState({ loading: true });

		const formData = new FormData();

		formData.append('amount', this.clearCoin(values.dep_amount));
		formData.append('check_image', check_image);

		const { status } = await store(formData);

		if (status === 200) {
			Swal.fire('Success!', 'Your deposit has been made. Wait until it is approved to spend your funds', 'success');
			
			this.setState({ success: true, loading: false });
		} else {
			Swal.fire('Ops!', 'An error ocurred while trying to make your deposit. Please, try again.', 'error');
		}

		this.setState({ loading: false });
	};

	onChange = (e) => {
		this.setState({ check_image: e.currentTarget.files[0], check_image_url: URL.createObjectURL(e.currentTarget.files[0]) });
	}

	render() {
		return (
			<div>
				<LayoutSubheader title={`Make a new deposit`} />

				<BetterCircularProgress loading={this.state.loading}>
					<div>
						<BetterAlerts errors={this.state.errors} />

						{this.state.success ?
							<Redirect to={{ pathname: '/deposit', state: { success: ['Deposit created!'] } }} />
							: null
						}

						<Formik initialValues={this.getInitialValues()} onSubmit={(values) => this.onSubmit(values)}>
							{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
								<form noValidate={true} autoComplete='off' onSubmit={handleSubmit}>
									<BetterBox title='Data' subtitle='Fill all required fields.'>
										<div className='row'>
											<div className='col-sm-12'>
													<TextField
														name='dep_amount'
														label='Amount (USD) *'
														margin='normal'
														variant='outlined'
														onBlur={handleBlur}
														onChange={e => handleChange(formatCurrencyInput(e))}
														value={values.dep_amount}
														helperText={touched.dep_amount && errors.dep_amount}
														error={Boolean(touched.dep_amount && errors.dep_amount)} />
											</div>
											<div className='col-sm-12'>
												<input className="d-none" type="file" name="check_image" id="check_image" onChange={(e) => this.onChange(e)}/>

												<label disabled={this.state.videoLoading} htmlFor="check_image" className={`${!this.state.check_image ? 'upload-file' : 'upload-file-added'}`}>
													<span className={`${!this.state.check_image ? 'upload-file-text' : 'upload-file-text-added'}` }>
														<i className={`margin-icon fa fa-upload`}></i>{this.state.check_image?.name ? this.state.check_image.name : 'Upload check'}
													</span>
												</label>
											</div>
										</div>
									</BetterBox>

									<BetterBox title="Check image">
										<div className="row">
											<div className="col-sm-12">
												<div>
												</div>
											</div>
										</div>

										<div className="row">
											{this.state.check_image_url != null ?
												<>
													<div className="col-sm-4"></div>
													<div className="col-sm-4">
														<div className='imagemUploaderMargem'>
															<a href={this.state.check_image_url} target="_blank" rel="noopener noreferrer">
																<div className='imagemUploaderBackground' style={{ backgroundImage: `url(${toAbsoluteUrl("/images/folder-image.png")})` }}></div>
															</a>

															<button type="button" className="btn btn-danger btn-bold uploader-remove"  onClick={(e) =>  this.setState({ check_image: null, check_image_url: null }) }><i className="fas fa-times margin-icon" aria-hidden="true"></i>Remove
                                                            </button>
														</div>
													</div>
												</>
												:
												<div style={{ textAlign: 'center' }}>
													<h4>No check image added yet.</h4>
												</div>
											}
										</div>
									</BetterBox>

									<BetterBox>
										<Link to={'/deposit'} className='btn btn-danger btn-bold'><i className='fa fa-arrow-left margin-icon'></i>Back</Link>

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

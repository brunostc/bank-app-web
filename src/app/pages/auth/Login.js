import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../crud/auth.crud";
import * as utils from "../../../_metronic/utils/utils";
import { Constants } from '../../utils/Constants';

function Login(props) {
	const [loading, setLoading] = useState(false);
	const [loadingButtonStyle, setLoadingButtonStyle] = useState({ paddingRight: "2.5rem" });

	const enableLoading = () => {
		setLoading(true);
		setLoadingButtonStyle({ paddingRight: "3.5rem" });
	};

	const disableLoading = () => {
		setLoading(false);
		setLoadingButtonStyle({ paddingRight: "2.5rem" });
	};

	return (
		<>
			<div className="kt-login__head">
			</div>

			<div className="kt-login__body">
				<div className="kt-login__form">
					<div className="kt-login__title">
						<h3>BNB Bank - Sign In</h3>
					</div>

					<Formik initialValues={{ email: "", password: "" }}
						validate={values => {
							const errors = {};

							if (!values.email) {
								errors.email = "The email field is required.";
							} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
								errors.email = "You need to enter a valid email.";
							}

							if (!values.password) {
								errors.password = "The password field is required.";
							}

							return errors;
						}} onSubmit={(values, { setStatus, setSubmitting }) => {
							enableLoading();

							login(values.email, values.password).then(res => {
								disableLoading();

								utils.setStorage('authToken', res.data.token, null);
								props.login(res.data);
							}).catch(() => {
								disableLoading();

								setSubmitting(false);

								setStatus("Incorrect user or password.");
							});
						}}>

						{({ values, status, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
							<form noValidate={true} autoComplete="off" className="kt-form" onSubmit={handleSubmit}>
								{status ? (
									<div role="alert" className="alert alert-danger">
										<div className="alert-text">{status}</div>
									</div>
								) : null}

								<div className="form-group">
									<TextField type="email" label="Your e-mail" margin="normal" className="kt-width-full" name="email"
										onBlur={handleBlur} onChange={handleChange} value={values.email} helperText={touched.email && errors.email}
										error={Boolean(touched.email && errors.email)} />
								</div>

								<div className="form-group">
									<TextField type="password" margin="normal" label="Your password" className="kt-width-full" name="password"
										onBlur={handleBlur} onChange={handleChange} value={values.password} helperText={touched.password && errors.password}
										error={Boolean(touched.password && errors.password)} />
								</div>

								<div className="kt-login__actions">
									<a href={'/auth/register'} className="kt-link kt-login__link-forgot">No account? Register.</a>

									<button id="kt_login_signin_submit" type="submit" disabled={isSubmitting} className={`btn btn-primary btn-elevate kt-login__btn-primary 
                    						${clsx({ "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading })}`}
										style={loadingButtonStyle}>Go!</button>
								</div>
							</form>
						)}
					</Formik>

				</div>
			</div>
		</>
	);
}

export default connect(null, auth.actions)(Login)

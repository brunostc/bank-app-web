import React, { useState } from "react";
import { Formik } from "formik";
import { TextField } from "@material-ui/core";
import { register } from "../../crud/auth.crud";

export default function Register(props) {
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

	const validate = (values) => {
		const errors = {};

		if (!values.email) {
			errors.email = "The email field is required.";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = "You need to enter a valid email.";
		}

		if (!values.password) {
			errors.password = "The password field is required.";
		}

		if (!values.username) {
			errors.username = "The username field is required.";
		}

		return errors;
	}

	return (
		<>
			<div className="kt-login__head">
			</div>

			<div className="kt-login__body">
				<div className="kt-login__form">
					<div className="kt-login__title">
						<h3>BNB Bank - Registration</h3>
					</div>

					<Formik 
						initialValues={{ email: "", password: "", username: "" }}
						validate={values => validate(values)} 
						onSubmit={(values, { setStatus, setSubmitting }) => {
							enableLoading();

							register(values.email, values.password, values.username)
								.then(res => {
									if (res.status === 200) {
										disableLoading();

										window.location.replace('/login');
									}
								}).catch(() => {
									disableLoading();

									setSubmitting(false);

									setStatus("Information provided is incorrect.");
								});
						}}>

						{({ values, status, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
							<form noValidate={true} autoComplete="off" className="kt-form" onSubmit={handleSubmit}>
								{status ? 
									<div role="alert" className="alert alert-danger">
										<div className="alert-text">{status}</div>
									</div>
									: 
									null
								}

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

								<div className="form-group">
									<TextField margin="normal" label="Your username" className="kt-width-full" name="username"
										onBlur={handleBlur} onChange={handleChange} value={values.username} helperText={touched.username && errors.username}
										error={Boolean(touched.username && errors.username)} />
								</div>

								<div className="kt-login__actions">
									<a href={'/auth/login'} className="kt-link kt-login__link-forgot">Already has account? Login.</a>

									<button id="kt_login_signin_submit" type="submit" disabled={isSubmitting} className={`btn btn-primary btn-elevate kt-login__btn-primary`}>Go!</button>
								</div>
							</form>
						)}
					</Formik>

				</div>
			</div>
		</>
	);
}

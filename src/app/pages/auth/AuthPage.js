import React from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic";
import "../../../_metronic/_assets/sass/pages/login/login-1.scss";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
	return (
		<>
			<div className="kt-grid kt-grid--ver kt-grid--root">
				<div id="kt_login" className="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1">
					<div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
						<div className="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside"
							style={{ backgroundImage: `url(${toAbsoluteUrl('/media/bg/bg-3.jpg')})` }}>
							<div className="kt-grid__item">
								<Link to="/" className="kt-login__logo" style={{ display: 'inherit' }}>
									<img alt="Logo" src={toAbsoluteUrl("/images/logo-dark.png")} style={{ maxWidth: '50%', height: 'auto' }} />
								</Link>
							</div>

							<div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
								<div className="kt-grid__item kt-grid__item--middle">
									<h3 className="kt-login__title">Welcome!</h3>
									<h4 className="kt-login__subtitle">
										To start, enter your credentials.
                  					</h4>
								</div>
							</div>

							<div className="kt-grid__item">
								<div className="kt-login__info">
									<div className="kt-login__copyright">&copy; 2022 BNB Bank </div>
									<div className="kt-login__menu">
									</div>
								</div>
							</div>
						</div>

						<div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
							<Switch>
								<Route path="/auth/login" component={Login} />
								<Route path="/auth/register" component={Register} />
								<Redirect from="/auth" exact={true} to="/auth/login" />
								<Redirect to="/auth/login" />
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

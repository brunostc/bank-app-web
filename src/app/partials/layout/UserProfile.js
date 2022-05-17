import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-restricted-imports
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";

class UserProfile extends React.Component {
	render() {
		const { user, showHi } = this.props;

		return (
			<Dropdown className="kt-header__topbar-item kt-header__topbar-item--user" drop="down" alignRight>
				<Dropdown.Toggle as={HeaderDropdownToggle} id="dropdown-toggle-user-profile">
					<div className="kt-header__topbar-user">
						{showHi && (<span className="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>)}

						{showHi && (<span className="kt-header__topbar-username kt-hidden-mobile">{user.username}</span>)}
					</div>
				</Dropdown.Toggle>

				<Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
					<div className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
						style={{ backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-5.jpg")})` }}>

						<div className="kt-user-card__name">{user.username}</div>
					</div>

					<div className="kt-notification">
						<div className="kt-notification__custom">
							<Link to="/logout" className="btn btn-primary btn-bold">Logout</Link>
						</div>
					</div>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(UserProfile);

let url = "";

if (process.env.NODE_ENV === 'development') {
	url = "http://localhost:8000";
} else {
	url = "https://api.bnb-bank.heroku.com";
}

export const Constants = {
	url: url,
	baseUrl: url + "/api/customer",
	baseUrlAdmin: url + "/api/admin",
};

export const formatCurrency = value => {
	const formatter = new Intl.NumberFormat('US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	value = formatter.format(value);

	return value;
};

export const formatCurrencyInput = input => {
	input.target.value = Number(input.target.value.toString().replace(/[^0-9-]/g, '')) / 10 ** 2;

	input.target.value = formatCurrency(input.target.value);

	return input;
};

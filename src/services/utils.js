export function getCookie(name) {
	const matches = document.cookie.match(
		// eslint-disable-next-line no-useless-escape
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const setCookie = (name, value, props) => {
	props = {
		path: '/',
		...props,
	};
	let exp = props.expires;
	if (typeof exp == 'number' && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000);
		exp = props.expires = d;
	}
	if (exp && exp.toUTCString) {
		props.expires = exp.toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + '=' + value;
	for (const propName in props) {
		updatedCookie += '; ' + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
};

export function deleteCookie(name) {
	setCookie(name, null, {expires: -1});
}

export const transformDate = (date) => {
	const getDiffDays = (days) =>
		days === 0
			? 'Сегодня'
			: days === 1
				? 'Вчера'
				: days > 1
					? `${days} дня назад`
					: '';
	const dataCreate = new Date(date);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const diffTime = Math.ceil((today - dataCreate) / (60 * 60 * 24 * 1000));
	const hours =
		dataCreate.getHours() > 9
			? dataCreate.getHours()
			: `0${dataCreate.getHours()}`;
	const min =
		dataCreate.getMinutes() > 9
			? dataCreate.getMinutes()
			: `0${dataCreate.getMinutes()}`;
	return `${getDiffDays(diffTime)},${hours}:${min}i-GMT+${
		(dataCreate.getTimezoneOffset() * -1) / 60
	}`;
};

export const showStatus = (status) =>
	status === null ? null : status === 'done' ? (
		'Выполнен'
	) : status === 'pending' ? (
		<span style={{color: 'white'}}>Отменен</span>
	) : (
		<span style={{color: 'white'}}>Готовится</span>
	);

export const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
            // eslint-disable-next-line no-useless-escape
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
            '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string, props: { [key: string]: {} } & { expires?: number | Date | string } = {}) => {
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
    if (exp && (exp as Date).toUTCString) {
        props.expires = (exp as Date).toUTCString();
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

export const deleteCookie = (name: string) => {
    setCookie(name, '', {expires: -1});
};

export const transformDate = (date: string) => {
    const getDiffDays = (days: number) =>
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
    const diffTime = Math.ceil((+today - +dataCreate) / (60 * 60 * 24 * 1000));
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
export const showStatus = (status: string | null): { color: string, orderStatus: string } | null => {
    if (status === 'done') {
        return {color: '#00cccc', orderStatus: 'Выполнен'}
    }
    if (status === 'pending') {
        return {color: 'white', orderStatus: 'Готовится'}
    }
    if (status === 'pending') {
        return {color: 'white', orderStatus: 'Создан'}
    } else {
        return null
    }
}

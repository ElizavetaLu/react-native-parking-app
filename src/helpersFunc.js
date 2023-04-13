export const cardNumberFormat = (value, setCardNumber) => {

    if (isNaN(value.split(' ').join(''))) return;

    const cardNumber = value
        .replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "")
        .substr(0, 16);

    const parts = [];

    for (let i = 0; i < cardNumber.length; i += 4) {
        parts.push(cardNumber.substr(i, 4));
    }

    setCardNumber(parts.length > 1 ? parts.join(" ") : value);
}



export const expDateFormat = (value, setExpDate) => {

    if (isNaN(value.split('/').join(''))) return;

    const formattedValue = value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
    );

    setExpDate(formattedValue);
}

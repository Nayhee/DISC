export const FormatPrice = (price) => {
    let minusOne = price - 1;
    return `${minusOne}.99`;
}

export const splitDate = (dateTime) => {
    let newDateTime = dateTime.toString();
    let dates = newDateTime.split("T");
    return dates[0];
}
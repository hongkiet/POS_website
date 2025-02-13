module.exports = (number) => {
    const numericValue = parseFloat(number);
    if (!isNaN(numericValue)) {
        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });

        return formatter.format(numericValue);
    } else {
        return "Invalid Number";
    }
}
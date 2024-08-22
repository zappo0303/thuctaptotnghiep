export const formatCurrencyVND = (value: number | undefined): string => {
    if (value === undefined || value === null) {
        return "0₫";
    }
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

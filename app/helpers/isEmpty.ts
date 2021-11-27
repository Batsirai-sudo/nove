export const isEmpty = (data, ignoreData) => {
    const x = data
    if (typeof ignoreData !== 'undefined') {
        ignoreData.forEach((value) => {
            delete x[value]
        })
    }
    return Object.values(x).some(
        (x) => {
            return x === null || x === ''
        });
}
export const isFilled = (data) => {
    return Object.values(data).some(
        (x) => x !== '',
    );

}

export default (length, upper) => {
    var randomChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length),
        );
    }
    if (upper) {
        return result.toUpperCase();
    }
    return result;
}


export const keyGenerator = (v = 30) => {
    return [...Array(v)].map(x => ((Math.random() * 36) | 0).toString(36)).join('');
}
/**
 * invoiceNumber 10
 * order Number 6
 * transactionId 15
 */
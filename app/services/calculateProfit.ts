export default (data) => {
    const purifiedData = filterData(data)
    /**
     * Get the total Amount Entered for buying amount
     */
    const buyingArray = getArrayamount(purifiedData, 'buying')
    const totalBuyingAmount = getTotals(buyingArray)
    /**
     * Get the total selling amount
     */
    const sellingArray = getArrayamount(purifiedData, 'selling')
    const totalSellingAmount = getTotals(sellingArray)

    const profit = totalSellingAmount - totalBuyingAmount

    return {
        profit,
        totalBuyingAmount,
        totalSellingAmount
    }

}


const filterData = (x) => {
    return x.filter(x => x.amount !== '')

}


const getArrayamount = (x, type) => {
    return type === 'buying'
        ? x.map(x => parseInt(x.amount))
        : x.map(x => parseInt(x.salePrice))

}


const getTotals = (x) => {
    return x.reduce((a, b) => a + b)
}
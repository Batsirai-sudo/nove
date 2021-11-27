export const getDeliveryStock = async (productsForStockDelivery, globalTrackIndex) => {

    const firstIndex = globalTrackIndex.first
    const lastIndex = globalTrackIndex.last

    const firestoreData = productsForStockDelivery.data.slice(firstIndex, lastIndex)

    return firestoreData
};

// let counter = 1;

  // React.useEffect(() => {
  //   getList(firstIndex, secondIndex);
  // }, []);

  // const getList = (firstValue, lastValue) =>
  //   setData(slicing(firstValue, lastValue));

  // const lowListLeft = () => {
  //   if (getLength() - globalLength < 10) {
  //     getList(getLength() - leftItems, getLength() - 1);
  //   } else {
  //     return true;
  //   }
  // };

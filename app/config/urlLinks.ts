export const urlIndexes = ['registration', 'notification', 'connect']


// https://mlambo.shop
export const getUrl = (link) => {
  var splitUrl = link.url.split('/');
  console.log(splitUrl);

  return splitUrl[3] === urlIndexes[0]
    ? urlIndexes[0]
    : splitUrl[3] === urlIndexes[1]
      ? urlIndexes[1]
      : null


}

// ["https:", "", "mlambo.shop", "45566", "788889"]
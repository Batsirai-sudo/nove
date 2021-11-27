import _ from 'lodash';

const containsQuery = ({name}, query, type) => {
  if (type === 'deliveries') {
    if (name.toLowerCase().includes(query)) {
      return true;
    }
  }

  return false;
};

const handleSearch = (data, query, type) => {
  const formattedQuery = query.toLowerCase();
  const c = _.filter(data, (x) => {
    return containsQuery(x, formattedQuery, type);
  });
  return c;
};

export default handleSearch;
// if (name.includes(query) || last.includes(query) || email.includes(query)) {
//   return true;
// }
// const {first, last} = name;

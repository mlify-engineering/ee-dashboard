export const addFromToCityToUrl = ({ from_city_id, to_city_id }) => {
  // Grab current URL query params
  const currentUrlParams = new URLSearchParams(window.location.search);
  console.log(
    'addFromToCityToUrl with from_city_id: ',
    from_city_id,
    ' and to_city_id: ',
    to_city_id,
    ' and currentUrlParams: ',
    currentUrlParams.toString()
  );
  // Set or update the 'from_city' and 'to_city' params
  currentUrlParams.set('from_city', from_city_id);
  currentUrlParams.set('to_city', to_city_id);

  const newUrl = `${window.location.pathname}?${currentUrlParams.toString()}`;
  window.history.pushState({ from_city: from_city_id, to_city: to_city_id }, '', newUrl);
  console.log('newUrl: ', newUrl);
  console.log('Current Params: ', currentUrlParams.toString());
};

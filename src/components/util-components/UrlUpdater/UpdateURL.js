// export function updateUrl(location, history, newSearchParams) {
//   location.pathname = location.pathname.replace(/\/$/, '');

//   history.push({
//     search: newSearchParams.toString(),
//   });
// }

export function updateUrl({ newSearchParams }) {
  const currentUrl = new URL(window.location.href);
  const currentSearchParams = new URLSearchParams(currentUrl.search);

  // Merge current search params with new search params
  newSearchParams.forEach((value, key) => currentSearchParams.set(key, value));

  // Construct the new URL
  const newUrl = `${currentUrl.pathname}?${currentSearchParams.toString()}`;

  // Update the URL using the HTML5 History API without reloading the page
  window.history.pushState(null, '', newUrl);
}

export function updateUrlByReplacingCurrentParams({ newSearchParams }) {
  const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
  window.history.pushState(null, '', newUrl);
}

import { updateUrl } from './UpdateURL';

export const addPageNumberToUrl = ({ pageNumber }) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  if (newSearchParams.has('page')) newSearchParams.delete('page');
  newSearchParams.set('page', pageNumber);
  updateUrl({ newSearchParams });
};

export const replacePageNumberInUrl = ({ pageNumber }) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.set('page', pageNumber);
  updateUrl({ newSearchParams });
};

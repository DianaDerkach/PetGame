export const fetcher = async (...args) => fetch(...args)
  .then(response => response.json());

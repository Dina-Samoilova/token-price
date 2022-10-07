export const fetchToken = async () => {
  const response = await fetch(
    'https://api.coindesk.com/v1/bpi/currentprice.json'
  );

  const token = await response.json();

  return token;
};

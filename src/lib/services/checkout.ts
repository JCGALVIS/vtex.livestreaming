export const cartSimulation = async (body: any) => {
  const url = `/api/checkout/pub/orderforms/simulation`;

  const method = 'POST';

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const raw = JSON.stringify(body);

  const data = await fetch(url, {
    method,
    headers,
    body: raw,
  });

  return data;
};

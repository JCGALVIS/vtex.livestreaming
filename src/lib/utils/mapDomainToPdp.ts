export const mapDomainToPdp = (
  products: Promise<any>,
  account?: string,
  host?: string,
) => {
  const productoWithHost = new Promise((resolve, reject) => {
    products
      .then((pros: any[]) => {
        const prosMap = pros?.map((pro: any) => {
          let pdpLink = pro.pdpLink ? pro.pdpLink : '';
          if (host) {
            pdpLink = pdpLink.replace(
              `${account}.myvtex.com`,
              host ? host : '',
            );
          }
          return {
            ...pro,
            pdpLink,
          };
        });
        resolve(prosMap);
      })
      .catch(err => reject(err));
  });
  return productoWithHost;
};

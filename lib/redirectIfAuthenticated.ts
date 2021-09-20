const redirectIfAuthenticated = (res: any, cookies: any, page: string) => {
  const auth = cookies.AUTH_KEY;
  const location = cookies.ACTIVE_LNG ? `/${cookies.ACTIVE_LNG}/${page}` : `/id/${page}`;

  if (auth) {
    res.writeHead(307, {
      Location: location
    });
    res.end();
  }

}

export default redirectIfAuthenticated;
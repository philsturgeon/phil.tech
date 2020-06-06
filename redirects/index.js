async function handleRequest(request) {
  const requestURL = new URL(request.url);
  const path = requestURL.pathname;

  const matches = path.match(/([a-z]+\/)?([0-9]{4})+\/[0-9]{2}\/([0-9]{2}\/)?([a-zA-Z\d-_]+)/);

  if (matches) {
    const location = 'https://phil.tech/' + matches[2] + '/' + matches[4];
    return Response.redirect(location, 301);
  }

  return fetch(request);
}

addEventListener('fetch', async event => {
  event.respondWith(handleRequest(event.request));
});

const { PORT: port = 80 } = process.env

const proxy = require('redbird')({
  port,
})
const { docker } = require('redbird')

const hosts = [
  require("os").hostname(),
  "0.0.0.0",
  "localhost"
]

const routes = {
  "/": "3000",
  "/admin": "4000",
  "/api": "8080"
}

// const routes = {
//   "/":"mbau/minister-landing",
//   "/admin":"mbau/minister-admin",
//   "/api": "mbau/minister-api"
// }

hosts.map(host => {
  Object.entries(routes).forEach(([route, port]) => {
    proxy.register(
      `${host}${route}`,
      `http://${host}:${port}${route}`
    );
    // docker(redbird).register(`${host}${route}`, port)
  });
});


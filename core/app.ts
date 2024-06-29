require("dotenv").config();
import http from "http";

import routes from "../routes";

const server = http.createServer(routes);

const port = process.env.PORT ?? 8080;

server.listen(port, () => {
  console.log(`Server ready to serve and running on port ${port}`);
});

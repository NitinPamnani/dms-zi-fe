### dms-zi-fe

- Frontend for dms-zi. Written using react
- Download the zip or take a pull of the repo
- Navigate to the dm-zi/src directory.
- Make sure to use Node version `20.6.1`
- Run this command - `npm install`
- Run the service using command - `npm run start`
- For the react client to access gRPC apis, we need to setup envoy proxy.
- Browsers have to connect to gRPC services via a special proxy. This proxy is a process that can send HTTP/2 calls. So we send an HTTP 1.1 call to the proxy from the browser, the proxy gets it and calls the gRPC server via HTTP/2 sending the request URL and parameters with it. Then, it receives a response from the gRPC server via HTTP/2, the response is now sent to the client via HTTP 1.1 by the proxy. The ideal proxy process for this is Envoy.
- To run envoy proxy, ensure that docker is installed in the machine.
- To check if docker is installed, run the command `docker -v`
- To check if docker-compose is installed run the command `docker-compose -v`
- if any of above not present, follow the guide to install the respective, here - https://docs.docker.com/engine/install/
https://docs.docker.com/compose/

- Now to run envoy follow the steps below:
	1. Navigate to directory `/dms-zi/src/client/generated`
	2. In this directory run the command - `docker-compose up`
	3. This runs envoy proxy, listening at port `8080`

- Now the frontend is ready to use the backend gRPC apis. 
- The service by default runs on port 3000

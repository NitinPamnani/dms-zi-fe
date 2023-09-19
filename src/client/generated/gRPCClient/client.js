import {DocumentManagementServiceClient} from '../dms_grpc_web_pb';

const client = new DocumentManagementServiceClient('http://localhost:8080');

export default client;
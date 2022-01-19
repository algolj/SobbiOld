import { serverConfig } from './constants';
import { TtypeConnection } from './type';

interface IServerConnector {
  typeConnection: TtypeConnection;
  address: string;
  port?: string;
}

class ServerConnector {
  protected link: string;

  constructor({
    typeConnection = serverConfig.typeConnection,
    address = serverConfig.address,
    port = serverConfig.port,
  }: IServerConnector) {
    this.link = `${typeConnection}://${address}:${port}/`;
  }
}

export default ServerConnector;

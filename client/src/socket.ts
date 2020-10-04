import io from 'socket.io-client';

import Config from './AppSettings';

const socket = io(Config.server.baseUrl);
export default socket;

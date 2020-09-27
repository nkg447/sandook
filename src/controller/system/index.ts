import 'reflect-metadata';

import disk from 'diskusage';
import { inject, injectable } from 'inversify';
import os from 'os';

import Config from '../../config/';
import { ControllerError, ControllerSuccess } from '../../core/controller/definition';
import { TYPES } from '../../di/types';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';
import { System } from '../../entity/system';
import { info } from '../../event/sys-log/';
import ISystemService from '../../service/system';

const rootPath = os.platform() === 'win32' ? 'c:' : '/';

@injectable()
export default class SystemContreoller implements ISystemService {
  public fetch() {
    return new Promise<StandardError | System>(async (resolve, reject) => {
      try {
        const diskUsage = disk.checkSync(rootPath);
        const hostname = os.hostname();
        const platform = os.platform();
        const osType = os.type();
        const totalmem = diskUsage.total;
        const freemem = diskUsage.free;
        const uptime = os.uptime();
        const obj = { hostname, platform, osType, totalmem, freemem, uptime };
        resolve(new System(obj));
      } catch (err) {
        reject(new ControllerError(err.message));
      }
    });
  }
}

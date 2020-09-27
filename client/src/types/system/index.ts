export interface System {
  hostname: string;
  osType: string;
  platform: string;
  uptime: string;
  totalmem: string;
  freemem: string;
}

export type SystemState = System;

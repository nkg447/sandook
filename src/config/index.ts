interface IConfig {
  basePath: string;
  metaFile: string;
}

const config: IConfig = {
  basePath: `${process.env.HOME}/sandook`,
  metaFile: 'meta.json'
};

export default config;

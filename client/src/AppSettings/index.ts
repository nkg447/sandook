interface IAppSetting {
  server: {
    baseUrl: string;
  };
}

const prod: IAppSetting = {
  server: {
    baseUrl: window.location.origin
  }
};
const dev: IAppSetting = {
  server: {
    baseUrl: window.location.origin.replace(':3000', ':5000')
  }
};

export default process.env.NODE_ENV === 'production' ? prod : dev;

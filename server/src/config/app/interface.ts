enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

interface AppConfig {
  env: Environment;
  name: string;
  url: string;
  port: number;
}

export default AppConfig;

import * as EnvironmentJsonFile from './version.json';

export const environment = {
  production: true,
  apiBaseUrl: 'https://api-alexandrebrungiglio.fr/taiga',
  version: EnvironmentJsonFile.version,
};

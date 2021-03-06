import { resolve } from 'url';

const getUrl = (base: string, projectName?: string): string => {
  if (projectName) {
    return resolve(base, `./client/features?project=${projectName}`);
  }
  return resolve(base, './client/features');
};

export default getUrl;

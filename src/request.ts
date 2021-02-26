import { CustomHeaders } from './headers';

export interface RequestOptions {
  url: string;
  timeout?: number;
  headers?: CustomHeaders;
}

export interface GetRequestOptions extends RequestOptions {
  etag?: string;
  appName?: string;
  instanceId?: string;
}

export interface Data {
  [key: string]: any;
}

export interface PostRequestOptions extends RequestOptions {
  json: Data;
  appName?: string;
  instanceId?: string;
}

export const buildHeaders = (
  appName: string | undefined,
  instanceId: string | undefined,
  etag: string | undefined,
  contentType: string | undefined,
  custom: CustomHeaders | undefined,
): Record<string, string> => {
  const head: Record<string, string> = {};
  if (appName) {
    head['UNLEASH-APPNAME'] = appName;
    head['User-Agent'] = appName;
  }
  if (instanceId) {
    head['UNLEASH-INSTANCEID'] = instanceId;
  }
  if (etag) {
    head['If-None-Match'] = etag;
  }
  if (contentType) {
    head['Content-Type'] = contentType;
  }
  if (custom) {
    Object.assign(head, custom);
  }
  return head;
};

export const post = ({ url, appName, instanceId, headers, json }: PostRequestOptions) =>
  fetch(url, {
    method: 'POST',
    headers: buildHeaders(appName, instanceId, undefined, 'application/json', headers),
    body: JSON.stringify(json),
  });

export const get = ({ url, etag, appName, instanceId, headers }: GetRequestOptions) =>
  fetch(url, {
    method: 'GET',
    headers: buildHeaders(appName, instanceId, etag, undefined, headers),
  });

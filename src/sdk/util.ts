import { SdkExtension } from "./extension";
import { ArcSDK } from "./main";

export class ArcUtil extends SdkExtension {
  constructor(sdk: ArcSDK) {
    super(sdk, "Util");
  }

  public credToToken(username: string, password: string): string {
    const token = btoa(`${username}:${password}`);

    return token;
  }

  public getEndpointUrl(
    server: string = this.sdk._url as string,
    endpoint: string,
    params?: UrlParams
  ) {
    const serverSuffix =
      !server.endsWith("/") && !endpoint.startsWith("/") ? "/" : "";
    const paramStr = this.generateParams({ ac: this.sdk._ac, ...params });
    const url = `${server}${serverSuffix}${endpoint}${paramStr}`;

    return url;
  }

  public generateParams(params: UrlParams) {
    let str = "?";

    const entries = Object.entries(params);

    for (let i = 0; i < entries.length; i++) {
      str += `${entries[i][0]}=${entries[i][1]}&`;
    }

    return str;
  }
}

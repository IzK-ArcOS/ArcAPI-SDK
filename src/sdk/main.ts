import axios from "axios";
import { testConnection } from "../api/test";
import { ArcAuth } from "./auth";
import { ArcFS } from "./fs";
import { ArcUtil } from "./util";

export class ArcSDK {
  public _url: Nullable<string>;
  public _server: Nullable<string>;
  public _ac: Nullable<string>;
  public connected = false;
  public initialized = false;

  // EXTENSIONS
  public util: ArcUtil;
  public authStore: ArcAuth;
  public filesystem: ArcFS;

  constructor(server: string, authCode: string, cb: () => void) {
    if (!server) throw "ArcSDK: A server to connect to is required.";

    this._server = server;
    this._ac = authCode;

    this.init(cb);

    this.util = new ArcUtil(this);
    this.authStore = new ArcAuth(this);
    this.filesystem = new ArcFS(this);
  }

  private async init(cb: () => void) {
    if (this.initialized) return false;

    const test = await testConnection(
      this._server as string,
      this._ac as string
    );

    if (test === false) return false;

    this.initialized = true;
    this.connected = true;

    this._url = test;

    await cb();

    return true;
  }

  public async ApiGet(endpoint: string, params: UrlParams = {}) {
    const url = this.util.getEndpointUrl(this._url as string, endpoint, params);

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${this.authStore._token}` },
      });

      return { data: response.data, status: response.status };
    } catch {
      return { data: {}, status: -1 };
    }
  }
}

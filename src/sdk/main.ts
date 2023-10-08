import { testConnection } from "../api/test";
import { ArcAuth } from "./auth";
import { ArcFS } from "./fs";

export class ArcSDK {
  public _url: string;
  public _server: string;
  public _ac: string;
  public connected = false;
  public initialized = false;

  // EXTENSIONS
  public auth: ArcAuth;
  public fs: ArcFS;

  constructor(server: string, authCode?: string) {
    if (!server) throw "ArcSDK: A server to connect to is required.";

    this._server = server;
    this._ac = authCode;

    this.init();
  }

  private async init() {
    if (this.initialized) return false;

    const test = await testConnection(this._server as string, this._ac);

    if (test === false) return false;

    this.initialized = true;
    this.connected = true;

    this._url = test;

    this.auth = new ArcAuth(this);
    this.fs = new ArcFS(this);

    return true;
  }
}

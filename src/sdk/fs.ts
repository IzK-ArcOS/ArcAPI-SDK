import { FSQuota } from "../types";
import { SdkExtension } from "./extension";
import { ArcSDK } from "./main";

export class ArcFS extends SdkExtension {
  constructor(sdk: ArcSDK) {
    super(sdk, "FileSystem");
  }

  public async getQuota(): Promise<FSQuota> {
    const auth = this.sdk?.auth;

    if (!auth) return this.Error("Auth not initialized");
  }
}

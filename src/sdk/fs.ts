import axios from "axios";
import { SdkExtension } from "./extension";
import { ArcSDK } from "./main";

export class ArcFS extends SdkExtension {
  constructor(sdk: ArcSDK) {
    super(sdk, "FileSystem");
  }

  public async getQuota(): Promise<Nullable<FSQuota>> {
    if (!this.CheckAuth()) return;

    const response = await axios.get(
      this.sdk.util.getEndpointUrl(this.sdk._url!, "fs/quota"),
      { headers: { Authorization: `Bearer ${this.sdk.authStore._token}` } }
    );

    return response.data.data as FSQuota;
  }

  public async getDirectory(
    path: string
  ): Promise<Nullable<PartialUserDir> | false> {
    if (!this.CheckAuth()) return;

    const response = await this.sdk.ApiGet("fs/dir/get", { path: btoa(path) });

    if (response.status !== 200) return false;

    return response.data.data as PartialUserDir;
  }

  public async createDirectory(path: string): Promise<boolean> {
    if (!this.CheckAuth()) return false;

    const response = await this.sdk.ApiGet("fs/dir/create", {
      path: btoa(path),
    });

    if (response.status !== 200) return false;

    return response.data.valid;
  }
}

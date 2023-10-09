import axios from "axios";
import { SdkExtension } from "./extension";
import { ArcSDK } from "./main";

export class ArcAuth extends SdkExtension {
  public authenticated = false;
  public username: Nullable<string>;
  public password: Nullable<string>;
  public _token: Nullable<string>;

  constructor(sdk: ArcSDK) {
    super(sdk, "Auth");
  }

  public async loginWithPassword(username: string, password: string) {
    if (this.authenticated)
      return this.Error(
        "Already authenticated. Close current user authentication before opening another."
      );

    if (!this.sdk)
      return this.Error(`No SDK to use. Is this class initialized properly?`);

    try {
      const response = await axios.get(
        this.sdk.util.getEndpointUrl(this.sdk._url as string, "auth") as string,
        {
          auth: {
            username,
            password,
          },
        }
      );

      this.username = username;
      this.password = password;

      this._token = response.data.data.token;
      this.authenticated = true;

      return response.data.data.token;
    } catch (e) {
      return this.Error("Login failed");
    }
  }
}

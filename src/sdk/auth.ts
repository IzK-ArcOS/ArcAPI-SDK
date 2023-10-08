import axios from "axios";
import { SdkExtension } from "./extension";
import { ArcSDK } from "./main";

export class ArcAuth extends SdkExtension {
  public authenticated = false;
  public username: string;
  private password: string;
  private _token: string;

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
      const response = await axios.post(
        this.sdk._url as string,
        {},
        {
          headers: {
            Authorization: `Basic ${this.basicToken(username, password)}`,
          },
        }
      );

      this.username = username;
      this.password = password;

      this._token = response.data.data.token;
      this.authenticated = true;

      return response.data.data.token;
    } catch {
      return this.Error("Login failed");
    }
  }

  public basicToken(username: string, password: string) {
    return btoa(`${username}:${password}`);
  }
}

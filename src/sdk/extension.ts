import { ArcSDK } from "./main";

export class SdkExtension {
  sdk: ArcSDK;
  mod: string = "Extension";

  constructor(sdk: ArcSDK, mod: string) {
    this.mod = mod;
    this.sdk = sdk;
  }

  public Error(message: string) {
    throw `ArcSdk${this.mod}: ${message}`;
  }

  public CheckAuth() {
    if (
      !this.sdk.authStore ||
      !this.sdk.authStore.authenticated ||
      !this.sdk.authStore._token
    ) {
      this.Error("Auth not initialized.");

      return false;
    }

    return true;
  }
}

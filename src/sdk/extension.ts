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
}

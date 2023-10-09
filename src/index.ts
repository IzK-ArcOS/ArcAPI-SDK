import { ArcSDK } from "./sdk/main";

export * from "./sdk/auth";
export * from "./sdk/extension";
export * from "./sdk/fs";
export * from "./sdk/main";
export * from "./sdk/util";

(async () => {
  const sdk = new ArcSDK("community.arcapi.nl", "", async () => {
    await sdk.authStore.loginWithPassword("admin", "admin");

    console.log(await sdk.filesystem.getQuota());
    console.log(await sdk.filesystem.getDirectory("./"));
    console.log(sdk.authStore._token);
  });
})();

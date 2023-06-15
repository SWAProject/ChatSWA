import PocketBase from "pocketbase";

import { writable } from "svelte/store";

// export const pb = new PocketBase("https://chatswa.me");
export const pb = new PocketBase("http://170.187.185.17");

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log("authStore changed", auth);
  currentUser.set(pb.authStore.model);
});

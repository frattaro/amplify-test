import createCache from "@emotion/cache";

export default function createEmotionCache() {
  return createCache({ key: "amplify-test-team", prepend: true });
}

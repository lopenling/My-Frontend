import type { MetaObject } from "nuxt/schema";

export const buildHead = (meta: MetaObject) => {
  meta.title = meta.title ? `${meta.title} - Lopenling` : "Lopenling";
  useHead(meta);
};

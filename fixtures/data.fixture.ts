import { test as base } from "@playwright/test";

export const customTest = base.extend<{
  standard_user: { username: string; password: string };
}>({
  standard_user: {
    username: "standard_user",
    password: "secret_sauce",
  },
});

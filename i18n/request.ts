import { getRequestConfig } from "next-intl/server";
import fs from "fs";
import path from "path";

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = "en";

  const messagesDir = path.join(process.cwd(), "messages", locale);
  const files = fs
    .readdirSync(messagesDir)
    .filter((file) => file.endsWith(".json"));

  const messages = {};

  for (const file of files) {
    const fileContent = (await import(`../messages/${locale}/${file}`)).default;
    Object.assign(messages, fileContent);
  }

  return {
    locale,
    messages,
  };
});

import TagManager from "react-gtm-module";

export const devRoot = document.querySelector("#_reactRouter-v6-root");

export function flattenMessages(nestedMessages, prefix = "") {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});
}

export const getCookieValue = (name) => {
  return (
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
  );
};

export function initialTagManager(user, abbreviation) {
  const { accountId, email, name, userId, plan } = user;

  const language = getCookieValue("tmpl_lang") || "en";

  const defaultData = {
    userid: userId,
    account_id: accountId,
    application: "", // name of your application
    userType: "Customer",
    name,
    email,
    plan,
    language,
    plugin: abbreviation,
  };
  const tagManagerArgs = {
    gtmId: GTM_ID,
    dataLayer: defaultData,
  };

  TagManager.initialize(tagManagerArgs);
}

const basepath = window.location.pathname.includes("boilerplateapp")
  ? "/boilerplateapp"
  : "/boilerplate";

const page2 = `${basepath}/page2`,
page3 = `${basepath}/page3`;

export default { basepath, page2, page3};

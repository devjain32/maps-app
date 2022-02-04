const fs = require("fs");
var countiesArr = [];
fs.readFile("./us-counties-state.json", "utf8", (err, jsonString) => {
  const county = JSON.parse(jsonString);
  for (var i = 0; i < 5; i++) {
    for (var i = 0; i < county.features.length; i++) {
      //   console.log(county.features[i].properties.NAME);
      fs.appendFile(
        "./us-counties-list.json",
        `"` + county.features[i].properties.NAME + `", `,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  }
});

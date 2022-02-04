const fs = require("fs");
var countiesArr = new Array();
fs.readFile("./us-counties-light.json", "utf8", (err, jsonString) => {
  fs.readFile("./state-value.json", "utf8", (err, jsonString2) => {
    const county = JSON.parse(jsonString);
    const state = JSON.parse(jsonString2);
    for (var i = 0; i < county.features.length; i++) {
      let countyName = county.features[i].properties;
      let geometryValue = county.features[i].geometry;
      var stateName = state[county.features[i].properties.STATE];
      countyName.NAME = `${countyName.NAME}, ${stateName}`;
      var objectValue = {
        type: "Feature",
        properties: countyName,
        geometry: geometryValue,
      };
      fs.appendFile(
        "./us-counties-state.txt",
        JSON.stringify(objectValue) + ",",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
});

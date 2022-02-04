export function toggleCounty(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[],
  county: string,
  region: string
) {
  var index = counties.findIndex((value) => value.region === region);
  var countiesArr = counties[index].counties;
  if (countiesArr.includes(county)) {
    countiesArr.splice(countiesArr.indexOf(county), 1);
  } else {
    countiesArr.push(county);
  }
  var newCounties = counties;
  newCounties[index].counties = countiesArr;
  return newCounties;
}

export function getAllRegions(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[]
) {
  var regionsArr: string[] = [];
  counties.map((value) => regionsArr.push(value.region));
  return regionsArr;
}

export function addRegion(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[]
) {
  var regionNames = counties.map((c) => c.region);
  var regionNameTemp = "New Region 1";
  var found = false;
  if (regionNames.includes("New Region 1")) {
    var i = 2;
    while (found === false) {
      if (regionNames.includes(`New Region ${i}`)) {
        i += 1;
      } else {
        regionNameTemp = `New Region ${i}`;
        found = true;
      }
    }
  }
  var countiesObj = counties;
  countiesObj.push({
    region: regionNameTemp,
    color: {
      r: 241,
      g: 112,
      b: 19,
      a: 1,
    },
    counties: [],
  });
  return countiesObj;
}

export function changeRegionName(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[],
  region: string,
  name: string
) {
  var names = counties.map((c) => c.region);
  names.splice(names.indexOf(region), 1);
  if (names.includes(name)) {
    alert("This region name already exists");
  } else {
    var countiesObj = counties;
    var index = countiesObj.findIndex((x) => x.region === region);
    countiesObj[index].region = name;
    return countiesObj;
  }
}

export function changeColor(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[],
  region: string,
  color: any
) {
  var countiesObj = counties;
  countiesObj[counties.findIndex((v) => v.region === region)].color = color;
  return countiesObj;
}

export function deleteCounty(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[],
  region: string,
  county: string
) {
  var countiesObj = counties;
  var index = countiesObj.findIndex((c) => c.region === region);
  var countiesArr = countiesObj[index].counties;
  var indexCounty = countiesArr.indexOf(county);
  countiesArr.splice(indexCounty, 1);
  countiesObj[index].counties = countiesArr;
  return countiesObj;
}

export function deleteManyCounties(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[],
  countiesToDelete: string[],
  region: string
) {
  var countiesArr = counties;
  for (var i = 0; i < countiesToDelete.length; i++) {
    var index = countiesArr.findIndex((c) => c.region === region);
    var indexCounty = countiesArr[index].counties.indexOf(countiesToDelete[i]);
    countiesArr[index].counties.splice(indexCounty, 1);
  }
  // this.setState({ counties: countiesArr });
  return countiesArr;
}

export function addToRegion(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[],
  region: string,
  county: string
) {
  var countiesObj = counties;
  var index = countiesObj.findIndex((c) => c.region === region);
  countiesObj[index].counties.push(county);
  return countiesObj;
}

export function deleteRegion(
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[],
  region: string
) {
  var countiesObj = counties;
  var index = countiesObj.findIndex((c) => c.region === region);
  countiesObj.splice(index, 1);
  return countiesObj;
}

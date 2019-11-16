
 let groupsArray = [
    // {
    //     name: "JHS 185",
    //     latitude: 40.77485678097441,
    //     longitude: -73.8186225050414
    // },
    // {
    //     name: "JHS 190",
    //     latitude: 40.723242138054246,
    //     longitude: -73.85175430783214,
    // },
    // {
    //     name: "PS 149",
    //     latitude: 40.75523915299081,
    //     longitude: -73.87456694252899,
    // },
    // {
    //     name: "IS 88",
    //     latitude: 40.80259848358921,
    //     longitude: -73.95409668855494 ,
    // },
    // {
    //     name: "Norman Thomas HS (ECF)",
    //     latitude: 40.74643139547328,
    //     longitude: -73.98095024373315,
    // },
    // {
    //     name: "PS 289",
    //     latitude: 40.6738685119279,
    //     longitude: -73.94234931924015 ,
    // },
    // {
    //     name: "IS 88",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "IS 259",
    //     latitude: 40.62621310552556,
    //     longitude: -74.0147783416429 ,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },{
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },{
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
    // {
    //     name: "JHS",
    //     latitude: 723242138054246,
    //     longitude: -85175430783214,
    // },
];
// console.info(result);
// result.forEach(element => {
//     // let data =  {name: element.ec_name,
//     //                 latitude: element.the_geom[1],
//     //                 longitude: element.the_geom[0]};
//     console.log(data);
//  });

var fs = require('fs');
var results = JSON.parse(fs.readFileSync('fallout.json', 'utf8'));
console.log("aaa");
function grabDataFromFile(elem, index, array) {
    // Grab the data from the game object you need
    var shelterObj = {};
    shelterObj.name = elem.name;
    shelterObj.latitude = elem.latitude;
    shelterObj.longitude = elem.longitude;
    console.log(shelterObj);
    groupsArray += shelterObj;
}

module.exports = groupsArray;
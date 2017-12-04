const { Client } = require('pg');

const db = new Client({
  connectionString: 'postgres://lnpzytoztwnbdu:106e3de5d15291feb1e98814e943d2da50c3f88d2e76438d3e37321a347c868f@ec2-107-22-250-33.compute-1.amazonaws.com:5432/db6rsoddji4lk9',
  ssl: true,
});
db.connect();

function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

let building_coords = []
building_coords.push({building: "DeBartolo Hall", lat: 41.698523, long: -86.236334});
building_coords.push({building: "Mendoza College of Business", lat: 41.697225, long: -86.236154});
building_coords.push({building: "Fitzpatrick Hall of Eng.", lat: 41.699485, long: -86.237275});
building_coords.push({building: "DEPARTMENTAL"});
building_coords.push({building: "Stinson Remick Hall", lat: 41.697494, long: -86.237936});
building_coords.push({building: "Jordan Hall of Science", lat: 41.701088, long: -86.231924});
building_coords.push({building: "Pasquerilla Center", lat: 41.701919, long: -86.231478});
building_coords.push({building: "Geddes Hall", lat: 41.703088, long: -86.235316});
building_coords.push({building: "O&#39;Shaughnessy Hall", lat: 41.700642, long: -86.235821});
building_coords.push({building: "Coleman Morse Center", lat: 41.700682, long: -86.240487});
building_coords.push({building: "Jenkins and Nanovic Hall", lat: 41.695688, long: -86.237949});
building_coords.push({building: "Hammes Mowbray Hall", lat: 41.700682, long: -86.240487});
building_coords.push({building: "Flanner Hall", lat: 41.700642, long: -86.235821});
building_coords.push({building: "DeBartolo Performing Arts Ctr.", lat: 41.700642, long: -86.235821});
building_coords.push({building: "Corbett Family Hall", lat: 41.706028, long: -86.235064});
building_coords.push({building: "Grace Hall", lat: 41.705218, long: -86.234111});
building_coords.push({building: "Main Building", lat: 41.700642, long: -86.235821});
building_coords.push({building: "Galvin Life Science Center", lat: 41.700642, long: -86.235821});
building_coords.push({building: "Washington Hall", lat: 41.703251, long: -86.239105});
building_coords.push({building: "Hayes Healy Center", lat: 41.701210, long: -86.237540});
building_coords.push({building: "Haggar Hall", lat: 41.700642, long: -86.235821});
building_coords.push({building: "Nieuwland Science Hall", lat: 41.700642, long: -86.235821});
building_coords.push({building: "Bond Hall of Architecture", lat: 41.705089, long: -86.236892});
building_coords.push({building: "Riley Hall", lat: 41.700926, long: -86.236566});
building_coords.push({building: "Hesburgh Library", lat: 41.702566, long: -86.234184});
building_coords.push({building: "West Lake Hall", lat: 41.700610, long: -86.244972});
building_coords.push({building: "Malloy Hall", lat: 41.700987, long: -86.235197});
building_coords.push({building: "West Lake Annex", lat: 41.700610, long: -86.244972});
building_coords.push({building: "O&#39;Neill Hall of Music", lat: 41.697130, long: -86.234016});
building_coords.push({building: "Law School", lat: 41.698685, long: -86.237969});
building_coords.push({building: "Ricci Band Building", lat: 41.701356, long: -86.230762});

let building_distances = [];
let R = 6371e3; // metres

for(let i = 0; i < building_coords.length; i++) {
  for(let x = 0; x < building_coords.length; x++) {
    let building1 = building_coords[x];
    let building2 = building_coords[i];
    if(building1.building != building2.building) {
      let theta1 = toRadians(building1.lat);
      let theta2 = toRadians(building2.lat);
      let delta_theta = toRadians(building2.lat-building1.lat);
      let delta_lon = toRadians(building2.long-building1.long);
      let a = Math.sin(delta_theta/2) * Math.sin(delta_theta/2) +
              Math.cos(theta1) * Math.cos(theta2) *
              Math.sin(delta_lon/2) * Math.sin(delta_lon/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      let d = R * c;
      let miles = (d/1000)*0.6213712;
      building_distances.push({building1: building1.building, building2: building2.building, distance: miles});
      db.query('INSERT INTO distance_from (building1, building2, distance_miles) VALUES($1, $2, $3) ON CONFLICT DO NOTHING', [building1.building, building2.building, miles], (err, res) => {
        console.log("here");
        if (err) {
          console.log(err);
        }
        if (res) {
          console.log(res);
        }
      })
    }
  }
}

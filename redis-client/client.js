const redis = require('redis');
const client = redis.createClient();
module.exports = client;

// const { promisify } = require("util");
// const obj = {
//     name:"shivam"
// }
// client.set("pasd","qqq");
// const lasync = promisify(client.lrange).bind(client);
// const get = promisify(client.get).bind(client);

// const foo = async ()=>{
//     const x = await lasync("shivam",0,-1);
//     let arr=[]
//     for(p of x){
//         const q = await get(p);
//         arr.push(q);
//     }
//     console.log(arr);
// }

// foo();
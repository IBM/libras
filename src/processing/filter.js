"use strict";


const fs = require("fs");
const a = require("./data/log");

let c = [];

let aMap = {};
for(let i =0 ; i < a.length; i++)
{
	let item = a[i];
	aMap[item.id] = item;
}

for(let k in aMap)
{
	if(aMap[k].outputLibras )
	{
		c.push(aMap[k]);
	}
}

fs.writeFileSync("data/filter.json", JSON.stringify(c, null, 2));

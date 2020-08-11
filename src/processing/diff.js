"use strict";


const fs = require("fs");
const a = require("./data/log");
const b = require("./data/clean").data;

let c = [];

let aMap = {};
for(let i =0 ; i < a.length; i++)
{
	let item = a[i];
	aMap[item.id] = item;
}

let bMap = {};
for(let i =0 ; i < b.length; i++)
{
	let item = b[i];
	bMap[item.id] = item;
}


for(let k in aMap)
{
	if(!aMap[k].outputLibras && !bMap[k].outputLibras)
	{
		c.push(aMap[k]);
	}
}

fs.writeFileSync("data/diff.json", JSON.stringify(c, null, 2));

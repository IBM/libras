"use strict";

const a = require("../../data/log");

const id = process.argv[2];

const full = !!process.argv[3];

console.log(id);

let aMap = {};
for(let i =0 ; i < a.length; i++)
{
	let item = a[i];
	aMap[item.id] = item;
}


let item = aMap[id];

// console.log(JSON.stringify(item.outputExemplo.syntax, null, 2));
// console.log(JSON.stringify(item.outputLibras.syntax, null, 2));

function print(data)
{
	// console.log(data.syntax.tokens);

	let tokens = data.syntax.tokens;

	let phrase = "";
	let parts = "";
	for(let i = 0; i < tokens.length; i++)
	{
		let t = tokens[i];
		// phrase += t.text + ( t.lemma && t.lemma !== t.text ? `(${t.lemma})`: "" )  + "\t";
		phrase += t.text + "\t";
		parts += t.part_of_speech + "\t";
		
	}

	let spos = data.semantic_roles;

	let arr = [];

	for(let i = 0; i < spos.length; i++)
	{
		let spo = spos[i];
		arr.push([spo.subject.text, spo.action.verb.text, spo.object.text]);
	}

	
	console.log(phrase);
	console.log(parts);
	console.log(arr);
	console.log("====");
}

if(full)
{
	console.log(JSON.stringify(item, null, 2))
}
console.log("> Example");
print(item.outputExemplo);
console.log("> Libras");
print(item.outputLibras);

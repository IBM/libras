"use strict";

const data = require("./data/compiled");
const fs	= require("fs");
const generateHash = require("../services/nlu").generateHash;

function buildTextMap(tokens, textMap)
{
	for(let i = 0; i < tokens.length; i++)
	{
		let part = "";

		let wordsSet = {};
		let partOfSpeech = tokens[i].part_of_speech;

		let text = tokens[i].lemma || tokens[i].text;

		if(!textMap.hasOwnProperty(partOfSpeech) )
		{
			wordsSet = {};
			textMap[partOfSpeech] = wordsSet;
		}
		else
		{
			wordsSet = textMap[partOfSpeech];
		}

		if(!wordsSet.hasOwnProperty(text))
		{
			let id = Object.keys(wordsSet).length;

			part = partOfSpeech + id;
			wordsSet[text] = part;
		}
		else
		{
			part = wordsSet[text];
		}
	}

}



let table = {};
for(let i = 0; i < data.length; i++)
{
	let item = data[i];

	let textMap = {};

	buildTextMap(item.outputLibras.syntax.tokens, textMap);
	buildTextMap(item.outputExemplo.syntax.tokens, textMap);

	let librasHash = generateHash(item.outputLibras.syntax.tokens, textMap);
	let exemploHash = generateHash(item.outputExemplo.syntax.tokens, textMap);

	// console.log(textMap);

	if(!table.hasOwnProperty(librasHash))
	{
		table[librasHash] = {};
	}

	table[librasHash][exemploHash] = {syntax: item.outputExemplo.syntax, libras: item.libras};

	// console.log(i, item.id,  librasHash, exemploHash);
}


for(let k in table)
{
	let v = table[k];

	if(v.length > 1)
	{
		console.log(v);
	}
}
// console.log(table);

fs.writeFileSync("data/table.json", JSON.stringify(table, null, 2));


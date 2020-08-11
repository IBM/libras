
let data = require("./data/filter");

const fs = require("fs");

let out = [];


function createSet(tokens)
{
	let tokenSet = new Set();
	for(let j = 0; j < tokens.length; j++)
	{
		let text = tokens[j].lemma || tokens[j].text;
		tokenSet.add(text.toUpperCase());
	}

	return tokenSet;
}


for(let i = 0; i < data.length; i++)
{
	let item = data[i];

	if(!item.outputLibras.syntax || !item.outputExemplo.syntax)
	{
		continue;
	}

	let librasTokens = item.outputLibras.syntax.tokens;
	let exemploTokens = item.outputExemplo.syntax.tokens;

	let librasTokenSet = createSet(librasTokens);
	let exemploTokenSet = createSet(exemploTokens);


	let willContinue = true;

	for(let k of librasTokenSet)
	{
		if(!exemploTokenSet.has(k))
		{
			willContinue = false;
			continue;
		}
	}

	if(!willContinue)
	{
		continue;
	}

	out.push(item);
}

// console.log(out);

fs.writeFileSync("data/compiled.json", JSON.stringify(out, null, 2), "utf-8");
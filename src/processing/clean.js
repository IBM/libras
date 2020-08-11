
"use strict";

const fs = require("fs");

let all = require("../Dados/accessibilidade_brasil");

let data = all.data;


for(let i = 0 ; i < data.length; i++)
{
	let entry = data[i];

	if(entry.libras)
	{
		let words = entry.libras.split(/\s/);

		for(let j = 0; j < words.length ; j++)
		{
			let word = words[j];

			if(word.search("@") >= 0)
			{
				if(word === "SE@" )
				{
					words[j] = "SEU";
				}
				else if(word === "ME@" )
				{
					words[j] = "MEU";
				}
			}

			words[j] = word.replace("@", "A");
		}

		entry.cleanLibras = words.join(" ");
	}

}

fs.writeFileSync("data/clean.json", JSON.stringify(all, null, 2));


console.log("Sentences", data.length);


// console.log(data);
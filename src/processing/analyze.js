
const credentials = require("./credentials")

const fs = require("fs");

let data = require("./data/diff");

const translate = require("../services/nlu").nluTransform;

async function main()
{
	
	for(let i = 0; i < data.length; i++)
	{
		let entry = data[i];

		try
		{
			let outputLibras = await translate(entry.cleanLibras, credentials);
			let outputExemplo = await translate(entry.exemplo, credentials);

			entry.outputLibras = outputLibras;
			entry.outputExemplo = outputExemplo;
		}
		catch(err)
		{
			console.log(err);
		}

		console.log(JSON.stringify(entry, null, 2));
		console.log(",");

		// entry.out = "ok";
	}

	fs.writeFileSync("data/diff_output.json", JSON.stringify(data, null, 2));


}

main();
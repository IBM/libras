"use strict";

const nlu = require("./nlu");


class Libras2PtService
{
	constructor(credentials, librasDb)
	{
		this.credentials = credentials;
		this.librasDb = librasDb;
	}
	
	async translate(input)
	{
		let nluData = await nlu.nluTransform(input, this.credentials);

		let tokens = nluData.syntax.tokens;

		let textMap = {};

		nlu.buildTextMap(tokens, textMap);
		let hash = nlu.generateHash(tokens, textMap);

		let data = await this.librasDb.getLibrasTranslation(hash);
		
		let out = [];
		if(data)
		{
			let englishPhrases = nlu.reconstruct(tokens, data, hash);

			if(englishPhrases.length > 0)
			{
				for(let i = 0; i < englishPhrases.length; i++)
				{
					let ptPhrases = await nlu.translateToPortuguese(englishPhrases[i], this.credentials);

					for(let i = 0; i < ptPhrases.length; i++)
					{
						out.push(ptPhrases[i].translation);
					}
				}				
			}
		}

		if(out.length > 0)
		{
			return out;
		}

		// Throw an error if could not translate the sentence
		throw new Error(`Could not translate the sentence: "${input}"`);

		// console.error("Could not translate this sentence.")
	}


}

module.exports = Libras2PtService;
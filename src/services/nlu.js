
'use strict';

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');

const { IamAuthenticator } = require('ibm-watson/auth');


// Main function
async function nluTransform(input, credentials)
{
	let out = {};
	// NLU Model
	const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
		version: '2019-07-12',
		authenticator: new IamAuthenticator({
			apikey: credentials.NLU_API_KEY,
		}),
		url: credentials.NLU_URL,
	});


	// TRANSLATOR Model
	const languageTranslator = new LanguageTranslatorV3({
	version: '2018-05-01',
	authenticator: new IamAuthenticator({
			apikey: credentials.TRANSLATOR_API_KEY,
		}),
		url: credentials.TRANSLATOR_URL,
	});

	// Translation
	const toTranslate = {
		text: input,
		modelId: "pt-en"
	}

	let translationResult = await languageTranslator.translate(toTranslate);

	let translation = translationResult.result.translations[0].translation;

	out.input = input;
	out.translation = translation;

	// NLU

	const analyzeParams = {
		text: translation,
		features: {
			syntax: {
				sentences: true,
				tokens: {
					lemma: true,
					part_of_speech: true
				}
			},
			semantic_roles : {}
		}
	};


	const analysis = await naturalLanguageUnderstanding.analyze(analyzeParams);

	out.semantic_roles = analysis.result.semantic_roles;
	
	out.syntax = analysis.result.syntax;

	return out;
}

async function translateToPortuguese(text, credentials)
{
	// TRANSLATOR Model
	const languageTranslator = new LanguageTranslatorV3({
	version: '2018-05-01',
	authenticator: new IamAuthenticator({
			apikey: credentials.TRANSLATOR_API_KEY,
		}),
		url: credentials.TRANSLATOR_URL,
	});

	// Translation
	const toTranslate = {
		text: text,
		modelId: "en-pt"
	}

	let translationResult = await languageTranslator.translate(toTranslate);

	let translations = translationResult.result.translations;

	return translations;
}

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

function generateHash(tokens, textMap)
{
	let out = "";

	for(let i = 0; i < tokens.length; i++)
	{
		let part = "";
		let partOfSpeech = tokens[i].part_of_speech;

		let text = tokens[i].lemma || tokens[i].text;
		
		part = textMap[partOfSpeech][text];
		
		out += part + "_";
	}

	return out;
}

function reconstruct(tokens, data, hash = null)
{
	hash = hash || generateHash(tokens);

	let map = {}

	let librasTerms = hash.split(/_/);

	for(let i = 0; i < librasTerms.length; i++)
	{
		let t = librasTerms[i];

		map[t] = {idx : i, text: tokens[i]}; 
	}

	let out = [];

	let ptHashes = Object.keys(data);

	for(let i = 0 ;i < ptHashes.length; i++)
	{
		let hash = ptHashes[i];
		let ptTerms = hash.split(/_/);

		let words = [];
		let syntax = data[hash].syntax;

		for(let j = 0; j < ptTerms.length; j++)
		{
			let part = ptTerms[j];

			if(!part)
			{
				continue;
			}
			if(map.hasOwnProperty(part))
			{
				words.push(tokens[map[part].idx].text);
			}
			else
			{
				words.push(syntax.tokens[j].text);
			}
		}

		out.push(words.join(" "));
	}

	return out;
}

exports.buildTextMap = buildTextMap;
exports.reconstruct = reconstruct;
exports.generateHash = generateHash;
exports.nluTransform = nluTransform;
exports.translateToPortuguese = translateToPortuguese;
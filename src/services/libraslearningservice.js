"use strict";


const nlu = require("./nlu");
const MD5 = require("md5.js");




class LibrasLearningService
{
	constructor(credentials, librasDB)
	{
		this.librasDB = librasDB;
		this.credentials = credentials;
	}


	async learnTranslation(libras, pt)
	{
		let librasData = await nlu.nluTransform(libras, this.credentials);
		let ptData = await nlu.nluTransform(pt, this.credentials);

		let textMap = {};
		nlu.buildTextMap(librasData.syntax.tokens, textMap);
		nlu.buildTextMap(ptData.syntax.tokens, textMap);

		const librasHash = nlu.generateHash(librasData.syntax.tokens, textMap);
		const ptHash = nlu.generateHash(ptData.syntax.tokens, textMap);

		const librasMd5 = new MD5().update(`LB_${librasHash}`).digest("hex");
		const ptMd5 = new MD5().update(`PT_${ptHash}`).digest("hex");

		librasData.hash = librasHash;
		ptData.hash = ptHash;

		librasData.md5 = librasMd5;
		ptData.md5 = ptMd5;
		
		await this.librasDB.addLibrasTranslation(librasData, ptData);

		return {libras: librasData, pt: ptData};
	}

	async getAllTranslations()
	{
		
	}


}

module.exports = LibrasLearningService;
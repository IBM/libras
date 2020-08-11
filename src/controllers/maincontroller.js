"use strict";

class MainController
{
	constructor(libras2ptService, librasLearningService)
	{
		this.libras2ptService = libras2ptService;
		this.librasLearningService = librasLearningService;
	}

	async postLibrasTranslation(params)
	{
		let input = params.body;
		return this.libras2ptService.translate(input);
	}

	async getLibras()
	{
		return this.librasLearningService.getTranslations();
	}

	async putLibrasData(params)
	{
		let input = params.body;

		let out = [];

		for(let i = 0; i < input.length; i++)
		{
			let item = input[i];

			let res = await this.librasLearningService.learnTranslation(item.libras, item.pt);
			out.push(res);
		}

		return out;

	}
}

module.exports = MainController;
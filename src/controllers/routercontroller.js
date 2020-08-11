"use strict";

const ExpressWrapper = require("ninja-util").ExpressWrapper;

class RouterController
{
	constructor(webServer, mainController)
	{
		let app = new ExpressWrapper(webServer.getApp());

		let secret = process.env.SERVER_SECRET;

		if(secret)
		{
			app.setAuthMode(ExpressWrapper.AUTH_SECRET, secret);
		}

		app.post("/libras/translation", (params) => mainController.postLibrasTranslation(params));

		app.put("/libras/data", (params) => mainController.putLibrasData(params));

		app.delete("/libras/data", (params) => mainController.deleteLibrasData(params));

		app.get("/libras", (params) => mainController.getLibras(params));

	}
}

module.exports = RouterController;
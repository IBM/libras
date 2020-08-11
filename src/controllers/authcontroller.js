"use strict";

const ExpressWrapper = require("ninja-util/expresswrapper");

class AuthController
{
	constructor(routerController)
	{
		let expressWrapper = routerController.expressWrapper;

		let secret = process.env.HKBASE_AUTH_SECRET || "5d7b8db8-b136-4b56-b436-51ae9c5e22de"; // Random uuid...

		if(secret)
		{
			expressWrapper.setAuthMode(ExpressWrapper.AUTH_SECRET, secret);
		}
	}
}

module.exports = AuthController;
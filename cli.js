"use strict";

const input = process.argv[2];

const Libras2PtService = require("./src/services/libras2ptservice");


const credentials = require("./credentials");


let mainService = new Libras2PtService(credentials);


async function exec(input)
{
	let translation = await mainService.translate(input);

	console.log(translation);
}

exec(input);



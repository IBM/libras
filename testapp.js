

const credentials = require("./credentials");

const input = process.argv[2];

const translate = require("./src/services/nlu").nluTransform;


translate(input, credentials).then((data) =>
{
	console.log(JSON.stringify(data, null, 2));
}).catch((err) =>
{
	console.error(err);
});


# libras2pt

A service that translates libras text to portuguese

## Installation

### Install dependencies

Default npm install:

```
npm install
```

## Setup


### HKBase

The application expect a `setup.json` file in the root, which contains setup configuration to acces an `HKBase`. It should have this structure:

```json
{
	"hkbase": <HKBASE_URL>,
	"repository": <REPOSITORY_NAME>,
	"options": {
		"authToken": <TOKEN>
	}
}
```

### Watson services

We use two services from IBM cloud, Watson NLU (https://www.ibm.com/watson/services/natural-language-understanding/) and Watson Translator (https://www.ibm.com/watson/services/language-translator/). Those services are used to process the texts and get the structure that will be mapped to a translation. You should have an account on IBM Cloud and this services up and running. Then, from the service settings page, get the credentials to fill the following json format and save in the root with the name `credentials.json`:

```json
{
	"TRANSLATOR_URL": <URL>,
	"TRANSLATOR_API_KEY": <API_LEY>,
	"NLU_URL": <URL>,
	"NLU_API_KEY": <API_LEY>
}
```

## Run

After all set, then:

```
npm start
```

It should run on port `3005`. To change, set a environment variable:

```
export PORT=<YOU_DESIRED_PORT>
```
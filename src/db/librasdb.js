
"use strict";


// const HKLib = require("hklib");
const HKLib = require("hklib");
const HKDatasource = HKLib.HKDatasource;
const GraphBuilder = HKLib.GraphBuilder;
const Node	   = HKLib.Node;
const Link	   = HKLib.Link;

const Scheme = require("./scheme");
const Promisify = require("ninja-util").Promisify;

class LibrasDB
{
	constructor(dbInfo)
	{
		this.data = require("../../data/table");

		this.db = new HKDatasource(dbInfo.hkbase, dbInfo.repository, dbInfo.options);

	}

	async addLibrasTranslation(librasData, ptData)
	{

		let gb = new GraphBuilder();

		gb.addFactRelation(Scheme.goesToTerm);
		gb.addInheritanceRelation(Scheme.instanceOf);

		gb.addNode(Scheme.PortugueseExpression, Scheme.TboxContext);
		gb.addNode(Scheme.LibrasExpression, Scheme.TboxContext);

		let librasId = `libras_${librasData.md5}`;
		let ptId = `pt_${ptData.md5}`;

		gb.addContext(librasId, Scheme.TranslationsContexts);
		gb.addContext(ptId, Scheme.TranslationsContexts);

		gb.addFact(ptId, Scheme.translates, librasId, Scheme.TranslationsContexts);
		gb.addInheritance(ptId, Scheme.subclassOf, Scheme.PortugueseExpression, Scheme.TranslationsContexts);
		gb.addInheritance(librasId, Scheme.subclassOf, Scheme.LibrasExpression, Scheme.TranslationsContexts);


		let librasEntity = gb.getEntity(librasId);
		let ptEntity = gb.getEntity(ptId);

		this._convertEntityProperties(librasData, librasEntity);
		this._convertEntityProperties(ptData, ptEntity);

		this._generateSyntaxGraph(ptData.hash, gb, Scheme.PortugueseSyntaxGraphContext);
		this._generateSyntaxGraph(librasData.hash, gb, Scheme.LibrasSyntaxGraphContext);



		let entities = gb.getEntities(true);

		return new Promise((resolve, reject) =>
		{
			this.db.addEntities(entities, (err, data) =>
			{
				if(!err)
				{
					resolve(data);
				}
				else
				{
					reject(err);
				}
			})
		})
	}

	async getLibrasTranslation(librasHash)
	{

		try
		{
			let hyql = `
			select 
				${Scheme.PortugueseExpression} 
			where ${Scheme.PortugueseExpression} ${Scheme.translates} ${Scheme.LibrasExpression} and 
				${Scheme.LibrasExpression}.hash = "${librasHash}"
			`;

			let result = await Promisify.exec(this.db, this.db.query, hyql);

			let out = {};
			for(let i = 0; i < result.length; i++)
			{
				let entry = result[i];

				if(entry.properties && entry.properties.data)
				{
					let ptData = JSON.parse(entry.properties.data);


					out[ptData.hash] = ptData;;
				}
			}

			return out;
		}
		catch(err)
		{
			console.log(err);
		}
	}

	async getAllTranslations()
	{

	}

	_convertEntityProperties(data, entity)
	{
		entity.setProperty("data", JSON.stringify(data));
		entity.setProperty("hash", data.hash);
		entity.setProperty("translation", data.translation);
		entity.setProperty("input", data.input);
	}

	_generateSyntaxGraph(hash, gb, graphContext)
	{
		let tokens = hash.split(/_/ig);

		for(let i = 0; i < tokens.length -1 ; i++)
		{
			let t1 = tokens[i];
			let t2 = tokens[i+1];

			if(!t1 || !t2)
			{
				continue;
			}

			gb.addNode(t1, Scheme.SyntaxTermsContext);
			gb.addNode(t2, Scheme.SyntaxTermsContext);
			gb.addContext(graphContext);


			{
				let inst1 = new Link();
				inst1.connector = Scheme.instanceOf;
				inst1.id = `${t1}_${Scheme.instanceOf}_${Scheme.SyntaxTerm}`;
				inst1.addBind(gb.subjectLabel, t1);
				inst1.addBind(gb.objectLabel, Scheme.SyntaxTerm);
				inst1.parent = Scheme.SyntaxTermsContext;

				gb.addEntity(inst1);
			}

			{
				let inst2 = new Link();
				inst2.connector = Scheme.instanceOf;
				inst2.id = `${t2}_${Scheme.instanceOf}_${Scheme.SyntaxTerm}`;
				inst2.addBind(gb.subjectLabel, t2);
				inst2.addBind(gb.objectLabel, Scheme.SyntaxTerm);
				inst2.parent = Scheme.SyntaxTermsContext;
				gb.addEntity(inst2);
			}

			{

				let link = new Link();
				link.connector = Scheme.goesToTerm;
				link.id = `${t1}_${Scheme.goesToTerm}_${t2}`;
				link.addBind(gb.subjectLabel, t1);
				link.addBind(gb.objectLabel, t2);
				link.parent = graphContext;
				gb.addEntity(link);
			}

			// let l1 = gb.addFact(t1, Scheme.goesToTerm, t2, graphContext);

			// l1.id = 
			// if(t)
			// {

			// 	gb.addFact(t1, Scheme.goesToTerm, t2, graphContext);
				
			// }
		}
	}
}

module.exports = LibrasDB;
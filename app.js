"use strict";


const LibrasDb 				= require("./src/db/librasdb");

const RouterController 		= require("./src/controllers/routercontroller");
const MainController 		= require("./src/controllers/maincontroller");

const WebServer 			= require("./src/server/webserver");

const Libras2PtService 		= require("./src/services/libras2ptservice");
const LibrasLearningService = require("./src/services/libraslearningservice");


const credentials 			= require("./credentials");


const setup 				= require("./setup");


let librasDb 					= new LibrasDb(setup);
let libras2ptService 			= new Libras2PtService(credentials, librasDb);
let librasLearningService 		= new LibrasLearningService(credentials, librasDb);
let webserver 					= new WebServer(process.env.PORT || null);
const maincontroller 			= new MainController(libras2ptService, librasLearningService);
let routerController 			= new RouterController(webserver, maincontroller);

webserver.start();
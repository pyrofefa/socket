var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var pdf = require('pdfkit');
var fs = require('fs');
var fecha =require('fecha');
const exec = require('child_process').exec;

var arreglo= [];

const log4js = require('log4js');
	log4js.configure({
		appenders: { registro: { type: 'file', filename: 'registro.log' } },
		categories: { default: { appenders: ['registro'], level: 'info' } }
	});

const logger = log4js.getLogger('registro');


app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(express.static('public'));
io.on('connection', function(socket) 
{  
	//checar conexion
	console.log('Alguien se ha conectado con Sockets');

	//checar desconexion
	socket.on('disconnect', function(){
		console.log('Alguien se ha desconectado');
	});
	/*Pagos*/
	socket.on('pago',function(imprimir){

		logger.info('Creando PDF: '+ imprimir +' de pago o carta de no adeudo');
		
		var myDoc = new pdf;
		myDoc.pipe(fs.createWriteStream('node.pdf'));
		
		myDoc.font("Times-Roman",12)
			.image('img/logo_aguaa.png',75,10,{
				 width: 60, 
				 height: 60
			})

			.moveDown(0.5)
			.text("Agua de Hermosillo a:",50)
			.moveDown(0.5);

		myDoc.font("Times-Roman",12)
			.text(fecha.format(new Date(), 'D-MMMM-YY'),75)
			.moveDown(0.5);	

		myDoc.font("Times-Roman",12)
			.text(fecha.format(new Date(), 'hh:mm:ss A'),70)
			.moveDown(0.5);	
				
		myDoc.font('Times-Roman',12)
			.fontSize(48)
 			.text(imprimir,{
				align: 'left'
		});

 		myDoc.font('Times-Roman',12)
			.text('Pago o carta de no adeudo',45);

		myDoc.end();

		logger.info('Terminando de crear PDF: '+ imprimir +' de pagos o carta de no adeudo');

	});
	/*aclaraciones y otros*/
	socket.on('aclaracion',function(imprimir){

		logger.info('Creando PDF: '+ imprimir +' de tramites o aclaraciones');
		
		var myDoc = new pdf;
		myDoc.pipe(fs.createWriteStream('node.pdf'));
		
		myDoc.font("Times-Roman",12)
			.image('img/logo_aguaa.png',75,10,{
				 width: 60, 
				 height: 60
			})

			.moveDown(0.5)
			.text("Agua de Hermosillo a:",50)
			.moveDown(0.5);

		myDoc.font("Times-Roman",12)
			.text(fecha.format(new Date(), 'D-MMMM-YY'),75)
			.moveDown(0.5);	

		myDoc.font("Times-Roman",12)
			.text(fecha.format(new Date(), 'hh:mm:ss A'),70)
			.moveDown(0.5);	
				
		myDoc.font('Times-Roman',12)
			.fontSize(48)
 			.text(imprimir,{
				align: 'left'
		});

 		myDoc.font('Times-Roman',12)
			.text('Trámites o Aclaraciones',45);

		myDoc.end();

		logger.info('Terminando de crear PDF: '+ imprimir +' de Trámites aclaraciones');
	});
	/*fin de aclaraciones y otros*/
	socket.on('imprimir', function($numero){
		exec('acrowrap.exe /acceptlicense /t "C:\\imprimir\\node.pdf" "BIXOLON"', (error, stdout, stderr) => {
			logger.info('Imprimiendo numero: '+$numero.letra+''+$numero.numero+'');
			if (error) {
    			logger.info(`exec error: ${error}`);
    			return;
  			}
  				logger.info(`stdout: ${stdout}`);
  				logger.info(`stderr: ${stderr}`);
		});
	});
});
server.listen(8080, function() {  
 console.log("Servidor corriendo en http://localhost:8080");
});
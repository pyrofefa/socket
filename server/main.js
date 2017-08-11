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

		logger.info('Creando PDF: '+ imprimir +' de pagos');
		
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
			.text('Pago',45);

		myDoc.end();

		logger.info('Terminando de crear PDF: '+ imprimir +' de pagos');

	});
	/*tramites*/
	socket.on('pdf',function(imprimir){

		logger.info('Creando PDF: '+ imprimir +' de tramites');
		
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
			.text('Trámites',45);

		myDoc.end();

		logger.info('Terminando de crear PDF: '+ imprimir +' de tramites');

	});
	
	/*Fin de pagos y tramites*/
	/*aclaraciones y otros*/
	socket.on('alto_consumo',function(imprimir){

		logger.info('Creando PDF: '+ imprimir +' de aclaraciones');
		
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
			.text('Aclaraciones y otros',45);

		myDoc.end();

		logger.info('Terminando de crear PDF: '+ imprimir +' de aclaraciones');
	});
	/*fin de aclaraciones y otros*/
	socket.on('imprimir', function($numero){
		exec('acrowrap.exe /acceptlicense /t "C:\\imprimir\\node.pdf" "BIXOLON"', (error, stdout, stderr) => {
			logger.info('Imprimiendo numero: '+$numero.letra+''+$numero.numero+' de aclaraciones');
			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  				console.log(`stdout: ${stdout}`);
  				console.log(`stderr: ${stderr}`);
		});
	});
});
server.listen(8080, function() {  
 console.log("Servidor corriendo en http://localhost:8080");
});
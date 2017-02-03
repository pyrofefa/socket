var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var pdf = require('pdfkit');
var fs = require('fs');
var fecha =require('fecha');
const exec = require('child_process').exec;

var arreglo= [];

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
	//console.log('Alguien se ha conectado con Sockets');

	//checar desconexion
	socket.on('disconnect', function(){
		console.log('Alguien se ha desconectado');
	});
	/*Pagos*/
	socket.on('pago',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Recibo',45);

		myDoc.end();
	});
	socket.on('pagoconvenio',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Convenio',45);

		myDoc.end();
	});
	socket.on('pagocarta',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Carta de no adeudo',45);

		myDoc.end();
	});

	/*tramites*/
	socket.on('pdf',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('2 ó más trámites',45);	
		
		myDoc.end();
	});
	socket.on('contrato',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Contrato',45);

		myDoc.end();
	});
	socket.on('convenio',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Convenio',45);
		
		myDoc.end();
	});
	socket.on('cambio',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Cambio de nombre',45);

		myDoc.end();
	});
	socket.on('carta',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Carta de no adeudo',45);

		myDoc.end();
	});
	socket.on('factibilidad',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Factibilidad de servicios',45);	
		
		myDoc.end();
	});
	/*Fin de pagos y tramites*/
	/*aclaraciones y otros*/
	socket.on('alto_consumo',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Alto consumo (con y sin medidor)',45);
		
		myDoc.end();
	});
	socket.on('reconexion',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Reconexión de servicio',45);
		
		myDoc.end();
	});
	socket.on('error_lectura',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Error en lectura',45);
		
		myDoc.end();
	});
	socket.on('no_toma_lectura',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('No toma de lectura',45);
		
		myDoc.end();
	});
	socket.on('no_entrega',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('No entrega de recibo',45);
		
		myDoc.end();
	});
	socket.on('cambio_tarifa',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Cambio de tarifa',45);
		
		myDoc.end();
	});
	socket.on('solicitud',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Solicitud de medidor',45);
		
		myDoc.end();
	});

	socket.on('otros',function(imprimir){
		console.log('Creando PDF: '+ imprimir);
		
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

		myDoc.font('Times-Roman',8)
			.text('Otros trámites',45);

		myDoc.end();
	});
	/*fin de aclaraciones y otros*/
	socket.on('imprimir', function(){
		exec('java -jar Imprimir.jar  BIXOLON node.pdf', (error, stdout, stderr) => {

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
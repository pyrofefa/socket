var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var pdf = require('pdfkit');
var Printer = require('printer');
var fs = require('fs');
var path = require('path');
var fecha =require('fecha');
var pdf2png= require('pdf2png');

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

	socket.on('turno', function(turno){
        console.log('alguien a solicitado un turno: ' + turno);
        io.emit('turno', turno);
	});

	socket.on('caja',function(caja){
		console.log('una caja se ha desocupado: ' + caja);
		io.emit('caja', caja);
	});
	socket.on('pdf',function(imprimir){
		console.log('Creando PDF');
		var myDoc = new pdf;
		myDoc.pipe(fs.createWriteStream('node.pdf'));
		
		myDoc.font("Times-Roman",12)
			.image('img/logo_agua.png')
			.moveDown(0.5)
			.text("Agua de Hermosillo a:")
			.moveDown(0.5);

		myDoc.font("Times-Roman",12)
			.text(fecha.format(new Date(), 'D-MMMM-YY'))
			.moveDown(0.5);	

		myDoc.font("Times-Roman",12)
			.text(fecha.format(new Date(), 'hh:mm:ss A'))
			.moveDown(0.5);	
				
		myDoc.font('Times-Roman',12)
			.fontSize(48)
			.moveDown(0.5)
			.text(imprimir,{
				align: 'left'
			});
		myDoc.end();

		pdf2png.convert("node.pdf", function(resp)
		{
   				if(!resp.success)
    			{
        			console.log(" Ha Ocurrido un error al convertir pdf en png: " + resp.error);
        			return;
    			}
    				console.log("Convirtiendo PDF en PNG");
    
    			fs.writeFile("node.png", resp.data, function(err) {
        			if(err) 
        			{
            			console.log(err);
        			}
        			else 
        			{
            			console.log("Archivo Salvado");
        			}
    			});
		});	
	});
	socket.on('imprimir', function(){
		
		console.log('Imprimiendo Numero');
		
		var filename = "node.pdf";
		var printername = process.argv[3];
		
		console.log('platform:', process.platform);
		console.log('try to print file: ' + filename);


		if( process.platform != 'win32') 
		{
  			Printer.printFile({filename:filename,
    		Printer: process.env[3], 
    		
    		success:function(jobID){
      				console.log("sent to printer with ID: "+jobID);
    			},
    			error:function(err){
      				console.log(err);
    			}
  			});
		} 
		else 
		{
  			Printer.printDirect({
  				data:fs.readFileSync(filename),
    			printer: process.env[3], 
    			
    			success:function(jobID){
      				console.log("sent to printer with ID: "+jobID);
    			},
    			error:function(err){
      				console.log(err);
    			}
  			});
		}
	});
});
server.listen(8080, function() {  
  console.log("Servidor corriendo en http://localhost:8080");
});
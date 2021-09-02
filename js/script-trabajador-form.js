
function serializeForm() {
    let trabajador = {
        "idTrabajador":$("#idTrabajador").val(),
        "nombre": $("#nombre").val(),
        "cedula": $("#cedula").val(),
        "direccion": $("#direccion").val(),
        "telefono":$("#telefono").val(),
        "email":$("#email").val(),
        "sexo":$("#sexo").val(),
        "gradoAcademico":$("#gradoAcademico").val(),
        "titulo":$("#titulo").val(),
        "tipo":$("#tipoTrabajador").val()
    };
    return trabajador;
}

// funcion para poner datos
function set(trabajador){
    
    $("#idTrabajador").val(trabajador.idTrabajador);
    $("#nombre").val(trabajador.nombre);
    $("#cedula").val(trabajador.cedula);
    $("#direccion").val(trabajador.direccion);
    $("#telefono").val(trabajador.telefono);
    $("#email").val(trabajador.email);
    $("#sexo").val(trabajador.sexo);
    $("#gradoAcademico").val(trabajador.gradoAcademico);
    $("#titulo").val(trabajador.titulo);
    $("#tipoTrabajador").val(trabajador.tipo);
}

// funcion que guarda la info


function save() {
    // validar 
    var trabajador = serializeForm();
    console.log(trabajador);

    let requestBody=JSON.stringify(trabajador);
    console.log(requestBody);
    // Se utiliza JQuery para enviar datos al Backend 
    if(trabajador.idTrabajador==0){
        $.ajax({
            type: "POST", //verbo de HTTP a utilizar 
            url: "http://localhost:8080/trabajador/create", // Direccion para realizar la peticion HTTP
            data: requestBody,// El contenido Body de la petición HTTP
            contentType: "application/json",
            crossDomain: true,
            dataType: "json",
            succes : function(response){
                console.log(response);
                alert("El trabajador a sido creado correctamente");
            },
            error: function (err) {
                console.error(err);
            },
            complete: function (result, textStatus) {
                console.log(result);
                if(result.status==201){
                   // window.location.href="index.html";
                }  
            }
            // complete: function (result, textStatus) {
            //   console.log(result);
            //   if(result.status==0){
            //       alert(result.statusText);
            //   }  
            // }
        });
    } else{
        //Update
        let id = trabajador.idTrabajador;
        $.ajax({        
            type: "PUT", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/trabajador/update/" + id, //Dirección para realizar la petición HTTP
            data: requestBody, //El contenido Body de la petición HTTP                
            contentType : "application/json",
            crossDomain: true,
            dataType: "json",
            success : function(response){
                console.log(response);             
		    },
		    error : function(err){
			    console.error(err);
		    }            
        });
    }
    
}

function retrieve(){       
    let txtBuscar = $("#txtBuscar").val();
    if(txtBuscar === "") return;

    let id = parseInt(txtBuscar); //Transforma el txtBuscar en un número entero
    console.log(id);
    if(isNaN(id)){
        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/trabajador/retrieve?nombre=" + txtBuscar, //Dirección para realizar la petición HTTP        
            contentType : "application/json",
            dataType : "json",
            success : function(response){
                console.log(response);    
                //El response contiene el objeto Variedad consultado
                set(response);                            
		    },
		    error : function(err){
			    console.error(err);
		    },
            complete : function(xhr, textStatus){
                if(xhr.status == 404)
                {
                    alert(xhr.responseText);                    
                }
            }
        });
    }
    else{
        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/trabajador/retrieve/" + id, //Dirección para realizar la petición HTTP        
            contentType : "application/json",
            dataType : "json",
            success : function(response){
                console.log(response);    
                //El response contiene el objeto Variedad consultado
                set(response);                            
		    },
		    error : function(err){
			    console.error(err);
		    },
            complete : function(xhr, textStatus){
                if(xhr.status == 404)
                {
                    alert(xhr.responseText);                    
                }
            }
        });
    }
}

// 
$(function(){

    // $("#frmTrabajador").validate();

    $('#frmTrabajador').on('submit', function() {
        var form = document.getElementById('frmTrabajador');
        var a = form.checkValidity();
        console.log(a);
        if(a){
            save();
        }
    });

    $("#btnBuscar").click(function(){        
        retrieve();
    }); 

});
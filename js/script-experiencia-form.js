function serializeForm() {
    let experiencia = {
        "idExperiencia":$("#IdExperiencia").val(),
        "empresaAnterior": $("#empresaAnt").val(),
        "motivoSalidaTrabajoAnterior": $("#motivo").val(),
        "puestoDesempeñado": $("#puestoDes").val(),
        "fecchaIngreso":$("#fechaIngreso").val(),
        "fechaSalida":$("#fechaSalida").val()
    };
    return experiencia;
}

function set(experiencia){
    
    $("#IdExperiencia").val(experiencia.idExperiencia);
    $("#empresaAnt").val(experiencia.empresaAnterior);
    $("#motivo").val(experiencia.motivoSalidaTrabajoAnterior);
    $("#puestoDes").val(experiencia.puestoDesempeñado);
    $("#fechaIngreso").val(experiencia.fecchaIngreso);
    $("#fechaSalida").val(experiencia.fechaSalida);
    
}


// Funcion que guarda la info
function save() {
   // validar 
   var experiencia = serializeForm();
   console.log(experiencia);

   let requestBody=JSON.stringify(experiencia);
   console.log(requestBody);
   // Se utiliza JQuery para enviar datos al Backend 
   if(experiencia.idExperiencia==0){
       $.ajax({
           type: "POST", //verbo de HTTP a utilizar 
           url: "http://localhost:8080/experiencia/create", // Direccion para realizar la peticion HTTP
           data: requestBody,// El contenido Body de la petición HTTP
           contentType: "application/json",
           crossDomain: true,
           dataType: "json",
           succes : function(response){
               console.log(response);
               alert("La experiencia a sido creada correctamente");
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
       let id = experiencia.idExperiencia;
       $.ajax({        
           type: "PUT", //Verbo de HTTP a utilizar
           url: "http://localhost:8080/experiencia/update/" + id, //Dirección para realizar la petición HTTP
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

// Funcion para Buscar
function retrieve(){       
    let txtBuscar = $("#txtBuscar").val();
    if(txtBuscar === "") return;

    let id = parseInt(txtBuscar); //Transforma el txtBuscar en un número entero
    console.log(id);
    if(isNaN(id)){
        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/experiencia/retrieve?nombre=" + txtBuscar, //Dirección para realizar la petición HTTP        
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
            url: "http://localhost:8080/experiencia/retrieve/" + id, //Dirección para realizar la petición HTTP        
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

    // $("#frmExperiencia").validate();

    $('#frmExperiencia').on('submit', function() {
        var form = document.getElementById('frmExperiencia');
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
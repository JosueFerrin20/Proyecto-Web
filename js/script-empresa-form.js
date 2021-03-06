function serializeForm() {
    let empresa = {
        "idEmpresa":$("#IdEmpresa").val(),
        "nombre": $("#nombre").val(),
        "descripcion": $("#descripcion").val(),
        "telefono":$("#telefono").val(),
        
    };
    return empresa;
}

function set(empresa){
    
    $("#IdEmpresa").val(empresa.idEmpresa);
    $("#nombre").val(empresa.nombre);
    $("#descripcion").val(empresa.descripcion);
    // $("#direccion").val(empresa.direccion);
    $("#telefono").val(empresa.telefono);
    
}


// Funcion que guarda la info
function save() {
   // validar 
   var empresa = serializeForm();
   console.log(empresa);

   let requestBody=JSON.stringify(empresa);
   console.log(requestBody);
   // Se utiliza JQuery para enviar datos al Backend 
   if(empresa.idEmpresa==0){
       $.ajax({
           type: "POST", //verbo de HTTP a utilizar 
           url: "http://localhost:8080/empresa/create", // Direccion para realizar la peticion HTTP
           data: requestBody,// El contenido Body de la petición HTTP
           contentType: "application/json",
           crossDomain: true,
           dataType: "json",
           succes : function(response){
               console.log(response);
               alert("La empresa a sido creada correctamente");
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
       let id = empresa.idEmpresa;
       $.ajax({        
           type: "PUT", //Verbo de HTTP a utilizar
           url: "http://localhost:8080/empresa/update/" + id, //Dirección para realizar la petición HTTP
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
            url: "http://localhost:8080/empresa/retrieve?nombre=" + txtBuscar, //Dirección para realizar la petición HTTP        
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
            url: "http://localhost:8080/empresa/retrieve/" + id, //Dirección para realizar la petición HTTP        
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

    // $("#frmEmpresa").validate();

    $('#frmEmpresa').on('submit', function() {
        var form = document.getElementById('frmEmpresa');
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
// 
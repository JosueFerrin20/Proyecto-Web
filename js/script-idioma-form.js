function serializeForm() {
    let idioma = {
        "idIdioma":$("#IdIdioma").val(),
        "nombre": $("#nombre").val(),
        "nivel": $("#nivel").val()
        
    };
    return idioma;
}

function set(idioma){
    
    $("#IdIdioma").val(idioma.idIdioma);
    $("#nombre").val(idioma.nombre);
    $("#nivel").val(idioma.nivel);

}


// Funcion que guarda la info
function save() {
   // validar 
   var idioma = serializeForm();
   console.log(idioma);

   let requestBody=JSON.stringify(idioma);
   console.log(requestBody);
   // Se utiliza JQuery para enviar datos al Backend 
   if(idioma.idIdioma==0){
       $.ajax({
           type: "POST", //verbo de HTTP a utilizar 
           url: "http://localhost:8080/idioma/create", // Direccion para realizar la peticion HTTP
           data: requestBody,// El contenido Body de la petición HTTP
           contentType: "application/json",
           crossDomain: true,
           dataType: "json",
           succes : function(response){
               console.log(response);
               alert("El idioma a sido creado correctamente");
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
       let id = idioma.idIdioma;
       $.ajax({        
           type: "PUT", //Verbo de HTTP a utilizar
           url: "http://localhost:8080/idioma/update/" + id, //Dirección para realizar la petición HTTP
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
            url: "http://localhost:8080/idioma/retrieve?nombre=" + txtBuscar, //Dirección para realizar la petición HTTP        
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
            url: "http://localhost:8080/idioma/retrieve/" + id, //Dirección para realizar la petición HTTP        
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

    // $("#frmIdioma").validate();

    $('#frmIdioma').on('submit', function() {
        var form = document.getElementById('frmIdioma');
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
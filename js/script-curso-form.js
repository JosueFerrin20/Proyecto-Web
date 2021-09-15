function serializeForm() {
    let curso = {
        "idCurso":$("#IdCurso").val(),
        "nombre": $("#nombre").val(),
        "tipo":$("#tipo").val(),
        "acreditacion":$("#acreditacion").val(),
        "horas":$("#horas").val(),
        "descripcion": $("#descripcion").val(),
        
        
    };
    return curso;
}

function set(curso){
    
    $("#IdCurso").val(curso.idCurso);
    $("#nombre").val(curso.nombre);
    $("#tipo").val(curso.tipo);
    $("#acreditacion").val(curso.acreditacion);
    $("#horas").val(curso.horas);
    $("#descripcion").val(curso.descripcion);
    
    
}


// Funcion que guarda la info
function save() {
   // validar 
   var curso = serializeForm();
   console.log(curso);

   let requestBody=JSON.stringify(curso);
   console.log(requestBody);
   // Se utiliza JQuery para enviar datos al Backend 
   if(curso.idCurso==0){
       $.ajax({
           type: "POST", //verbo de HTTP a utilizar 
           url: "http://localhost:8080/curso/create", // Direccion para realizar la peticion HTTP
           data: requestBody,// El contenido Body de la petición HTTP
           contentType: "application/json",
           crossDomain: true,
           dataType: "json",
           succes : function(response){
               console.log(response);
               alert("El curso a sido creado correctamente");
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
       let id = curso.idCurso;
       $.ajax({        
           type: "PUT", //Verbo de HTTP a utilizar
           url: "http://localhost:8080/curso/update/" + id, //Dirección para realizar la petición HTTP
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
            url: "http://localhost:8080/curso/retrieve?nombre=" + txtBuscar, //Dirección para realizar la petición HTTP        
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
            url: "http://localhost:8080/curso/retrieve/" + id, //Dirección para realizar la petición HTTP        
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

    // $("#frmCurso").validate();

    $('#frmCurso').on('submit', function() {
        var form = document.getElementById('frmCurso');
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
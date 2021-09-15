function retrieve(id){
    $.ajax({
        type: "GET", //verbo de HTTP a utilizar
        url: "http://localhost:8080/idioma/retrieve/"+id,
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
            let idioma=response;

            $("#txtIdIdioma").val(idioma.idIdioma);
            $("#lblNombre").html(idioma.nombre);
            $("#spNivel").html(idioma.nivel);
            
        },
        error : function(err){
            console.error(err);
        }
    });
}

function show(lista) {
   $("#tblIdiomas").empty();
   lista.forEach(idioma => {
       $("#tblIdiomas").append('<tr>'
            + '<td>' + idioma.nombre + '</td>'
            + '<td>' + idioma.nivel + '</td>'
            
            + '<td>' 
            + '<button onclick="retrieve('+idioma.idIdioma +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdIdioma">Consultar</button>'
            + '</td>'
        +'</tr>'
       );
   }); 
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/idioma/list", //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);
            //response trae la lista de variedades como un Arreglo JSON
            show(response);
		},
		error : function(err){
			console.error(err);
		},
        complete: function(xhr, textStatus) {            
            if(xhr.status == 404){
                alert(xhr.responseText);
            }
            if(xhr.status == 500){
                alert(xhr.responseText);
            }
        }       
    });
}



function del() {
    let id=$("#txtIdIdioma").val();
    $.ajax({
        type: "DELETE", //verbo de HTTP a utilizar
        url: "http://localhost:8080/idioma/delete/"+id,
        contentType: "application/json",
        dataType: "json",
        success : function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
        },
        error : function(err){
            console.error(err);
        },
        // complete : function(xhr,textStatus){
        //     if(xhr.status=200){
        //         alert(xhr.responseText);
        //         list();
        //     }
        // }
    });
}

$(document).ready(function() {
    list();
    $("#btnEliminar").click(function(){
        del();
    });
})
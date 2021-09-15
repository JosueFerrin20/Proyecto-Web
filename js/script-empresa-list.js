function retrieve(id){
    $.ajax({
        type: "GET", //verbo de HTTP a utilizar
        url: "http://localhost:8080/empresa/retrieve/"+id,
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
            let empresa=response;
            $("#txtIdEmpresa").val(empresa.idEmpresa);
            $("#lblNombre").html(empresa.nombre);
            $("#spDescripcion").html(empresa.descripcion);
            // $("#spDirecction").html(empresa.direccion);
            $("#spTelefono").html(empresa.telefono);
            
        },
        error : function(err){
            console.error(err);
        }
    });
}

function show(lista) {
   $("#tblEmpresas").empty();
   lista.forEach(empresa => {
       $("#tblEmpresas").append('<tr>'
            + '<td>' + empresa.nombre + '</td>'
            + '<td>' + empresa.descripcion + '</td>'
            // + '<td>' + empresa.direccion + '</td>'
            + '<td>' + empresa.telefono + '</td>'
            
            + '<td>' 
            + '<button onclick="retrieve('+empresa.idEmpresa +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdEmpresa">Consultar</button>'
            + '</td>'
        +'</tr>'
       );
   }); 
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/empresa/list", //Dirección para realizar la petición HTTP        
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
    let id=$("#txtIdEmpresa").val();
    $.ajax({
        type: "DELETE", //verbo de HTTP a utilizar
        url: "http://localhost:8080/empresa/delete/"+id,
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
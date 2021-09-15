function retrieve(id){
    $.ajax({
        type: "GET", //verbo de HTTP a utilizar
        url: "http://localhost:8080/curso/retrieve/"+id,
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
            let curso=response;
            $("#txtIdCurso").val(curso.idCurso);
            $("#lblNombre").html(curso.nombre);
            $("#spTipo").html(curso.tipo);
            $("#spAcreditacion").html(curso.acreditacion);
            $("#spHoras").html(curso.horas);
            $("#spDescripcion").html(curso.descripcion);
        },
        error : function(err){
            console.error(err);
        }
    });
}

function show(lista) {
   $("#tblCursos").empty();
   lista.forEach(curso => {
       $("#tblCursos").append('<tr>'
            + '<td>' + curso.nombre + '</td>'
            + '<td>' + curso.tipo + '</td>'
            + '<td>' + curso.acreditacion + '</td>'
            + '<td>' + curso.horas + '</td>'
            + '<td>' + curso.descripcion + '</td>'
            + '<td>' 
            + '<button onclick="retrieve('+curso.idCurso +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdCurso">Consultar</button>'
            + '</td>'
        +'</tr>'
       );
   }); 
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/curso/list", //Dirección para realizar la petición HTTP        
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
    let id=$("#txtIdCurso").val();
    $.ajax({
        type: "DELETE", //verbo de HTTP a utilizar
        url: "http://localhost:8080/curso/delete/"+id,
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
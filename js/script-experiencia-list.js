function retrieve(id){
    $.ajax({
        type: "GET", //verbo de HTTP a utilizar
        url: "http://localhost:8080/experiencia/retrieve/"+id,
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
            let experiencia=response;
            $("#txtIdExperiencia").val(experiencia.idExperiencia);
            $("#lblNombre").html(experiencia.empresaAnterior);
            $("#spMotivo").html(experiencia.motivoSalidaTrabajoAnterior);
            $("#spPuestoDes").html(experiencia.puestoDesempeñado);
            $("#spFechaIn").html(experiencia.fechaIngreso);
            $("#spFechaSal").html(experiencia.fechaSalida);
            
        },
        error : function(err){
            console.error(err);
        }
    });
}

function show(lista) {
   $("#tblExperiencias").empty();
   lista.forEach(experiencia => {
       $("#tblExperiencias").append('<tr>'
            + '<td>' + experiencia.empresaAnterior + '</td>'
            + '<td>' + experiencia.motivoSalidaTrabajoAnterior + '</td>'
            + '<td>' + experiencia.puestoDesempeñado + '</td>'
            + '<td>' + experiencia.fechaIngreso + '</td>'
            + '<td>' + experiencia.fechaSalida + '</td>'
            + '<td>' 
            + '<button onclick="retrieve('+experiencia.idExperiencia +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdExperiencia">Consultar</button>'
            + '</td>'
        +'</tr>'
       );
   }); 
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/experiencia/list", //Dirección para realizar la petición HTTP        
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
    let id=$("#txtIdExperiencia").val();
    $.ajax({
        type: "DELETE", //verbo de HTTP a utilizar
        url: "http://localhost:8080/experiencia/delete/"+id,
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
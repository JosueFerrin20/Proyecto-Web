function retrieve(id){
    $.ajax({
        type: "GET", //verbo de HTTP a utilizar
        url: "http://localhost:8080/trabajador/retrieve/"+id,
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
            let trabajador=response;
            console.log(trabajador.idTrabajador);

            $("#lblNombre").html(trabajador.nombre);
            $("#spCedula").html(trabajador.cedula);
            $("#spDirecction").html(trabajador.direccion);
            $("#spTelefono").html(trabajador.telefono);
            $("#spEmail").html(trabajador.email);
            $("#spSexo").html(trabajador.sexo);
            $("#spGradoAcademico").html(trabajador.gradoAcademico);
            $("#spTitulo").html(trabajador.titulo);
            $("#spTipo").html(trabajador.tipo);
            $("#txtIdTrabajador").val(trabajador.idTrabajador);
            
        },
        error : function(err){
            console.error(err);
        }
    });
}

function show(lista) {
   $("#tblTrabajadores").empty();
   lista.forEach(trabajador => {
       console.log(trabajador.idTrabajador)
       $("#tblTrabajadores").append('<tr>'
            + '<td>' + trabajador.nombre + '</td>'
            + '<td>' + trabajador.cedula + '</td>'
            + '<td>' + trabajador.direccion + '</td>'
            + '<td>' + trabajador.telefono + '</td>'
            + '<td>' + trabajador.email + '</td>'
            + '<td>' + trabajador.sexo + '</td>'
            + '<td>' + trabajador.gradoAcademico + '</td>'
            + '<td>' + trabajador.titulo + '</td>'
            + '<td>' + trabajador.tipo + '</td>'
            + '<td>' 
            + '<button onclick="retrieve('+trabajador.idTrabajador +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdTrabajador">Consultar</button>'
            + '</td>'
        +'</tr>'
       );
   }); 
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/trabajador/list", //Dirección para realizar la petición HTTP        
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
    let id=$("#txtIdTrabajador").val();
    console.log(id);
    $.ajax({
        type: "DELETE", //verbo de HTTP a utilizar
        url: "http://localhost:8080/trabajador/delete/"+id,
        contentType: "application/json",
        dataType: "json",
        success : function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
        },
        error : function(err){
            console.error(err);
        },
        complete : function(xhr,textStatus){
            if(xhr.status=200){
                alert(xhr.responseText);
                list();
            }
        }
    });
}

$(document).ready(function() {
    list();
    $("#btnEliminar").click(function(){
        del();
    });
})
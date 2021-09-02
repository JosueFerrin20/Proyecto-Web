function retrieve(id){
    $.ajax({
        type: "GET", //verbo de HTTP a utilizar
        URL: "https://localhost:8080/trabajador/retrieve"+id,
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
            let trabajador=response;
            $("#lblNombre").html(trabajador.nombre);
            $("#spCedula").html(trabajador.cedula);
            $("#spDirecction").html(trabajador.direccion);
            $("#spTelefono").html(trabajador.telefono);
            $("#spEmail").html(trabajador.email);
            $("#spSexo").html(trabajador.sexo);
            $("#spGradoAcademico").html(trabajador.gradoAcademico);
            $("#spTitulo").html(trabajador.titulo);
            $("#spTipo").html(trabajador.tipo);
            $("#txtIdTrabajador").html(trabajador.idTrabajador);
        },
        error : function(err){
            console.error(err);
        }
    });
}

function show(lista) {
   $("#tblTrabajadores").empty();
   lista.forEach(trabajador => {
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

function list() {
    //Utilizacion de JQuery AJAX para enviar al backend
    $.ajax({
        type: "GET", //verbo de HTTP a utilizar
        URL: "https://localhost:8080/trabajador/list",
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            // response trae la lista de trabajadores como un arreglo JSON 
            show(response);
        },
        error : function(err){
            console.error(err);
        },
        complete : function(result, textStatus){
            if(result.status=404){
                alert(xhr.responseText);
            }
            if(result.status=500){
                alert(xhr.responseText);
            }
        }
    });
}

function del() {
    let id=$("#txtIdTrabajador").val();
    $.ajax({
        type: "DELETE", //verbo de HTTP a utilizar
        URL: "https://localhost:8080/trabajador/delete/"+id,
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
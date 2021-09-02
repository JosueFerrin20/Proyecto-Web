function serializeForm() {
    let empresa = {
        "nombre": $("#nombre").val(),
        "descripcion": $("#descripcion").val(),
        "telefono":$("#telefono").val(),
        "email":$("#email").val(),
        "sexo":$("#sexo").val(),
        "gradoAcademico":$("#gradoAcademico").val(),
        "titulo":$("#titulo").val(),
        "tipo":$("#tipoTrabajador").val()
    };
    return empresa;
}
// funcion que guarda la info
function save() {
    let dataform =serializeForm();
    console.log(dataform);
    let requestBody=JSON.stringify(dataform);
    console.log(requestBody);
    // Se utiliza JQuery para enviar datos al Backend 
    $.ajax({
        type: "POST", //verbo de HTTP a utilizar 
        url: "https://localhost:8080/trabajador/create", // Direccion para realizar la peticion HTTP
        data: requestBody,// El contenido Body de la petición HTTP
        contentType: "application/json",
        crossDomain: true,
        dataType: "json",
        succes : function(response){
            console.log(response);
            alert("La empresa a sido creado correctamente");
        },
        error: function (err) {
            console.error(err);
        },
        complete: function (result, textStatus) {
            console.log(result);
            if(result.status==201){
               // window.location.href="index.html";
            }  
        },
        complete: function (result, textStatus) {
          console.log(result);
          if(result.status==404){
              alert(result.responseText);
          }  
        }
    });
}
// 
$(function(){
    $("#btnGuardar").clic(function () {
        save();
    });
});
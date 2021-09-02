// Utilice JQuerry para tareas generales del frontend
var menu= '<nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example"> <div class="container-xl"> <a class="navbar-brand" href="#">WorkMyPex</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarsExample07XL"> <ul class="navbar-nav me-auto mb-2 mb-lg-0"> <li class="nav-item"> <a class="nav-link active" aria-current="page" href="index.html">Home</a> </li> <li class="nav-item"> <a class="nav-link" href="#">Link</a> </li> <li class="nav-item"> <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> </li> <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-bs-toggle="dropdown" aria-expanded="false">Trabajador</a> <ul class="dropdown-menu" aria-labelledby="dropdown07XL"> <li><a class="dropdown-item" href="trabajador-form.html">Nuevo</a></li> <li><a class="dropdown-item" href="trabajador-list.html">Listado</a></li> <li><a class="dropdown-item" href="#">Something else here</a></li> </ul> </li> </ul> <form> <input class="form-control" type="text" placeholder="Search" aria-label="Search"> </form> </div> </div> </nav>';
var footer= '<ul class="nav justify-content-center border-bottom pb-3 mb-3"> <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li> <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li> <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li> <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li> <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li> </ul> <p class="text-center text-muted">&copy; 2021 Company, Inc</p>';

function loadMenu() {
    $('header').html(menu);
    $('footer').html(footer);
}

$(function() {
    
    console.log('Página lista');
    loadMenu();
  });

  
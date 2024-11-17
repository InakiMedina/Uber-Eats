code = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
	<a class="navbar-brand" href="./home.html">
		<img
      src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/46190b63764575.5abb892616e9e.jpg"
      class="rounded-circle"
      width="5%"/>
    Inicio</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/about_us.html">Sobre nosotros</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Productos
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/cat_A.html">Japonesa</a></li>
            <li><a class="dropdown-item" href="/cat_B.html">Italiana</a></li>
            <li><a class="dropdown-item" href="/cat_C.html">Mexicana</a></li>
          </ul>
        </li>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </ul>
    </div>
    <i class="fa-solid fa-user ms-2"></i>
    <strong>
      <a
        class="navbar-brand me-2"
        data-bs-target="#LoginModal"
        data-bs-toggle="modal"
        class="MainNavText"
        id="MainNavHelp"
        href="#LoginModal"
        >Ingresar
      </a>
    </strong>
    <a href="./shopping_cart.html">
      <i class="fa-solid fa-cart-shopping me-2 md-2 navbar-brand"> </i>
    </a>

    <a
      data-bs-target="#WarningModal"
      data-bs-toggle="modal"
      class="navbar-brand"
      href="#WarningModal"
    >
      <i class="fa-solid fa-right-from-bracket md-2"> </i>
    </a>
  </div>
</nav>
	  <div class="modal fade" id="warningModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Estas seguro de que quieres cerrar?</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-succes" data-bs-dismiss="modal">Regresar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
      </div>
	  </div>
    <div class="modal" tabindex="-1" id="LoginModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Iniciar Sesión</h5>
          </div>
          <div class="modal-body">
		  <h6> Correo </h6>
			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="Ingresar tu correo" aria-label="Recipient's username" aria-describedby="basic-addon2">
				<div class="input-group-append">
					<span class="input-group-text h-100" id="basic-addon2">
						<i class="fas fa-user fa-xl"></i>
					</span>
				</div>
			</div>
		  	<h6> Contraseña </h6>
			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="Ingresa tu contraseña" aria-label="Recipient's username" aria-describedby="basic-addon2">
				<div class="input-group-append">
					<span class="input-group-text h-100" id="basic-addon2">
						<i class="fas fa-key fa-xl"></i>
					</span>
				</div>
			</div>
          </div>
          <div class="d-flex flex-column bd-highlight mb-3 modal-footer justify-content-center">
            <button type="button" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
			      <p> ¿No tienes cuenta? <b> <a
            href="RegisterModal"
            data-bs-target="#RegisterModal"
            data-bs-toggle="modal"> Registrate aqui </a> </b> </p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="RegisterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Registrarse</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col">
                  <input type="text" placeholder="Nombre">
                </div>
                <div class="col">
                  <input class="w-100" type="text" placeholder="Apellidos">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col">
                  <input class="w-100"  type="text" placeholder="Tu Correo">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col">
                  <input class="w-100"  type="text" placeholder="Contraseña">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col">
                  <input class="w-100"  type="text" placeholder="Confirmar Contraseña">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Registrarse</button>
          </div>
        </div>
      </div>
    </div>`


navbar.innerHTML = code;
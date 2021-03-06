//crea un dialog box para el sign in
//cambia la vista



// DICE SI HAY ALGUIEN LOGUEADO O NO
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
    console.log("estas logueado");


  } else {
    // NO User is signed in.

    $(".login-cover").show();

	//alert("NO estas logueado....");
	var dialog = document.querySelector('#loginDialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    console.log("no estahay nadie logueado");

  }
});



/* SIGN UP PROCESS */

$("#signUpBtn").click(
  function() {
		
		var email = $("#loginEmail").val();
		var password = $("#loginPassword").val();
    //quitar
		var nombre = $("#nombre").val();
      	var apellido = $("#apellido").val();
      	var cedula = $("#cedula").val();
     	var telefono = $("#telefono").val();



		//si es distinto de null ambos campos muestra que esta cargando y esconde el boton
		if(email != "" && password != ""){
			$("#loginProgress").hide();
			$("#loginBtn").show();

			firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
				var user = firebase.auth().currentUser;

				//
				firebase.database().ref('usuario/'+user.uid).set({
					Nombre: nombre,
			        Apellido: apellido,
			        Telefono: telefono,
		            Cedula: cedula,
		            Correo: email

				}).then(function(){
					console.log("User signup Successful");
					window.location.replace("index.html");

				}, function(error){
					//alert(error.code);
				});

				console.log("User signup Successful");
				$("#loginError").show().text(error.message);
				
				$("#loginProgress").hide();
				$("#loginBtn").show();

			});
		}
	});



/* LOGIN PROCESS */


$("#loginBtn").click(
	function() {
		var email = $("#loginEmail").val();
		var password = $("#loginPassword").val();


		//si es distinto de null ambos campos muestra que esta cargando y esconde el boton
		if(email != "" && password != ""){
			$("#loginProgress").hide();
			$("#loginBtn").show();

			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
				
				console.log("User Login Successful");
				$("#loginError").show().text(error.message);
				
				$("#loginProgress").hide();
				$("#loginBtn").show();

			});
		}
	});

/* LOGOUT PROCESS */

$("#signOutBtn").click(
	function(){

		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  console.log("User Logout Successful");
		  window.location.replace("loginAdmin.html");

		}, function(error) {
		  // An error happened.

		  alert(error.message);
		});



	});

//datos
$("#submitBtn").click(
  function() {
    //quitar
		var nombre = $("#nombre").val();
      	var edad = $("#edad").val();
      	var historia = $("#historia").val();
     	var adoptado = $("#adoptado").val();

		//si es distinto de null ambos campos muestra que esta cargando y esconde el boton

				var user = firebase.auth().currentUser;
				firebase.database().ref('usuario/'+user.uid+'/mascota/').set({
					nombre: nombre,
			        edad: edad,
			        historia: historia,
		            adoptado: adoptado,
				}).then(function(){
					console.log("mascota agregada");
					window.location.replace("index.html");

				}, function(error){
					alert(error.code);
				});

				console.log("User signup Successful");
	});

$("#formularioUsuarioBtn").click(
  function() {
    //quitar
		var nombre = $("#nombre").val();
      	var apellido = $("#apellido").val();
      	var cedula = $("#cedula").val();
     	var telefono = $("#telefono").val();
     	var email = $("#email").val();
     	//guardo el valor de la cedula para que sea leido en otras vistas
     	localStorage.setItem("cedula",cedula);

/*
     	var ref = firebase.database().ref('usuario/'+cedula).once('value').then(function(snapshot){
     		var verCed = snapshot.val();
     		if(verCed == null)
     		{
     			window.location.replace("indexP.html");
     		}
     		else
     		{
     			window.location.replace("gracias.html");
     		}
     	});*/


     



		//si es distinto de null ambos campos muestra que esta cargando y esconde el boton
				firebase.database().ref('Entrada/'+cedula).set({
					Nombre: nombre,
			        Apellido: apellido,
			        Cedula: cedula,
		            Telefono: telefono,
		            Email: email,
		            Estatus: 'Pendiente'
				}).then(function(){
					console.log("participante agregado");
					//window.location = "/registroMascota?id="+cedula;
					window.location.replace("registroMascota.html");

				}, function(error){
					alert(error.code);
				});

				console.log("User signup Successful");
	});

$("#formularioMascotaBtn").click(
function() {
    //quitar
		var nombreM = $("#nombreM").val();
      	var edad = $("#edad").val();
      	var historia = $("#historia").val();
     	var adoptado = $("#adoptado").val();
     	var cedula=localStorage.getItem("cedula");

		//si es distinto de null ambos campos muestra que esta cargando y esconde el boton

				//var user = firebase.auth().currentUser;
				firebase.database().ref('Entrada/'+cedula+'/Mascota').set({
					NombreM: nombreM,
			        Edad: edad,
			        Historia: historia,
		            Adoptado: adoptado
				}).then(function(){
					console.log("mascota agregada");
					window.location.replace("gracias.html");

				}, function(error){
					alert(error.code);
				});

				console.log("User signup Successful");
	});

$("#adminBtn").click(
function() {
		window.location.replace("loginAdmin.html");
	});

$("#homeBtn").click(
function() {
		window.location.replace("index.html");
	});

$("#updateBtn").click(
function() {
    //quitar
		var nombre = $("#nombre").val();
      	var edad = $("#edad").val();
      	var historia = $("#historia").val();
     	var adoptado = $("#adoptado").val();
     	var nombreM = $("#nombreM").val();
      	var apellido = $("#apellido").val();
      	var cedula = $("#cedula").val();
     	var telefono = $("#telefono").val();
     	var email = $("#email").val();
     	//guardo el valor de la cedula para que sea leido en otras vistas
     	localStorage.setItem("cedula",cedula);

		//si es distinto de null ambos campos muestra que esta cargando y esconde el boton

				//var user = firebase.auth().currentUser;
				firebase.database().ref('Entrada/'+cedula).set({
					Nombre: nombre,
			        Apellido: apellido,
			        Cedula: cedula,
		            Telefono: telefono,
		            Email: email,
		            Estatus: 'Pendiente',
		            Mascota: {
		            	NombreM: nombreM,
			        	Edad: edad,
				        Historia: historia,
			            Adoptado: adoptado
		            }
				}).then(function(){
					console.log("participante agregado");
					//window.location = "/registroMascota?id="+cedula;
					window.location.replace("graciasUpdate.html");

				}, function(error){
					alert(error.code);
				});

				console.log("User signup Successful");
	});








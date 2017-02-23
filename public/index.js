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
				}).then(function(error){

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
		  window.location.replace("index.html");

		}, function(error) {
		  // An error happened.

		  alert(error.message);
		});



	});


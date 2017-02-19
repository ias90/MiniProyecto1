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


  } else {
    // NO User is signed in.

    $(".login-cover").show();

	//alert("NO estas logueado....");
	var dialog = document.querySelector('#loginDialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

  }
});



/* SIGN UP PROCESS */

$("#signUpBtn").click(
	function() {
		var email = $("#loginEmail").val();
		var password = $("#loginPassword").val();

		//si es distinto de null ambos campos muestra que esta cargando y esconde el boton
		if(email != "" && password != ""){
			$("#loginProgress").hide();
			$("#loginBtn").show();

			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){

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


		}, function(error) {
		  // An error happened.

		  alert(error.message);
		});


	});





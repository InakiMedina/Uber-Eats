

addEventListener("load", (event) => {	
	
	//load external html files
	var xhr = new XMLHttpRequest()

	//load login modal
	xhr.open('GET', "http://localhost:3000/login/modal")
	var modal_content = login_form.firstElementChild.firstElementChild
	xhr.send()
	xhr.onload = function() {
		if (xhr.status != 200)
			alert(xhr.status + ": " + xhr.statusText)
		else {		
			modal_content.innerHTML = xhr.responseText
		}
	}

	//load bubbles background	
	var xhr2 = new XMLHttpRequest()
	xhr2.open('GET', "http://localhost:3000/widgets/backgrounds/bubbles")
	xhr2.send()
	xhr2.onload = function() {
		if (xhr2.status != 200)
			alert(xhr2.status + ": " + xhr2.statusText)
		else {		
			background.innerHTML = xhr2.responseText
		}
	}

	function openLoginModal() {
		login_dialog.showModal()
	}
	
	
});

function checkEmptysubForm(){
	const subFormInputs = Array.from(document.querySelectorAll(".myform input"));
	let validsubForm = true;
	subFormInputs.forEach(inpt => {
		if(!inpt.value)
		 {
		   inpt.classList.add("is-invalid");
		   validsubForm = false;
		 } else{
		   inpt.classList.remove("is-invalid");
		 }   
	});
	return validsubForm;
}

function storeToken(token) {
	var xhr4 = new XMLHttpRequest()
	let inputToken = {"token": token.inputToken}
	xhr4.open('POST', "http://localhost:3000/api/token")
	xhr4.setRequestHeader("content-type", "application/json")
	xhr4.send(JSON.stringify(inputToken))
	xhr4.onload = function() {
		if (xhr4.status != 200)
			alert("token wasn't able to store")
		else {	
			return true
		}
	}
	
	return false
}

function loginUser(){
	var xhr3 = new XMLHttpRequest()
	let loginData = {"email": email_form.value, "password": pass_form.value}
	//load login modal
	xhr3.open('POST', "http://localhost:3000/api/users/login")
	xhr3.setRequestHeader("Content-Type", "application/json")
	xhr3.send(JSON.stringify(loginData))
	xhr3.onload = function() {
		if (xhr3.status != 201)
			err_msg.innerHTML = "wrong login info"
		else {	
			err_msg.innerHTML = ""	
			if (storeToken(xhr3.responseText))
				window.location.href = "home"
		}
	}
}

function clickLogin() {
	if(checkEmptysubForm())
		loginUser()
}



addEventListener("load", (event) => {	

	//load external html files
	var xhr = new XMLHttpRequest()

	//load login modal
	xhr.open('GET', "http://localhost:3000/account/login/modal")
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
});

function openLoginModal() {
	login_dialog.showModal()
}


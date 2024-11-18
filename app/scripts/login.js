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
	xhr2.open('GET', "http://localhost:3000/background/bubbles")
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

// window.addEventListener("load", (event) => {
// 	var xml = new XMLHttpRequest();
// 	var items = []
// 	xml.open('GET', "http://localhost:3000/products/size")
// 	xml.send()
// 	xml.onload = function() {
// 		if (xml.status != 200)
// 			alert(xml.status + ": " + xml.statusText)
// 		else {		
// 			totalItems = JSON.parse(xml.responseText).size
// 			totalPages = Math.ceil(totalItems / itemsPerPage);
// 			createPageButtons()
// 			showPage()
// 		}
// 	}
// })
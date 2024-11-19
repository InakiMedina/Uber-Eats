window.addEventListener("load", (event) => {
	var xtr = new XMLHttpRequest();
	var items = []
	xtr.open('GET', "http://localhost:3000/widgets/navbars/client")
	xtr.send()
	xtr.onload = function() {
		if (xtr.status != 200)
			alert(xtr.status + ": " + xtr.statusText)
		else {		
			navbar.innerHTML = xtr.responseText
		}
	}
})
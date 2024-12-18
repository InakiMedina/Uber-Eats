var container = document.getElementById("product-container")
var pagination = document.getElementById("pagination")
var productsSection = document.getElementById("products-section")
const itemsPerPage = 4
var currentPage = 0
var totalPages = 0
var totalItems = 0
var currentOpenProduct = null


window.addEventListener("load", (event) => {
	getSize()
	showLoading(false)
	createPageButtons()
	
})

async function getSize()  {
	return new Promise(function (resolve, reject) {
		var xml = new XMLHttpRequest();
		xml.open('GET', "http://localhost:3000/api/products/size")
		xml.onload = function() {
			if (xml.status != 200)
				reject({
                    status: this.status,
                    statusText: "size not found"
                });
			else {		
				totalItems = JSON.parse(xml.responseText).size
				totalPages = Math.ceil(totalItems / itemsPerPage);
				resolve(xml.response);
			}
		}
		xml.send()
    });
	
}

function showLoading(show) {
	if (show)
	  loading.classList.remove('hidden') 
	else
	  loading.classList.add('hidden')
  }

function showProducts() {
	hero.classList.add('hidden')
	showLoading(true)
	showPage()
}


function prodModal(stockQuantity) {
	dlg.innerHTML = `<div id="productModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Cantidad a agregar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick="dlg.close()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
	  	<p> Max on stock: ${stockQuantity} </p> </br>
        <input id="proxyQuantity" type="number" value="1" min="1" max="${stockQuantity}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" onClick="addProxyToCart() && dlg.close()">Agregar</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick="dlg.close()">Cancelar</button>
      </div>
    </div>
  </div>
</div>`
	//modal.firstElementChild.showModal()
	//modal.firstElementChild.
	
	dlg.showModal()
}

function addCards(subItems) {
	container.innerHTML = ""
	subItems.forEach((item) => {	
		var card = document.createElement("div")
		card.classList.add("card")
		card.innerHTML = makeCard(item) 
		var btn = document.createElement("button")
		btn.classList.add("btn")
		btn.classList.add("btn-info")
		btn.textContent = "open"
		btn.addEventListener("click", () => {
			currentOpenProduct = item
			prodModal(item.stock)
		})
		card.appendChild(btn)
		container.appendChild(card)
	})
}

async function showPage() {
	await getSize()

	var startIndex = currentPage * itemsPerPage
	var endIndex = startIndex + itemsPerPage
	if (endIndex > totalItems)
		endIndex = totalItems

	var xml = new XMLHttpRequest();
	xml.open('GET', `http://localhost:3000/api/products?range=${startIndex}:${endIndex}`)
	xml.send()	
	var subItems = []
	xml.onload = function() {
		if (xml.status != 200)
			alert(xml.status + ": " + xml.statusText)
		else {				
			showLoading(false)
			productsSection.classList.remove('hidden')
			subItems = [...JSON.parse(xml.responseText)]
			addCards(subItems)			
			updateActiveButtonStates()
		}
	}
}
async function createPageButtons() {
	
	await getSize()

	const prevButton = document.createElement('li');
	const prevLink = document.createElement('button')
	prevLink.classList.add("page-link")
	prevLink.textContent = "previous"

	prevButton.classList.add("prev-button")
	prevButton.appendChild(prevLink)
	pagination.firstElementChild.appendChild(prevButton);
	
	prevButton.addEventListener('click', () => {	
		if (currentPage != 0)
			currentPage = currentPage - 1;
		showPage();
		updateActiveButtonStates();
	})

	pagination.firstElementChild.appendChild(prevButton)

	for (let i = 0; i < totalPages; i++) {
		const pageButton = document.createElement('li');
		const link = document.createElement('a')
		link.classList.add("page-link")
		link.textContent = i + 1	
		pageButton.classList.add("page-item")
		pageButton.appendChild(link)
		pagination.firstElementChild.appendChild(pageButton);
		
		pageButton.addEventListener('click', () => {	
			currentPage = i;
			showPage();
			updateActiveButtonStates();
		})
		
	}
	const nextButton = document.createElement('li');
	const nextLink = document.createElement('a')
	nextLink.classList.add("page-link")
	nextLink.textContent = "next"
	nextButton.classList.add("next-button")
	nextButton.appendChild(nextLink)
	pagination.firstElementChild.appendChild(nextButton);
	
	nextButton.addEventListener('click', () => {	
		if (currentPage < totalPages - 1)
			currentPage = currentPage + 1;
		showPage();
		updateActiveButtonStates();
	})
}

function updateActiveButtonStates() {
	const pageButtons = document.querySelectorAll('.page-item');
	pageButtons.forEach((button, index) => {
		if (index === currentPage) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});
}

function makeCard(data) {
	let productCard = ` 
		<img
		src=${data.imageUrl}
		height="150 rem"
		class="card-img-top"
		alt=${data.description}
		/>
		<div class="card-body">
		<h1>${data.title}</h1>
		<p class="card-text">${data.description}</p></br>
		<p class="card-text">1 ${data.unit} x $${data.pricePerUnit}</p>
		</div>`
	return productCard	
}

function onNavbarLoaded() {
	updateBadge()
}


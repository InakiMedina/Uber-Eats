
var currentItem

function productCard(item) {
  const product = UIStorage.getProduct(item.productUuid);
  const card = `<div class="media w-100">
          <img
            style="float: right; max-width: 160px; height: auto"
            src=${product.imageUrl}
            class="align-self-start mr-3 rounded-circle"
            style="width: 60px"
          />
          <div class="media-body">
            <div>
              <h4>
                ${product.title}
                <button type="btn" class="btn btn-danger ms-3 w-1" onClick = "delProd('${product.uuid}')">
                  <i class="fa-solid fa-trash"></i>
                </button>
				<button type="btn" class="btn btn-primary ms-3 w-1" onClick = "editItem('${product.uuid}')">
                  <i class="fa-solid fa-pencil"></i>
                </button>
              </h4>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
                  >Cantidad:
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="${item.amount}"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Precio:</span>
                <input type="text" class="form-control" placeholder="${product.pricePerUnit}" />
                <span class="input-group-text">MXN</span>
              </div>
            </div>
          </div>
        </div>`;
  return card;
}

function summaryListItem(item) {
  const product = UIStorage.getProduct(item.productUuid);
  const li = document.createElement("li");
  li.classList.add("card-text");
  li.innerHTML = `<b>${product.title}: </b>${item.amount} x ${product.pricePerUnit} MXN`;
  return li;
}

function delProd(uuid) {
  UIStorage.updateItem(uuid, 0);
  load()
}

function editItem(uuid) {
	const item = UIStorage.findProxy(uuid)
	currentItem = item
	sc_edit_qty.value = item.amount
	sc_edit.showModal()
}

function updateAmount() {
	UIStorage.updateItem(currentItem.productUuid, sc_edit_qty.value)
	sc_edit.close()
	load()
}

function load() {
  const storage = UIStorage.storage;

  sc_products.innerHTML = storage.proxies.map(productCard);
  sc_summary_list.innerHTML = ""
  storage.proxies.forEach((item) => {
    sc_summary_list.appendChild(summaryListItem(item));
  });
  sc_summary_total.textContent = UIStorage.calculateTotal() + 60;
}
load()

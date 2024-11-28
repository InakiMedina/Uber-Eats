function getProductsHTML(products) {
    return `
        <h2>Products</h2>
        <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>        
        ${products
            .map(
                (product, i) => `<tr>
                <td>${product.uuid}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" height="50px"/></td>
                <td>${product.price}</td>
                <td><div class='actions d-flex>
                    <button onclick="editProduct('${
                        product.uuid
                    }')"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteProduct(${i + 1}, '${
                    product.id
                }')"><i class="fas fa-trash"></i></button>
                </div></td></tr>`
            )
            .join('')}
    </table>
    <button onclick="createProduct()" class="btn btn-primary mt-2"><i class="fas fa-plus"></i></button>`
}

function getProductFormData(product) {
    return `
            <label for="name">ID</label>
            <input type="text" class="form-control" id="prodid"  readonly value="${
                product.uuid
            }">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" value="${
                product?.name || ''
            }">
            <label for="category">Category</label>
            <input type="text" class="form-control" id="category" value="${
                product?.category || ''
            }">
            <label for="image">Image</label>
            <input type="text" class="form-control" id="image" value="${
                product?.image || ''
            }">
            <label for="price">Price</label>
            <input type="number" class="form-control" id="price" value="${
                product?.price || ''
            }">
    `
}

module.exports = { getProductsHTML, getProductFormData }

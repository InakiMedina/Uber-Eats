function enableActions(enable) {
    const actions = document.querySelectorAll(`.actions button`)
    actions.forEach((action) => {
        action.disabled = !enable
    })
}

function showLoading(show) {
    enableActions(!show)
    if (show) loading.classList.remove('hidden')
    else loading.classList.add('hidden')
}

function setContent(response) {
    results.innerHTML = response
    showLoading(false)
}

function setSelecteAction(selected) {
    const actions = document.querySelectorAll(`aside button`)
    actions.forEach((action) => {
        if (action.textContent === selected) {
            action.classList.add('active')
        } else {
            action.classList.remove('active')
        }
    })
}

function showSuccessMsg(msg) {
    showLoading(false)
    succMsg.textContent = msg
    succMsg.classList.remove('hidden')
    errMsg.classList.add('hidden')
    notificationBar.classList.add('show')
    setTimeout(() => notificationBar.classList.remove('show'), 3000)
}

function showErrorMsg(msg) {
    console.error(msg)
    editDlg.close()
    showLoading(false)
    errMsg.textContent = msg
    errMsg.classList.remove('hidden')
    succMsg.classList.add('hidden')
    notificationBar.classList.add('show')
    setTimeout(() => notificationBar.classList.remove('show'), 5000)
}

function loadUsers() {
    showLoading(true)
    // const request = new XMLHttpRequest()

    // try {
    //     request.open('GET', 'http://localhost:3000/users')
    //     request.addEventListener('load', () => {
    //         if (request.status == 200) setContent(request.response)
    //         else showErrorMsg(request.response)
    //     })
    //     request.send()
    // } catch (error) {
    //     console.error(`XHR error ${request.status}`)
    // }
}

window.onload = () => {
    const actions = document.querySelectorAll(`aside button`)
    actions.forEach((action) => {
        action.addEventListener('click', () => {
            setSelecteAction(action.textContent)
            switch (action.textContent) {
                case 'Users':
                    loadUsers()
                    break
                case 'Products':
                    loadProducts()
                    break
            }
        })
    })
    loadUsers()
}

function onUserDeleted(row, email) {
    const table = document.querySelector('#content table')
    table.deleteRow(row)
    showSuccessMsg(`User ${email}  succesfully deleted`)
}

function deleteUser(row, email) {
    showLoading(true)
    // const request = new XMLHttpRequest()

    // try {
    //     request.open('DELETE', `http://localhost:3000/api/users/${email}`)
    //     request.addEventListener('load', () => {
    //         if (request.status == 200) onUserDeleted(row, email)
    //         else showErrorMsg(request.response)
    //     })

    //     request.send()
    // } catch (error) {
    //     console.error(error)
    // }
}

function editUser(email) {
    editTitle.textContent = `Edit User`
    editDlg.showModal()
    loadingModal.classList.remove('hidden')
    const request = new XMLHttpRequest()

    try {
        request.open('GET', `http://localhost:3000/users/${email}/form`)
        request.addEventListener('load', () => {
            if (request.status == 200) {
                loadingModal.classList.add('hidden')
                editContent.innerHTML = request.response
            } else showErrorMsg(request.response)
        })
        request.send()
    } catch (error) {
        console.error(error)
    }
}

function getUserFormData(form) {
    email = form.email.value
    name = form.userName.value
    role = form.role.value
    password = form.pwd.value
    return { email, name, role, password }
}

function saveUser() {
    showLoading(true)
    const request = new XMLHttpRequest()

    const data = getUserFormData(editForm)

    try {
        request.open('PUT', `http://localhost:3000/api/users/${data.email}`)
        request.setRequestHeader('Content-Type', 'application/json')
        request.addEventListener('load', () => {
            if (request.status == 200)
                onUserUpdated(JSON.parse(request.response))
            else showErrorMsg(request.response)
        })
        request.send(JSON.stringify(data))
    } catch (error) {
        console.error(error)
    }
}

function onUserUpdated(data) {
    showSuccessMsg(`User ${data.email}  succesfully updated`)
    editDlg.close()
    loadUsers() // TODO: update the table instead
}

function loadProducts() {
    showLoading(true)
    const request = new XMLHttpRequest()

    try {
        request.open('GET', 'http://localhost:3000/products')
        request.addEventListener('load', () => {
            if (request.status == 200) setContent(request.response)
            else showErrorMsg(request.response)
        })
        request.send()
    } catch (error) {
        console.error(`XHR error ${request.status}`)
    }
}

function createProduct() {
    editTitle.textContent = 'New Product'
    editDlg.showModal()
    loadingModal.classList.remove('hidden')
    const request = new XMLHttpRequest()

    try {
        request.open('GET', 'http://localhost:3000/products/new/form')
        request.addEventListener('load', () => {
            if (request.status == 200) {
                loadingModal.classList.add('hidden')
                editContent.innerHTML = request.response
            } else showErrorMsg(request.response)
        })
        request.send()
    } catch (error) {
        console.error(error)
    }
}

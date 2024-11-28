function getUsersHTML(users) {
    return `
        <h2>Users</h2>
        <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>        
        ${users
            .map(
                (user, i) => `<tr><td>${user.name}</td><td>${user.email}</td>
                <td><div class='actions d-flex'>
                    <button onclick="editUser('${
                        user.email
                    }')"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteUser(${i + 1},'${
                    user.email
                }')"><i class="fas fa-trash"></i></button>
                </div></td></tr>`
            )
            .join('')}
    </table>`
}

function getUserFormData(user) {
    return `
        <label for='userName'>Username</label>
        <input id='userName' value='${user?.name}'/>
        <label for='email'>Email</label>
        <input id='email' type='email' enabled='false' readonly='true' value='${user?.email}'/>
        <label for='pwd'>Password</label>
        <input id='pwd' type='password' value='${user?.password}'/>
        <label for='role'>Role</label>
        <input id='role' type='text' value='${user?.role}'/>
    `
}

module.exports = { getUsersHTML, getUserFormData }

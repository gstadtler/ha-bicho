'use strict'

const User = use("App/Models/User")

class UserController {
  async create ({ request }) {
    const data = request.only(["username", "email", "password", "role"])

    const user = await User.create(data)

    return user
  }

  async index () {
    const users = await User.all();
    return users;
  }

}

module.exports = UserController

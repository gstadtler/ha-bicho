'use strict'

const User = use("App/Models/User")

class AuthController {
  async register({request, auth, response}) {

    let user = await User.create(request.all())

    //generate token for user;
    let token = await auth.generate(user)

    Object.assign(user, token)

    let {username,email,role} = user
    let {token:authToken} = token

    return response.json({
      user:{username,email,role},
      token:authToken
    })
  }

  async login({request, auth, response}) {

    let {email, password} = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let token = await auth.generate(user)

        Object.assign(user, token)

        let {username,role} = user
        let {token:authToken} = token


        return response.json({
          user:{username,email,role},
          token:authToken
        })
      }
    }
    catch (e) {
      console.log(e)
      return response.json({notRegistered: 'Usuário não cadastrado!'})
    }
  }

  async show({auth, response}) {
    try {
      const user = await auth.getUser();
      if(!user){
        return response.json("User not found")
      }

      const {username,email,role} = user;

      return response.json({username,email,role})

    } catch (error) {
      console.log(e)
      return response.json({message: 'Usuário não encontrado!'})
    }
  }


}



module.exports = AuthController

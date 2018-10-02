import CONFIG from "../config/config"
const BASE_API = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API}/login` 
class Api {
  
  async loginAuthentication(email, password) {
    try {
      const rest = await fetch(BASE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer"
        },
        body: JSON.stringify({
          email: email, //'ejecutivo@leadis.co',
          password: password //'Hola@321',
        })
      });

      let resjson = await rest.json();
      //console.log('Este es',resjson)
      return resjson;
    } catch (error) {
      console.log("catch errors: " + errors.Text());
    }
  }
  
}

export default new Api();

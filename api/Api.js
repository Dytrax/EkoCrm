import CONFIG from "../config/config"
const URL_LOGIN = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API}/login` 
const URL_SOLICITUD = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/pqr/pqrs` 
class Api {
  
  async conectionBackEnd(header,body,url){
    
  }

  async loginAuthentication(email, password) {
    try {
      const rest = await fetch(URL_LOGIN, {
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
      return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors.Text());
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      //We will store all the errors in the array.
      let errorsArray = [];
      for (var key in formErrors) {
          //If array is bigger than one we need to split it.
          if (formErrors[key].length > 1) {
              formErrors[key].map(
                  error => errorsArray.push(`${key} ${error}`));
          } else {
              errorsArray.push(`${key} ${formErrors[key]}`);
          }
      }


  }
  }

  async getRequest(token){
    try {
      const rest = await fetch(URL_SOLICITUD, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
      });

      let resjson = await rest.json();
      //console.log('Este es',resjson)
      return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors.Text());
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      //We will store all the errors in the array.
      let errorsArray = [];
      for (var key in formErrors) {
          //If array is bigger than one we need to split it.
          if (formErrors[key].length > 1) {
              formErrors[key].map(
                  error => errorsArray.push(`${key} ${error}`));
          } else {
              errorsArray.push(`${key} ${formErrors[key]}`);
          }
      }


  }

  }
  
}

export default new Api();

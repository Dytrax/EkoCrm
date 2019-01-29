import CONFIG from "../config/config"





const URL_LOGIN = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API}/login` 
const URL_SOLICITUD = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/pqr/pqrs` 
const URL_CHAT = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/pqr/tracings`
const URL_CHAT_CLOSE = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/pqr/tracings-close`

//http://138.197.160.240:7002/v1/pqr/pqrs/uploads/18/datos.xlsx
const URL_DOWNLOAD_FILES =`${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/pqr/pqrs/uploads/` 



class Api {
  
 

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


  }

  }

  async chatPost(date, description, pqrId, token) {
    try {
      const rest = await fetch(URL_CHAT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          dateExecution:date,
          description: description, 
          pqrId: pqrId 
        })
      });

      let resjson = await rest.json();
      //console.log('Este es',resjson)
      return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors.Text());
      


  }
  }

  async chatPostClose(date, description, pqrId, token) {
    try {
      const rest = await fetch(URL_CHAT_CLOSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          dateExecution:date,
          description: description, 
          pqrId: pqrId 
        })
      });

      let resjson = await rest.json();
      //console.log('Este es',resjson)
      return [rest.status,resjson];
    } catch (errors) {
      //console.log("catch errors: " + errors.Text());
      


  }
  }

  async PostData(token, url, bodyJson) {
    try {
      const rest = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body:JSON.stringify(bodyJson)
      });

      let resjson = await rest.json();
      console.log('Este es',resjson)
      return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors);
      


  }
  }

  async PasswordRecover(url, bodyJson) {
    try {
      const rest = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: "Bearer " + token
        },
        body:JSON.stringify(bodyJson)
      });

      let resjson = await rest.json();
      console.log('Este es',resjson)
      return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors);
      


  }
  }

  async PutData(token, url, bodyJson) {
    try {
      const rest = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body:JSON.stringify(bodyJson)
      });

      let resjson = await rest;
      console.log('Este es',resjson)
      return resjson
    } catch (errors) {
      console.log("catch errors: " + errors.Text());
      


  }
  }

  async DeleteContact(token, url) {
    try {
      const rest = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
        
      });

      let resjson = await rest;
      return resjson
      //console.log('Este es',resjson)
      //return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors);
      


  }
  }
  async Delete(token, url) {
    try {
      const rest = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
        
      });

      let resjson = await rest;
      return resjson
      //console.log('Este es',resjson)
      //return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors);
      


  }
  }



  dataFilter(data){
    console.log("data")
    console.log(data)
    let openRequest = data.map(s=>{
      return {
          //Filtering the information and forming the Json if the token still alive
          id:s.id.toString(),
          companyName:s.businessName,
          pqrsCompanyAbiertas:s.pqrs.filter(p=>p.state===1),
          pqrsCompanyCerradas:s.pqrs.filter(p=>p.state===0),
          pqrsCompanyEnProceso:s.pqrs.filter(p=>p.state===2),
          quantitypqrsCompanyAbiertas:(s.pqrs.filter(p=>p.state===1)).length,
          quantitypqrsCompanyCerradas:s.pqrs.filter(p=>p.state===0).length,
          quantitypqrsCompanyEnProceso:s.pqrs.filter(p=>p.state===2).length,                 
          
      }
      
      //Sorting the Json 
  }).sort((a,b)=>b.quantitypqrsCompanyEnProceso-a.quantitypqrsCompanyEnProceso)
  return openRequest
  }

  async successfulOpportunity(token, url, bodyJson) {
    try {
      const rest = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body:JSON.stringify(bodyJson)
        
      });

      let resjson = await rest;
      return resjson
      //console.log('Este es',resjson)
      //return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors);
      


  }
  }

  async changePassword(token, url, bodyJson) {
    try {
      const rest = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body:JSON.stringify(bodyJson)
        
      });

      let resjson = await rest;
      return resjson
      //console.log('Este es',resjson)
      //return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors);
      


  }
  }

  

  async getDataBackEnd(token,URL){
    try {
      const rest = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
      });

      let resjson = await rest.json();
      //console.log('Este es',resjson)
     
      if(rest.status==200){
        return resjson
      }else{
        return false
      }
      return [rest.status,resjson];
    } catch (errors) {
      console.log("catch errors: " + errors.Text());


  }

  }
  
}



export default new Api();

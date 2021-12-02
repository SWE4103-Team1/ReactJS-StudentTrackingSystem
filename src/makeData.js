export  async function makeData(setData) {

  let getURL = window.location.hostname;
  
  if(getURL === 'localhost' || getURL === '127.0.0.1'){
    const url = 'http://' + getURL + ':8000/api/student_data';
    const response = await fetch(url);
    const data = await response.json();
    const final_data = await data.map(row => {
      
      return row.fields
   })
  
    return setData(final_data)
  }

    const url = 'http://' + getURL +'/api/student_data';
    const response = await fetch(url);
    const data = await response.json();
    const final_data = await data.map(row => {
      
      return row.fields
  })
  
    return setData(final_data)
  
  }

  export async function makeTranscript(key, setData, settranscriptLoading) {

    let getURL = window.location.hostname;
    if(key.length !== 0){
      if(getURL === 'localhost' || getURL === '127.0.0.1'){
      
        const url = "http://"+ getURL + ":8000/get_transcript/" + key[1] + "";
        const response = await fetch(url);
        const data = await response.json();
        settranscriptLoading(false)
    
        return setData(data);
      }
      else{
        
        const url = "http://"+ getURL + "/get_transcript/" + key[1] + "";
        const response = await fetch(url);
        const data = await response.json();
       
        settranscriptLoading(false)
        return setData(data);
      }
    
    }

	}

  
  export async function InAppAudit(key, setData) {

    let getURL = window.location.hostname;

    let url = "";
 
    if(key.length !== 0){
      if(getURL === 'localhost' || getURL === '127.0.0.1'){
        url = "http://"+ getURL + ":8000/audit_student/" + key[1] + "";
      }
      else{
        url = "http://"+ getURL + "/audit_student/" + key[1] + "";
      }

      let response = await fetch(url)
      response = await response.json()

      return setData(response);
    }
	}
export  async function makeData(setData) {

  let getURL = window.location.hostname;
  console.log(getURL)
  if(getURL === 'localhost' || getURL === '127.0.0.1'){
    const url = 'http://' + getURL + ':8000/api/student_data';
    const response = await fetch(url);
    const data = await response.json();
    const final_data = await data.map(row => {
      
      return row.fields
   })
   console.log(final_data)
    return setData(final_data)
  }

    const url = 'http://' + getURL +'/api/student_data';
    const response = await fetch(url);
    const data = await response.json();
    const final_data = await data.map(row => {
      
      return row.fields
  })
  console.log(final_data)
    return setData(final_data)
  
  }

  export async function makeTranscript(key, setData) {

    let getURL = window.location.hostname;
    if(key.length !== 0){
      if(getURL === 'localhost' || getURL === '127.0.0.1'){
      
        const url = "http://"+ getURL + ":8000/get_transcript/" + key[0] + "";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    
        return setData(data);
      }
      else{
        console.log(key);
        const url = "http://"+ getURL + "/get_transcript/" + key[0] + "";
        const response = await fetch(url);
        const data = await response.json();
      
    
        return setData(data);
      }
    
    }

	}
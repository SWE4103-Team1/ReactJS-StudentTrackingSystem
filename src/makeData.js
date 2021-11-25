
import axios from "axios";

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
      
        const url = "http://"+ getURL + ":8000/get_transcript/" + key[1] + "";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    
        return setData(data);
      }
      else{
        console.log(key);
        const url = "http://"+ getURL + "/get_transcript/" + key[1] + "";
        const response = await fetch(url);
        const data = await response.json();
      
    
        return setData(data);
      }
    
    }

	}

  
  export async function InAppAudit(key, setData) {

    let getURL = window.location.hostname;
    console.log(key)
    if(key.length !== 0){
      if(getURL === 'localhost'){
      
        // const url = "http://127.0.0.1:8000/_get_Audit/" + key[1] + "";
        // // 
        // let data = null
        // let response = await axios.get(url)
        // response = await JSON.parse(response.data)
        // console.log(response
        //   );
       let data = {
        audit : {
        target_student: {
          student_number: 8510804,
          full_name: "Fred Lampard",
          cohort:" 2018-2019FR",
          rank: "JUN",
          years_in: 2,
          status: "IN PROGRESS"
        },
        base_program: "SWE2018",
        audit_date: "", 
        progress: {
          CORE: {
            completed: {
              courses: ["MATH103", "ENGG1001"], 
              credit_hours: 76
            },
            in_progress: {
              courses: ["CE3963", "CS2263"],
              credit_hours: 7
            },
            remaining: {
              courses: ["CS3503", "CS3383", "CS3413", "CS3873", "ECE3221"], 
              credit_hours: 12
            }
          },
          TE: {
            completed: {
              courses: [],
              credit_hours: 0
            },
            in_progress: {
              courses: [],
              credit_hours: 0
            },
            remaining: {
              num_courses: 2,
              credit_hours: 12
            }
          },
          NS: {
            completed: {
              courses: [],
              credit_hours: 0
            },
            in_progress: {
              courses: [],
              credit_hours: 0
            },
            remaining: {
              num_courses: 2,
              credit_hours: 6
            }
          },
          CSE: {
            credit_hours: 9,
            completed: {
              ITS: {
                course: "SOCI3373",
                credit_hours: 3
              }
            },
            in_progress: {
              OPEN: {
                course: "ENGL1103",
                credit_hours: 3
              }
            },
            remaining: {
              HSS: {
                credit_hours: 0
              }
            }
          }
        },
        extra_courses: "" 
      }
      
      }
        
        console.log(data);
        return setData(data);
      }
      else{
        console.log(key);
        const url = "http://swe4103-env.eba-irrkpdyi.us-east-2.elasticbeanstalk.com/_get_Audit/" + key[1] + "";
        let data = null
        let response = await axios.get(url)
        
        // console.log(response.data);
        
        return setData(data);
      }
    
    }

	}
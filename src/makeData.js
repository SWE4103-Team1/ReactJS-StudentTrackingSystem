
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
					audit: {
						target_student: {
							student_number: 5283043,
							full_name: "Darlene Hooper",
							cohort: "UNPOPULATED",
							rank: "FIR",
							years_in: 0.8,
							status: "IN PROGRESS",
						},
						progress: {
							CORE: {
								remaining: {
									courses: [
										"SWE4040",
										"CS3383",
										"CS3873",
										"ECE2412",
										"SWE4203",
										"ECE3242",
										"ENGG4013",
									],
									credit_hours: 9,
								},
								completed: {
									courses: [
										"CS1073",
										"MATH1003",
										"MATH1503",
										"ENGG1001",
										"PHYS1081",
										"ENGG1015",
										"ENGG1003",
										"ECE2701",
										"CS2043",
										"CS1303",
										"ECE2214",
										"STAT2593",
										"ECE2215",
										"CHEM1982",
										"MATH1013",
										"CS1003",
										"ECE1813",
										"CHEM1987",
										"CS1083",
										"CS2383",
										"SWE4103",
										"ECE3221",
										"CS2333",
										"INFO1103",
										"CS2263",
										"CE3963",
										"CS3413",
										"CS2413",
										"ECE2021",
										"ECE3232",
										"ECE4242",
										"CS3503",
										"SWE4403",
									],
									credit_hours: 113,
								},
								in_progress: { courses: [], credit_hours: 0 },
							},
							TE: {
								remaining: { num_courses: 2, credit_hours: 8 },
								completed: { courses: ["CS3113", "CS3035"], credit_hours: 6 },
								in_progress: { courses: [], credit_hours: 0 },
							},
							NS: {
								remaining: { num_courses: 2, credit_hours: 8 },
								completed: { courses: ["CS3113", "CS3035"], credit_hours: 6 },
								in_progress: { courses: [], credit_hours: 0 },
							},

							CSE_HSS: {
								remaining: { num_courses: 2, credit_hours: 8 },
								completed: { courses: ["CS3113", "CS3035"], credit_hours: 6 },
								in_progress: { courses: [], credit_hours: 0 },
							},
							CSE_OPEN: {
								remaining: { num_courses: 2, credit_hours: 8 },
								completed: { courses: ["CS3113", "CS3035"], credit_hours: 6 },
								in_progress: { courses: [], credit_hours: 0 },
							},
							CSE_ITS: {
								remaining: { num_courses: 2, credit_hours: 8 },
								completed: { courses: ["CS3113", "CS3035"], credit_hours: 6 },
								in_progress: { courses: [], credit_hours: 0 },
							},
						},
						latest_enrolment_term: "2017/FA",
						base_program: "SWE2017-18",
					},
				};
        
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
import React from 'react'






export const AuditCSE = ({CSEData}) => {

    let CSEDataIN = CSEData

    let courseTypes = []

    let styles = {
        outterMostDiv: {
            float: "left",
            padding: "15px"
        }
    }

if(CSEDataIN["CSE-HSS"].completed.courses.length != 0 || CSEDataIN["CSE-HSS"].in_progress.courses.length != 0) {
    
   
    let courseType = {
        type: "CSE_HSS",
        inProgress: [],
        credit_hours: 0,
        completed: []


    }
    
    if(CSEDataIN["CSE-HSS"].completed.courses.length != 0){
        courseType.completed.push(...CSEDataIN["CSE-HSS"].completed.courses)
        courseType.credit_hours += CSEDataIN["CSE-HSS"].completed.credit_hours

    }
    if(CSEDataIN["CSE-HSS"].in_progress.courses.length != 0){

        courseType.completed.push(...CSEDataIN["CSE-HSS"].in_progress.courses)
        courseType.credit_hours += CSEDataIN["CSE-HSS"].in_progress.credit_hours
    }
   

    courseTypes.push(courseType)
 
}
   
if(CSEDataIN["CSE-OPEN"].completed.courses.length != 0 || CSEDataIN["CSE-OPEN"].in_progress.courses.length != 0) {

    let courseType = {
        type: "CSE-OPEN",
        inProgress: [],
        credit_hours: 0,
        completed: []


    }
    
    if(CSEDataIN["CSE-OPEN"].completed.courses.length != 0){
        courseType.completed.push(...CSEDataIN["CSE-OPEN"].completed.courses)
        courseType.credit_hours += CSEDataIN["CSE-OPEN"].completed.credit_hours

    }
    if(CSEDataIN["CSE-OPEN"].in_progress.courses.length != 0){

        courseType.completed.push(...CSEDataIN["CSE-OPEN"].in_progress.courses)
        courseType.credit_hours += CSEDataIN["CSE-OPEN"].in_progress.credit_hours
    }
   

    courseTypes.push(courseType)
    
    
}

if(CSEDataIN["CSE-ITS"].completed.courses.length != 0 || CSEDataIN["CSE-ITS"].in_progress.courses.length != 0) {

    let courseType = {
        type: "CSE-ITS",
        inProgress: [],
        credit_hours: 0,
        completed: []


    }
    
    if(CSEDataIN["CSE-ITS"].completed.courses.length != 0){
        courseType.completed.push(...CSEDataIN["CSE-ITS"].completed.courses)
        courseType.credit_hours += CSEDataIN["CSE-ITS"].completed.credit_hours

    }
    if(CSEDataIN["CSE-ITS"].in_progress.courses.length != 0){

        courseType.completed.push(...CSEDataIN["CSE-ITS"].in_progress.courses)
        courseType.credit_hours += CSEDataIN["CSE-ITS"].in_progress.credit_hours
    }
   

    courseTypes.push(courseType)
 
} 
    return (
        <>
    {
        courseTypes.map((item, index)=> {
            return <div style = {styles.outterMostDiv}><p>{item.type} &nbsp; {item.inProgress.length + item.completed.length}
           &nbsp; ({item.credit_hours}ch) {item.inProgress.map((item)=> {
               return <p>{item} inprogress </p>
           })} 
           
           {item.completed.map((item)=> {
               return <p> {item} completed</p>
           })} 
           </p></div>
        })
    }
        </>
    );

} 
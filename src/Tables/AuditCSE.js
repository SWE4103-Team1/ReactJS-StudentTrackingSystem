import React from 'react'






export const AuditCSE = ({CSEData}) => {

    let CSEDataIN = CSEData

    let courseTypes = [[]]

if(CSEDataIN.CSE_HSS.completed.courses.length != 0 || CSEDataIN.CSE_HSS.in_progress.courses.length != 0) {
    
    courseTypes.append("CSE_HSS")
    
    if(CSEDataIN.CSE_HSS.completed.courses.length != 0){

    }
    if(CSEDataIN.CSE_HSS.in_progress.courses.length != 0){


    }
 
}
   
if(CSEDataIN.CSE_OPEN.completed.courses.length != 0 || CSEDataIN.CSE_OPEN.in_progress.courses.length != 0) {

    courseTypes.append("CSE_OPEN")
    if(CSEDataIN.CSE_OPEN.completed.courses.length != 0){

    }
    if(CSEDataIN.CSE_OPEN.in_progress.courses.length != 0){


    }
    
    
}

if(CSEDataIN.CSE_ITS.completed.courses.length != 0 || CSEDataIN.CSE_ITS.in_progress.courses.length != 0) {

    courseTypes.append("CSE_ITS")
    if(CSEDataIN.CSE_ITS.completed.courses.length != 0){
        
    }
    if(CSEDataIN.CSE_ITS.in_progress.courses.length != 0){


    }
 
} 
    return (
        <>

        </>
    );

} 
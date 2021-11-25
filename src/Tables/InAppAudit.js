import {InAppAudit} from '../makeData'
import {Form, Button} from 'react-bootstrap'
import React from 'react'


export const Audit = ({data}) =>{

    console.log(data)
   
    const styles = {
        headers: {
            display: "inline"
        },
        div_style: {
            boxShadow: "1px 3px 1px #9E9E9E"
        }
    }

    return(

        <div>
          


            <div>Core Courses completed: &nbsp;&nbsp;&nbsp;{data.audit.progress.CORE.completed.courses.length}&nbsp; courses &nbsp;({data.audit.progress.CORE.completed.credit_hours}CH)&nbsp;</div>
            <div >{data.audit.progress.CORE.completed.courses.map((course) => {
                   return  <h6 style ={styles.headers}>&nbsp;{course}</h6>
            })}</div>


            <div>Core Courses in progress: &nbsp;&nbsp;&nbsp;{data.audit.progress.CORE.in_progress.courses.length}&nbsp; courses &nbsp;({data.audit.progress.CORE.in_progress.credit_hours}CH)&nbsp;</div>
            <div>{data.audit.progress.CORE.in_progress.courses.map((course) => {
                   return  <h6 style ={styles.headers} >&nbsp;{course}</h6>})}</div>


            <div>Core Courses remaining: &nbsp;&nbsp;&nbsp;{data.audit.progress.CORE.remaining.courses.length}&nbsp; courses &nbsp;({data.audit.progress.CORE.remaining.credit_hours}CH)&nbsp;</div>
            <div>{data.audit.progress.CORE.remaining.courses.map((course) => {
                return  <h6 style ={styles.headers} >&nbsp;{course}</h6>})}</div>


                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                    <div><p>Audit: {data.audit.target_student.student_number}, &nbsp;{data.audit.target_student.cohort},&nbsp; {data.audit.target_student.rank}, &nbsp;years in: {data.audit.target_student.years_in}</p></div>

                    <div><p>Based on: {data.audit.base_program}</p> </div>
                    <div>&nbsp;STATUS:&nbsp;{data.audit.target_student.status}</div>
                    <div style = {styles.div_style}><p>Progress through CORE&nbsp;( {data.audit.progress.CORE.completed.courses.length + data.audit.progress.CORE.remaining.courses.length +
                    data.audit.progress.CORE.in_progress.courses.length}&nbsp;courses, {data.audit.progress.CORE.completed.credit_hours + data.audit.progress.CORE.remaining.credit_hours
                    + data.audit.progress.CORE.in_progress.credit_hours}&nbsp;CH)&nbsp;&nbsp;&nbsp;{data.audit.progress.CORE.remaining.courses.length }&nbsp;courses
                    ({data.audit.progress.CORE.remaining.credit_hours }CH)&nbsp; REMAINING</p>   </div>
                        {/* <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
     </div>
    );
}
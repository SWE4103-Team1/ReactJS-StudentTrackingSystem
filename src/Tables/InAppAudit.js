import {InAppAudit} from '../makeData'
import {Form, Button} from 'react-bootstrap'
import React from 'react'
import { AuditCSE } from "./AuditCSE";

export const Audit = ({ data }) => {
	

	const styles = {
		CourseCode: {
			display: "inline-block",
			font: "sans-serif",
			fontSize: "18px",
			wordBreak: "keep-all",
		},
		div_style: {
			boxShadow: "1px 3px 1px #9E9E9E",
            
		},
		CourseHeaders: {
			font: "sans-serif",
			fontSize: "20px",
            paddingBottom: "15px",
            paddingTop: "15px"
		},
		Parent_Div: {
		
		},
	};


    let progress = data.progress
   
	return (
		<div style={styles.Parent_Div}>
			<div>
				<p>
					Audit: {data.target_student.student_number}, &nbsp;
					{data.target_student.cohort},&nbsp;{" "}
					{data.target_student.rank}, &nbsp;years in:{" "}
					{data.target_student.years_in}
				</p>
			</div>
			<div>
				<p>Based on: {data.base_program}</p>{" "}
			</div>
			<div>&nbsp;STATUS:&nbsp;{data.target_student.status}</div>
			<div style={styles.div_style}>
				<p>
					Progress through CORE&nbsp;({" "}
					{progress.CORE.completed.courses.length +
						progress.CORE.remaining.courses.length +
						progress.CORE.in_progress.courses.length}
					&nbsp;courses,{" "}
					{progress.CORE.completed.credit_hours +
						progress.CORE.remaining.credit_hours +
						progress.CORE.in_progress.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{progress.CORE.remaining.courses.length}&nbsp;courses (
					{progress.CORE.remaining.credit_hours}CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<div style={styles.CourseHeaders}>
				Core Courses completed: &nbsp;&nbsp;&nbsp;
				{progress.CORE.completed.courses.length}&nbsp; courses
				&nbsp;({progress.CORE.completed.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{progress.CORE.completed.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.CourseHeaders}>
				Core Courses in progress: &nbsp;&nbsp;&nbsp;
				{progress.CORE.in_progress.courses.length}&nbsp; courses
				&nbsp;({progress.CORE.in_progress.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{progress.CORE.in_progress.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.CourseHeaders}>
				Core Courses remaining: &nbsp;&nbsp;&nbsp;
				{progress.CORE.remaining.courses.length}&nbsp; courses
				&nbsp;({progress.CORE.remaining.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{progress.CORE.remaining.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.div_style}>
				<p>
					Progress through TE&nbsp;({" "}
					{progress.TE.completed.courses.length +
						progress["TE"].remaining.num_courses +
						progress.TE.in_progress.courses.length}
					&nbsp;courses,{" "}
					{progress.TE.completed.credit_hours +
						progress.TE.remaining.credit_hours +
						progress.TE.in_progress.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{progress.TE.remaining.num_courses}&nbsp;courses (
					{progress.TE.remaining.credit_hours}CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<div style={styles.CourseHeaders}>
				TE Courses completed: &nbsp;&nbsp;&nbsp;
				{progress.TE.completed.courses.length}&nbsp; courses &nbsp;(
				{progress.TE.completed.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{progress.TE.completed.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.CourseHeaders}>
				TE Courses in progress: &nbsp;&nbsp;&nbsp;
				{progress.TE.in_progress.courses.length}&nbsp; courses
				&nbsp;({progress.TE.in_progress.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{progress.TE.in_progress.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>{" "}
			<div style={styles.div_style}>
				<p>
					Progress through NS&nbsp;({" "}
					{progress.NS.completed.courses.length +
						progress.NS.remaining.num_courses +
						progress.NS.in_progress.courses.length}
					&nbsp;courses,{" "}
					{progress.NS.completed.credit_hours +
						progress.NS.remaining.credit_hours +
						progress.NS.in_progress.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{progress.NS.remaining.num_courses}&nbsp;courses (
					{progress.NS.remaining.credit_hours}CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<div style={styles.CourseHeaders}>
				NS Courses completed: &nbsp;&nbsp;&nbsp;
				{progress.NS.completed.courses.length}&nbsp; courses &nbsp;(
				{progress.NS.completed.credit_hours}CH)&nbsp;
			</div>
			<div>
				{progress.NS.completed.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</div>
			<div style={styles.CourseHeaders}>
				NS Courses in progress: &nbsp;&nbsp;&nbsp;
				{progress.NS.in_progress.courses.length}&nbsp; courses
				&nbsp;({progress.NS.in_progress.credit_hours}CH)&nbsp;
			</div>
			<div>
				{progress.NS.in_progress.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</div>{" "}
			<div style={styles.div_style}>
				<p>
					Progress through CSE&nbsp;({" "}
					{progress["CSE-ITS"].completed.courses.length}{" "}
					&nbsp;ITS,&nbsp;
					{progress["CSE-HSS"].completed.courses.length}{" "}
					&nbsp;HSS,&nbsp;
					{progress["CSE-OPEN"].completed.courses.length} &nbsp;OPEN
					&nbsp;;{" "}
					{progress["CSE-HSS"].completed.credit_hours +
						progress["CSE-OPEN"].completed.credit_hours +
						progress["CSE-ITS"].completed.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{progress["CSE-ITS"].remaining.num_courses
					}
					&nbsp;courses ({progress["CSE-ITS"].remaining.credit_hours}
					CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<AuditCSE CSEData={progress}></AuditCSE>
		</div>
	);
};
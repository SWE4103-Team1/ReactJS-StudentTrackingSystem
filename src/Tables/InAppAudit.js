import {InAppAudit} from '../makeData'
import {Form, Button} from 'react-bootstrap'
import React from 'react'
import { AuditCSE } from "./AuditCSE";

export const Audit = ({ data }) => {
	console.log(data);

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
		},
		Parent_Div: {
			width: "650px",
		},
	};

	return (
		<div style={styles.Parent_Div}>
			<div>
				<p>
					Audit: {data.audit.target_student.student_number}, &nbsp;
					{data.audit.target_student.cohort},&nbsp;{" "}
					{data.audit.target_student.rank}, &nbsp;years in:{" "}
					{data.audit.target_student.years_in}
				</p>
			</div>
			<div>
				<p>Based on: {data.audit.base_program}</p>{" "}
			</div>
			<div>&nbsp;STATUS:&nbsp;{data.audit.target_student.status}</div>
			<div style={styles.div_style}>
				<p>
					Progress through CORE&nbsp;({" "}
					{data.audit.progress.CORE.completed.courses.length +
						data.audit.progress.CORE.remaining.courses.length +
						data.audit.progress.CORE.in_progress.courses.length}
					&nbsp;courses,{" "}
					{data.audit.progress.CORE.completed.credit_hours +
						data.audit.progress.CORE.remaining.credit_hours +
						data.audit.progress.CORE.in_progress.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{data.audit.progress.CORE.remaining.courses.length}&nbsp;courses (
					{data.audit.progress.CORE.remaining.credit_hours}CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<div style={styles.CourseHeaders}>
				Core Courses completed: &nbsp;&nbsp;&nbsp;
				{data.audit.progress.CORE.completed.courses.length}&nbsp; courses
				&nbsp;({data.audit.progress.CORE.completed.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{data.audit.progress.CORE.completed.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.CourseHeaders}>
				Core Courses in progress: &nbsp;&nbsp;&nbsp;
				{data.audit.progress.CORE.in_progress.courses.length}&nbsp; courses
				&nbsp;({data.audit.progress.CORE.in_progress.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{data.audit.progress.CORE.in_progress.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.CourseHeaders}>
				Core Courses remaining: &nbsp;&nbsp;&nbsp;
				{data.audit.progress.CORE.remaining.courses.length}&nbsp; courses
				&nbsp;({data.audit.progress.CORE.remaining.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{data.audit.progress.CORE.remaining.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.div_style}>
				<p>
					Progress through TE&nbsp;({" "}
					{data.audit.progress.TE.completed.courses.length +
						data.audit.progress["TE"].remaining.num_courses +
						data.audit.progress.TE.in_progress.courses.length}
					&nbsp;courses,{" "}
					{data.audit.progress.TE.completed.credit_hours +
						data.audit.progress.TE.remaining.credit_hours +
						data.audit.progress.TE.in_progress.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{data.audit.progress.TE.remaining.num_courses}&nbsp;courses (
					{data.audit.progress.TE.remaining.credit_hours}CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<div style={styles.CourseHeaders}>
				TE Courses completed: &nbsp;&nbsp;&nbsp;
				{data.audit.progress.TE.completed.courses.length}&nbsp; courses &nbsp;(
				{data.audit.progress.TE.completed.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{data.audit.progress.TE.completed.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>
			<div style={styles.CourseHeaders}>
				TE Courses in progress: &nbsp;&nbsp;&nbsp;
				{data.audit.progress.TE.in_progress.courses.length}&nbsp; courses
				&nbsp;({data.audit.progress.TE.in_progress.credit_hours}CH)&nbsp;
			</div>
			<lu>
				{data.audit.progress.TE.in_progress.courses.map((course) => {
					return <li style={styles.CourseCode}>&nbsp;{course}</li>;
				})}
			</lu>{" "}
			<div style={styles.div_style}>
				<p>
					Progress through NS&nbsp;({" "}
					{data.audit.progress.NS.completed.courses.length +
						data.audit.progress.NS.remaining.num_courses +
						data.audit.progress.NS.in_progress.courses.length}
					&nbsp;courses,{" "}
					{data.audit.progress.NS.completed.credit_hours +
						data.audit.progress.NS.remaining.credit_hours +
						data.audit.progress.NS.in_progress.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{data.audit.progress.NS.remaining.num_courses}&nbsp;courses (
					{data.audit.progress.NS.remaining.credit_hours}CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<div style={styles.CourseHeaders}>
				NS Courses completed: &nbsp;&nbsp;&nbsp;
				{data.audit.progress.NS.completed.courses.length}&nbsp; courses &nbsp;(
				{data.audit.progress.NS.completed.credit_hours}CH)&nbsp;
			</div>
			<div>
				{data.audit.progress.NS.completed.courses.map((course) => {
					return <h6 style={styles.CourseCode}>&nbsp;{course}</h6>;
				})}
			</div>
			<div style={styles.CourseHeaders}>
				NS Courses in progress: &nbsp;&nbsp;&nbsp;
				{data.audit.progress.NS.in_progress.courses.length}&nbsp; courses
				&nbsp;({data.audit.progress.NS.in_progress.credit_hours}CH)&nbsp;
			</div>
			<div>
				{data.audit.progress.NS.in_progress.courses.map((course) => {
					return <h6 style={styles.CourseCode}>&nbsp;{course}</h6>;
				})}
			</div>{" "}
			<div style={styles.div_style}>
				<p>
					Progress through CSE&nbsp;({" "}
					{data.audit.progress.CSE_ITS.completed.courses.length}{" "}
					&nbsp;ITS,&nbsp;
					{data.audit.progress.CSE_HSS.completed.courses.length}{" "}
					&nbsp;HSS,&nbsp;
					{data.audit.progress.CSE_OPEN.completed.courses.length} &nbsp;OPEN
					&nbsp;;{" "}
					{data.audit.progress.CSE_HSS.completed.credit_hours +
						data.audit.progress.CSE_OPEN.completed.credit_hours +
						data.audit.progress.CSE_ITS.completed.credit_hours}
					&nbsp;CH)&nbsp;&nbsp;&nbsp;
					{data.audit.progress.CSE_ITS.remaining.num_courses +
						data.audit.progress.CSE_HSS.remaining.num_courses +
						data.audit.progress.CSE_OPEN.remaining.num_courses}
					&nbsp;courses ({data.audit.progress.CSE_ITS.remaining.credit_hours}
					CH)&nbsp; REMAINING
				</p>{" "}
			</div>
			<AuditCSE CSEData={data.audit.progress}></AuditCSE>
		</div>
	);
};
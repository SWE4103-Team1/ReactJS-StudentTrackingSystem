import React, { useState, useEffect, useMemo } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "react-bootstrap";

import axios from "axios";

import "./styles.css";

export default function TextAuditButton() {
    // A list storing the student numbers of all students we want to audit
    //let studentNumbers = [];
    const studentNumbers = useMemo(() => [5871602], []);

    // A dictionary which contains the audit information for each student being audited
    // Key is student number, value is audit information gathered from InAppAudit
    let audits = {};
    //const audits = useMemo(() => {}, []);

    // Keeps track of whether or not we are fetching api for audit data
    const [auditLoading, setAuditLoading] = useState(false);

    const getAuditData = async (sid) => {
        let getURL = window.location.hostname;
        let url = ((getURL === 'localhost' || getURL === '127.0.0.1') ? 
            "http://"+ getURL + ":8000/audit_student/" + sid + "" : 
            "http://swe4103-env.eba-irrkpdyi.us-east-2.elasticbeanstalk.com/_get_Audit/" + sid + "");

        let response = await axios.get(url);
        return response.data;
    }

    // Time to build the biggest string :)
    const parseAuditData = (data) => {
        let lines = [];

        let student = data["target_student"];
        let courses = {
            "CORE": data["progress"]["CORE"],
            "TE": data["progress"]["TE"],
            "NS": data["progress"]["NS"],
            "CSE": {
                "ITS": data["progress"]["CSE-ITS"],
                "HSS": data["progress"]["CSE-HSS"],
                "OPEN": data["progress"]["CSE-OPEN"]
            }
        }

        let header = [
            "Audit: ", student['student_number'], " - ", 
            student['full_name'], ", ", student['cohort'], 
            ", ", student['rank'], ", years in: ", student['years_in'],
            "\nBased on: ", data['base_program'], " program, as of ", data['latest_enrolment_term'],
            "\n\n\tSTATUS: ", student['status'],
        ]

        lines = lines.concat(header);

        //This builds the CORE, TE, and NS portions of audit
	    for (const [course, courseData] of Object.entries(courses))
        {
		    if (course === "CSE") break;

		    let completed = courseData["completed"]["courses"];
		    let completedCH = courseData["completed"]["credit_hours"];
		    let remaining = (course === "CORE") ? courseData["remaining"]["courses"] : courseData["remaining"]["num_courses"];
		    let remainingCH = courseData["remaining"]["credit_hours"];
		    let inProgress = courseData["in_progress"]["courses"];
		    let inProgressCH = courseData["in_progress"]["credit_hours"];

		    let totalCourses = (course === "CORE") ? completed.length + remaining.length + inProgress.length : completed.length + remaining + inProgress.length;
		    let totalCH = completedCH + remainingCH + inProgressCH;
		    let coursesRemaining = (course === "CORE") ? remaining.length : remaining;

		    let courseHeader = [
		    	"\n\n==========================================================================\n",
		    	"Progress through ", course, " (", totalCourses, " courses, ", totalCH, " CH)    ",
		    	coursesRemaining.toString(), " courses (", remainingCH.toString(), "CH) REMAINING\n",
		    	"==========================================================================\n",
		    ]

		    lines = lines.concat(courseHeader)

            if (course === "CORE") lines = lines.concat(["()** indicates equivelent course replacement\n\n",]);

		    let completedBody = [
		    	course, " courses completed:    ", completed.length.toString(), " courses (", completedCH.toString(), "CH)\n",
		    	"---------------------------------------------\n"
		    ]	

            for (let i = 0; i < completed.length; ++i)
            {
                if (i > 1 && i % 5 === 0)
                {
                    completedBody = completedBody.concat([completed[i], "\n"]);
                }
                else
                {
                    completedBody = completedBody.concat([completed[i], ", "]);
                }
            }

            completedBody = completedBody.concat(["\n\n"]);

		    lines = lines.concat(completedBody)

		    let inProgressBody = [
		    	course, " courses in progress:    ", inProgress.length.toString(), " courses (", inProgressCH.toString(), "CH)\n",
		    	"---------------------------------------------\n"
		    ]

            for (let i = 0; i < inProgress.length; ++i)
            {
                if (i > 1 && i % 5 === 0)
                {
                    inProgressBody = inProgressBody.concat([inProgress[i], "\n"]);
                }
                else
                {
                    inProgressBody = inProgressBody.concat([inProgress[i], ", "]);
                }
            }

            inProgressBody = inProgressBody.concat(["\n\n"]);

		    lines = lines.concat(inProgressBody)

		    if (course === "CORE")
            {
		    	let remainingBody = [
		    		course, " courses remaining:    ", remaining.length.toString(), " courses (", remainingCH.toString(), "CH)\n",
		    		"---------------------------------------------\n"
		    	]

                for (let i = 0; i < remaining.length; ++i)
                {
                    if (i > 1 && i % 5 === 0)
                    {
                        remainingBody = remainingBody.concat([remaining[i], "\n"]);
                    }
                    else
                    {
                        remainingBody = remainingBody.concat([remaining[i], ", "]);
                    }
                }

                remainingBody = remainingBody.concat(["\n\n"]);
            
		    	lines = lines.concat(remainingBody)
            }
        }

        return lines.join('');
    }

    // Creates the text file using some stupid html magic <a> tags, thanks google
    const createTxtFile = (filename, text) => {
        const element = document.createElement("a");
        const file = new Blob([text], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    // Fires each time Generate Text Audit button is pressed
    useEffect(() => {
        if (auditLoading)
        {
            // FETCH THE AUDIT INFORMATION FOR EACH STUDENT REQUESTED
            let promiseArr = [];
            for (const key of studentNumbers)
            {
                promiseArr.push(getAuditData(key));
            }

            Promise.all(promiseArr).then(responses => {
                for (const resp of responses)
                {
                    audits[resp["target_student"]["student_number"]] = resp;
                }

                let filename = "";
                let text = "";
                for (const [sid, data] of Object.entries(audits))
                {
                    filename += sid + "-";
                    text += parseAuditData(data);
                }

                filename += "audit.txt"

                createTxtFile(filename, text);

                setAuditLoading(false);
            });
        }
    }, [studentNumbers, audits, auditLoading]);

    const handleClick = () => setAuditLoading(true);

    return (
        <>
		    <Button 
                variant="danger" 
                size="lg"
                disabled={auditLoading}
                onClick={!auditLoading ? handleClick : null}
            >
                Generate Text Audit
            </Button>
        </>
	);
}
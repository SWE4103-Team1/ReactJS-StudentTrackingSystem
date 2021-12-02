import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "react-bootstrap";

import axios from "axios";

import "./styles.css";

export default function TextAuditButton({checked, buttonVariant}) {
    // A dictionary which contains the audit information for each student being audited
    // Key is student number, value is audit information gathered from InAppAudit
    let audits = {};

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

            if (course === "CORE") 
            {
                lines = lines.concat(["()** indicates equivelent course replacement\n\n",]);
            }
            else
            {
                lines = lines.concat(["\n"]);
            }

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

        // CSE TIME!
        let cse = courses["CSE"];
        let totalITS = cse["ITS"]["completed"]["courses"].length + cse["ITS"]["remaining"]["num_courses"] + cse["ITS"]["in_progress"]["courses"].length;
        let totalITSCH = cse["ITS"]["completed"]["credit_hours"] + cse["ITS"]["remaining"]["credit_hours"] + cse["ITS"]["in_progress"]["credit_hours"];
        let totalHSS = cse["HSS"]["completed"]["courses"].length + cse["HSS"]["remaining"]["num_courses"] + cse["HSS"]["in_progress"]["courses"].length;
        let totalHSSCH = cse["HSS"]["completed"]["credit_hours"] + cse["HSS"]["remaining"]["credit_hours"] + cse["HSS"]["in_progress"]["credit_hours"];
        let totalOPEN = cse["OPEN"]["completed"]["courses"].length + cse["OPEN"]["remaining"]["num_courses"] + cse["OPEN"]["in_progress"]["courses"].length;
        let totalOPENCH = cse["OPEN"]["completed"]["credit_hours"] + cse["OPEN"]["remaining"]["credit_hours"] + cse["OPEN"]["in_progress"]["credit_hours"];

        let totalCSECH = totalITSCH + totalHSSCH + totalOPENCH;
        let totalCSERemaining = cse["HSS"]["remaining"]["num_courses"] + cse["ITS"]["remaining"]["num_courses"] + cse["OPEN"]["remaining"]["num_courses"];
        let totalCSECHRemaining = cse["HSS"]["remaining"]["credit_hours"] + cse["ITS"]["remaining"]["credit_hours"] + cse["OPEN"]["remaining"]["credit_hours"];

        let cseHeader = [
            "\n\n==========================================================================\n",
            "Progress through CSE (", totalITS.toString(), " ITS, ", totalHSS.toString(), " HSS, ", 
            totalOPEN.toString(), " OPEN; ", totalCSECH.toString(), "CH)     ",
            totalCSERemaining.toString(), " courses (", totalCSECHRemaining.toString(), ") REMAINING\n",
            "==========================================================================\n",
        ];

        lines = lines.concat(cseHeader);

        for (const [cseCourse, cseData] of Object.entries(cse))
        {
            let completed = cseData["completed"]["courses"];
            let inProgress = cseData["in_progress"]["courses"]

            if (completed.length > 0)
            {
                lines = lines.concat(["CSE-", cseCourse, " ", completed.length.toString(), " (",
                cseData["completed"]["credit_hours"].toString(), "ch) complete: "
                ])

                for (const code of completed)
                {
                    lines = lines.concat([code, ", "])
                }

                lines = lines.concat(["\n"]);
            }

            if (inProgress.length > 0)
            {
                lines = lines.concat(["CSE-", cseCourse, " ", inProgress.length.toString(), " (",
                cseData["in_progress"]["credit_hours"].toString(), "ch) inprogress: "
                ])

                for (const code of inProgress)
                {
                    lines = lines.concat([code, ", "])
                }

                lines = lines.concat(["\n"]);
            }
        }

        lines = lines.concat(["\n\n"]);

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
            for (const key of checked)
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
    }, [checked, audits, auditLoading]);

    const handleClick = () => setAuditLoading(true);

    return (
        <>
		    <Button 
                variant={buttonVariant} 
                size="lg"
                disabled={auditLoading}
                onClick={!auditLoading ? handleClick : null}
            >
                Generate Text Audit
            </Button>
        </>
	);
}
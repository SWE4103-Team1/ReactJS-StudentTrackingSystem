
import {
	
	SelectColumnFilter,
	compareCourseCode,
	compareRank
} from "./Filters";

//  column object used by the react table 
export const columns = [
	{
		Header: " ",
		columns: [
			{
				Header: "Student ID",
				accessor: "student_number",
			},
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Program",
				accessor: "program",
			},
			{
				Header: "Campus",
				accessor: "campus",
				Filter: SelectColumnFilter,
				filter: "includes",
			},
			{
				Header: "Rank",
				accessor: "rank",
				sortType: compareRank,         // custom sort function, param is a comparator function
				Filter: SelectColumnFilter,
			},
			{
				Header: "Status",
				accessor: "status",
				Filter: SelectColumnFilter,
			}
		],
	},
];


// column objects for the transcipt columns
export const columnsTranscripts = [
	{
		Header: " ",
		columns: [
			{
				Header: "Course Code",
				accessor: "Course_Code",
				sortType: compareCourseCode, // custom sort function, param is a comparator function
				disableFilters: true,
			},
			{
				Header: "Course Name",
				accessor: "Course_Name",
				disableFilters: true,
			},
			{
				Header: "Course Type",
				accessor: "Course_Type",
				disableFilters: true,
			},
			{
				Header: "Semester",
				accessor: "Semester",
				disableFilters: true,
			},
			{
				Header: "Section",
				accessor: "Section",
				filter: "includes",
				disableFilters: true,
			},
			{
				Header: "Credit Hours",
				accessor: "Credit_Hours",
				disableFilters: true,
			},
			{
				Header: "Grade",
				accessor: "Grade",
				disableFilters: true,
			},
		],
	},
];

import React from "react";
import Counts from "./counts";
import TextAuditButton from "./textAudits"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TableMasterList } from "./Tables/MasterList";
import { columns } from "./ColumnsFilters/Columns";
import { Modal, Button } from "react-bootstrap";
import { TableTranscript } from "./Tables/Transcript";
import { columnsTranscripts } from "./ColumnsFilters/Columns";
import {Audit} from './Tables/InAppAudit'
import {InAppAudit, makeData, makeTranscript} from './makeData'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



function App() {
	// TOP LEVEL STATES
	// state to store the master student list data
	const [data, setData] = React.useState([]);
	const [TranscriptData, setTranscriptData] = React.useState([]);   // data state for transcript
	const [showAudit, setShowAudit] = React.useState(false);  		// state to toggle between in-app audit and transcript
	const [advancedKey, advancedKeySet] = React.useState([]);		// state to hold the student number of the student that is selected to view transcript 
	const [transcriptLoading, settranscriptLoading] = React.useState(false) // state to tell us when the app is waiting for data from api 
	const [transcriptInfo, setTranscriptInfo] = React.useState({
		name: '',
		program: '',
		campus: '',
		rank: '',
		status: '',
	});     // state for the student data displayed in transcript on left hand side
	const [checkedSIDs, setCheckedSIDs] = React.useState([]);
	const [auditData, setAuditData] = React.useState({})	// state for holding the audit data
	const [modalShow, setModalShow] = React.useState(false);   // state to toggle whether the modal is shown or not 


	
	// functions to handle opening and closing the transcript / in-app audit modal
	const handleClose = () => setModalShow(false);
	const handleShow = () => setModalShow(true);


	// Side effect that gets called on render.
	// fetches the master list data and sets state
	React.useEffect(() => {
		(async () => {
			await makeData(setData);
		})();
	}, []);

	// Side effect that gets called on render and when the user selects a row or student
	// fetches data for the in - app audit and the transcript 
    React.useEffect(() => {
		(async () => {
			await InAppAudit(advancedKey,setAuditData);
			await makeTranscript(advancedKey, setTranscriptData, settranscriptLoading);
		})();

		
	}, [advancedKey]);



/* react functional component: This component diaplays the 
	modal when a specific row is selected.
	param: audit:boolean ; tells us whether the user wants to view in-app audit or the transcript
	*/
	function Transcript({audit}) {
	
		if(!audit && !transcriptLoading){
			// what the user wants to view the transcript 
			// the jsx returned in this function is the transcript
			return( <>
				
			   <Modal
						show={modalShow}
						onHide={handleClose}
						aria-labelledby='example-modal-sizes-title-lg'
						size='xl'>
						<Modal.Header closeButton>
						
						<Button  size="lg" variant='outline-secondary'  onClick = {() => setShowAudit(false)}>Transcript</Button>
						<Button  size="lg" variant='outline-secondary'  onClick = {() => setShowAudit(true)}>Audit</Button>
						</Modal.Header>
						<Modal.Body>
						<div className='row_modal'>
				   <div className='column_modal'>
					   <TableTranscript
						   columns={columnsTranscripts}
						   data={TranscriptData}></TableTranscript>
				   </div>
				   <div className='column_modal'>
					   <h1 style={{ fontFamily: "sans-serif" }}>{transcriptInfo.name}</h1>
					   <br />
					   <h4 style={{ fontFamily: "sans-serif" }}>{advancedKey}</h4>
					   
					   <h4 style={{ fontFamily: "sans-serif" }}>{transcriptInfo.program}</h4>
					   
					   <h4 style={{ fontFamily: "sans-serif" }}>{transcriptInfo.campus}</h4>
					   
					   <h4 style={{ fontFamily: "sans-serif" }}>{transcriptInfo.rank}</h4>
					   
					   <h4 style={{ fontFamily: "sans-serif" }}>{transcriptInfo.status}</h4>
					   
				   </div>
			   </div> 
							
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
			   </> );
		}
		else if(audit ){
			// this is shown when the user wants to view the in-app audit
			// the jsx returned is the in-app audit 
			return (
			
			
			<Modal
						show={modalShow}
						onHide={handleClose}
						aria-labelledby='example-modal-sizes-title-lg'
						size='xl'>
						<Modal.Header closeButton>
						
						<Button  size="lg" variant='outline-secondary'  onClick = {() => setShowAudit(false)}>Transcript</Button>
						<Button  size="lg" variant='outline-secondary'  onClick = {() => setShowAudit(true)}>Audit</Button>
						</Modal.Header>
						<Modal.Body>
							
<<<<<<< HEAD
						<div style = {{boxShadow: "1px 3px 1px #9E9E9E", display: "inline-block"}}><Button  size="lg" variant='outline-secondary'>Generate Text Audit</Button>
			{/* Actual in-app audit component, stored in  InAppAudit */}
			<Audit data = {auditData} ></Audit>
			
			</div>
=======
						<div style = {{boxShadow: "1px 3px 1px #9E9E9E", display: "inline-block"}}>
							<TextAuditButton checked={[advancedKey[1]]} buttonVariant='outline-secondary'></TextAuditButton>
							<Audit data = {auditData} ></Audit>
						</div>
>>>>>>> c32a1f0606ddcdf64b29c7c70a88d078d4c47699
							
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>);

		}
		else{

			// show loading modal
			// this will be hidden once all the data is loaded
			return (
				<Modal
						show={modalShow}
						onHide={handleClose}
						aria-labelledby='example-modal-sizes-title-lg'
						size='xl'>
						<div className="spin"></div>
					</Modal>
			);
		}
			
		
		
			

		
		
	}
	return (
		<>
			<div className='master-container'>			
				<div className='div-table'>	
				{/* Transcript / In - App audit parent component*/}				
					<Transcript audit = {showAudit}></Transcript>    
					{/* master student list component */}
					<TableMasterList    
						columns={columns}
						data={data}
						modalClose={handleClose}
						modalOpen={handleShow}
						modalState={modalShow}
						selectKey={advancedKeySet}
						selectRow={setTranscriptInfo}
						updateChecked={setCheckedSIDs}
						setTranLoad={settranscriptLoading}
					/>
							
				</div>
				<div className='div-textAudit'>
					{/* Text Audit Button component */}
					<TextAuditButton checked={checkedSIDs} buttonVariant='danger'></TextAuditButton>
				</div>
				<div className='div-counts'>
					{/* student counts components */}
					<Counts></Counts>
				</div>
			</div>
		</>
	);
}

export default App;

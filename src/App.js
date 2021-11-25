import React from "react";
import styled from "styled-components";

import Counts from "./counts";
// A great library for fuzzy filtering/sorting items

import "./App.css";
import { makeData, makeTranscript } from "./makeData";

import "bootstrap/dist/css/bootstrap.min.css";
import { TableMasterList } from "./Tables/MasterList";

import { columns } from "./ColumnsFilters/Columns";
import { transcriptModal } from "./Modal/TranscriptModal";

import { Button, Nav } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { TableTranscript } from "./Tables/Transcript";
import { columnsTranscripts } from "./ColumnsFilters/Columns";
import {Audit} from './Tables/InAppAudit'

import {InAppAudit} from './makeData'
function App() {
	const [data, setData] = React.useState([]);
	const [TranscriptData, setTranscriptData] = React.useState([]);
	const [showAudit, setShowAudit] = React.useState(false);
	const [advancedKey, advancedKeySet] = React.useState([]);
	const [transcriptInfo, setTranscriptInfo] = React.useState({
		name: '',
		program: '',
		campus: '',
		rank: '',
		status: '',
	});
	

	const [modalShow, setModalShow] = React.useState(false);
	const handleClose = () => setModalShow(false);
	const handleShow = () => setModalShow(true);
	const handleShowAudit = () => setShowAudit(true);
	const handleCloseAudit = () => setShowAudit(false);


	console.log(modalShow);
	React.useEffect(() => {
		(async () => {
			await makeData(setData);
		})();
	}, []);

	React.useEffect(() => {
		(async () => {
			await makeTranscript(advancedKey, setTranscriptData);
		})();
	}, [advancedKey]);

	const [auditData, setAuditData] = React.useState({})
   

    React.useEffect(() => {
		(async () => {
			await InAppAudit(advancedKey,setAuditData);
		})();

		
	}, [advancedKey]);
	function handleTabs(eventKey) {
		
		if(eventKey === false){
			setShowAudit(false)
		}
		else{
			setShowAudit(true)
		}
		
	}




	function Transcript({audit}) {
		console.log("Tranny",advancedKey)
		if(!audit){
			return( <>
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
			   </> );
		}
		else{
			return (<div><Button  size="lg" variant='outline-secondary'>Generate Text Audit</Button>
			
			<Audit data = {auditData} ></Audit>
			
			</div>);

		}
			
		
		
			

		
		
	}
	return (
		<>
			<Button  size="lg" variant='outline-secondary'>Generate Text Audit</Button>
			<br />
			<div className='master-container'>
			
				<div className='div-table'>
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
							
						<Transcript audit = {showAudit}></Transcript>
							
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
					<TableMasterList
						columns={columns}
						data={data}
						modalClose={handleClose}
						modalOpen={handleShow}
						modalState={modalShow}
						selectKey={advancedKeySet}
						selectRow={setTranscriptInfo}
					/>
					{/* <Nav variant="tabs"  onSelect={(e)=>setShowAudit(e)} >
							<Nav.Item>
								<Nav.Link eventKey= {false}>Transcript</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey= {true}>Audit</Nav.Link>
							</Nav.Item>
							
						</Nav> */}
					
							
				</div>
				<div className='div-counts'>
					<Counts></Counts>
				</div>
			</div>
		</>
	);
}

export default App;

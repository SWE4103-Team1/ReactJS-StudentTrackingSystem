import React from "react";
import styled from "styled-components";

import Counts from "./counts";
import TextAuditButton from "./textAudits"
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
import LoadingOverlay from 'react-loading-overlay';
import {InAppAudit} from './makeData'
import Loader from "react-loader-spinner";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// async function  fetchData(advancedKey,setAuditData, setTranscriptData ) {
// 	let getURL = window.location.hostname;
	
	
// 	const TranscriptURL = ''
// 	const AuditURL = ''

// 	const trans = axios.get(TranscriptURL)
// 	const audit = axios.get(AuditURL)

// 	axios.all([trans, audit]).then(
// 		axios.spread((...allData)=> {

// 		})
// 	)



// 	let getURL = window.location.hostname;
//     if(key.length !== 0){
//       if(getURL === 'localhost' || getURL === '127.0.0.1'){
      
//         const url = "http://"+ getURL + ":8000/get_transcript/" + key[1] + "";

// 		const TranscriptURL = 'http://"+ getURL + ":8000/get_transcript/" + key[1] + "'
// 		const AuditURL = ''
//         const response = await fetch(url);
//         const data = await response.json();
//         settranscriptLoading(false)
    
//         return setData(data);
//       }
//       else{
        
//         const url = "http://"+ getURL + "/get_transcript/" + key[1] + "";
//         const response = await fetch(url);
//         const data = await response.json();
       
//         settranscriptLoading(false)
//         return setData(data);
//       }
    
//     }
// }


function App() {
	const [data, setData] = React.useState([]);
	const [TranscriptData, setTranscriptData] = React.useState([]);
	const [showAudit, setShowAudit] = React.useState(false);
	const [advancedKey, advancedKeySet] = React.useState([]);
	const [transcriptLoading, settranscriptLoading] = React.useState(false)
	const [isActive, setisActive] = React.useState(false);
	const [auditLoading, setauditLoading] = React.useState(true)
	const [transcriptInfo, setTranscriptInfo] = React.useState({
		name: '',
		program: '',
		campus: '',
		rank: '',
		status: '',
	});

	// Holds a list of student numbers for the currently checked rows within the master list
	const [checkedSIDs, setCheckedSIDs] = React.useState([]);
	
	const [modalShow, setModalShow] = React.useState(false);
	const handleClose = () => setModalShow(false);
	const handleShow = () => setModalShow(true);
	const handleShowAudit = () => setShowAudit(true);
	const handleCloseAudit = () => setShowAudit(false);


	React.useEffect(() => {
		(async () => {
			await makeData(setData);
		})();
	}, []);


	const [auditData, setAuditData] = React.useState({})
   

    React.useEffect(() => {
		(async () => {
			await InAppAudit(advancedKey,setAuditData);
			await makeTranscript(advancedKey, setTranscriptData, settranscriptLoading);
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
	
		if(!audit && !transcriptLoading){
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
							
						<div style = {{boxShadow: "1px 3px 1px #9E9E9E", display: "inline-block"}}><Button  size="lg" variant='outline-secondary'>Generate Text Audit</Button>
			
			<Audit data = {auditData} ></Audit>
			
			</div>
							
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>);

		}
		else{
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
					
					
					
					<Transcript audit = {showAudit}></Transcript>
					
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
					{/* <Nav variant="tabs"  onSelect={(e)=>setShowAudit(e)} >
							<Nav.Item>
								<Nav.Link eventKey= {false}>Transcript</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey= {true}>Audit</Nav.Link>
							</Nav.Item>
							
						</Nav> */}
					
							
				</div>
				<div className='div-textAudit'>
					<TextAuditButton checked={checkedSIDs} buttonVariant='danger'></TextAuditButton>
				</div>
				<div className='div-counts'>
					<Counts></Counts>
				</div>
			</div>
		</>
	);
}

export default App;

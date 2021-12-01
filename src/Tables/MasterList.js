// Our table component
import {
	fuzzyTextFilterFn,
	DefaultColumnFilter,
} from "../ColumnsFilters/Filters";
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useSortBy,
	useRowSelect,
	useAsyncDebounce,
} from "react-table";
import React from "react";

import {
	CheckBox
} from '../checkBox'



// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export function TableMasterList({
	columns,
	data,
	modalClose,
	modalOpen,
	modalState,
	selectKey,
	selectRow,
	updateChecked,
}) {
	function enterAdvanced(row, cell) {
		if(cell.column.id !== "selection"){
			const key = row.cells.map((cell) => {
				if (cell.column.id === "student_number") {
					return cell.value;
				}
			});
			const name = row.cells.map((cell) => {
				if (cell.column.id === "name") {
					return cell.value;
				}
			});
			const rank = row.cells.map((cell) => {
				if (cell.column.id === "rank") {
					return cell.value;
				}
			});
			const program = row.cells.map((cell) => {
				if (cell.column.id === "program") {
					return cell.value;
				}
			});
			const status = row.cells.map((cell) => {
				if (cell.column.id === "status") {
					return cell.value;
				}
			});
			const campus = row.cells.map((cell) => {
				if (cell.column.id === "campus") {
					return cell.value;
				}
			});
			modalOpen();
			selectRow({
				name: name,
				program: program,
				campus: campus,
				rank: rank,
				status: status,
			});
			selectKey(key);
		
		}
		
	}
	const filterTypes = React.useMemo(
		() => ({
			// Add a new fuzzyTextFilterFn filter type.
			fuzzyText: fuzzyTextFilterFn,
			// Or, override the default text filter to use
			// "startWith"
			text: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? String(rowValue)
								.toLowerCase()
								.startsWith(String(filterValue).toLowerCase())
						: true;
				});
			},
		}),
		[]
	);

	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		selectedFlatRows,
		visibleColumns,
	} = useTable(
		{
			columns,
			data,
			defaultColumn, // Be sure to pass the defaultColumn option
			filterTypes,
		},
		useFilters, // useFilters!
		useGlobalFilter,
		useSortBy,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<div><CheckBox {...getToggleAllRowsSelectedProps()} /></div>
							
						),
						Cell: ({ row }) => (
							<CheckBox {...row.getToggleRowSelectedProps()} />
						),
					},
					...columns,
				];
			});
		}
		);// useGlobalFilter!

	// Update the list of checked students
	React.useEffect(() => {
		let SIDs = [];
		for (const row of selectedFlatRows)
		{
			row.cells.map((cell) => {
				if (cell.column.id === "student_number") {
					SIDs.push(cell.value);
				}
			});
		}

		updateChecked(SIDs);

	}, [selectedFlatRows]);


	// We don't want to render all of the rows for this example, so cap
	// it for this use case
	const firstPageRows = rows;

	return (
		<>
			<table className='styled-table' {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									{/* Render the columns filter UI */}
									<div>
										{column.canFilter ? column.render("Filter") : null}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? "🔽"
													: "🔼"
												: ""}{" "}
										</span>
									</div>
								</th>
							))}
						</tr>
					))}
					<tr>
						<th colSpan={visibleColumns.length}></th>
					</tr>
				</thead>
				<tbody {...getTableBodyProps()}>
					{firstPageRows.map((row, i) => {
						prepareRow(row);
						return (
							<tr
								className='List_Row'
								
								{...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td onClick={() => enterAdvanced(row, cell)} className='table-td-cell' {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<pre>
					<div> {
					selectedFlatRows.map((row, index) =>{
						prepareRow(row);
						if(index === 0){
							return (
								<>
								<tr><td></td> <td style = {{padding: "10px"}}>Student Number</td><td style = {{padding: "10px"}}>Name</td><td style = {{padding: "10px"}}>Program</td><td style = {{padding: "10px"}}>Campus</td><td style = {{padding: "10px"}}>Rank</td><td style = {{padding: "10px"}}>status</td></tr>
								<tr
									style ={{padding:"15px"}}								
									{...row.getRowProps()}>  
									{row.cells.map((cell) => {
										return (
											<td onClick={() => enterAdvanced(row, cell)} style = {{padding: "15px"}} {...cell.getCellProps()}>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>  </>
						)
						}
						else{
							return (
								<tr
									style ={{padding:"15px"}}								
									{...row.getRowProps()}>  
									{row.cells.map((cell) => {
										return (
											<td onClick={() => enterAdvanced(row, cell)} style = {{padding: "15px"}} {...cell.getCellProps()}>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
						)
						}
					})}</div>
				
								<code>
									{JSON.stringify(
										{
											//selectedRows: selectedFlatRows.map((row) => row.original),
										},
										null,
										2
									)}  
								</code>
							</pre>
			<br />
		</>
	);
}

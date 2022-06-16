import React, { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Audit = () => {
	const [adminUSers, setAdminUsers] = useState([]);
	const navigate = useNavigate();
	console.log(adminUSers);

	const getAllAdminUSers = useCallback(async () => {
		try {
			const response = await axiosInstance.get("/audits/admin");
			setAdminUsers((old) => response.data.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		getAllAdminUSers();
	}, [getAllAdminUSers]);

	const heading = ["S/N", "Name", "Email", "Phone"];

	const viewUsers = (id, userName) => {
		navigate(`/audit/${id}`, { state: { id: id, name: userName } });
	};

	return (
		<MainContainer>
			<div>
				<div className=" bg-white  px-6 py-10 border rounded-lg">
					<table className="table-auto w-full   ">
						<thead>
							<tr className="">
								{heading?.map((item, index) => (
									<th key={index} className="">
										<p className="text-left  font-bold">
											{item}
										</p>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{adminUSers?.map((item, index) => (
								<tr
									key={index}
									className="h-16 hover:bg-gray-100 px-2 mt-6 cursor-pointer "
									onClick={() =>
										viewUsers(item.id, item.name)
									}
								>
									<td>{index + 1}</td>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.phone}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</MainContainer>
	);
};

export default Audit;

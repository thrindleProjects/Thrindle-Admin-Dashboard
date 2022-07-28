import React, { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation } from "react-router-dom";
// import AdminUserTable from "../../components/AdminUser/AdminUserTable";
import ReactPaginate from "react-paginate";

const AdminUser = () => {
	const [user, setUser] = useState([]);
	const [pageInfo, setPageInfo] = useState([]);

	const [error, setError] = useState(false);

	const location = useLocation();
	console.log(pageInfo);
	const id = location?.state?.id;

	const getUserDetails = useCallback(async () => {
		try {
			const response = await axiosInstance.get(
				`/audits/${id}?service_updated=product`
			);
			setUser((old) => response.data.data);
			setPageInfo((old) => response.data.pageInfo);
		} catch (error) {
			console.log(error);
			setError(true);
		}
	}, [id]);

	useEffect(() => {
		getUserDetails();
	}, [getUserDetails]);

	const currentPage = pageInfo?.next?.page - 1;
	const prevPage = currentPage - 1;
	const nextPage = pageInfo?.next?.page;
	const totalPages = Math.ceil(pageInfo?.totalAudits / 20);

	const handleNextPage = useCallback(async () => {
		try {
			const response = await axiosInstance.get(
				`/audits/${id}?service_updated=product&page=${nextPage}`
			);
			setUser((old) => response.data.data);
			setPageInfo((old) => response.data.pageInfo);
		} catch (error) {
			console.log(error);
			setError(true);
		}
	}, [id, nextPage]);

	const handlePrevPage = useCallback(async () => {
		try {
			const response = await axiosInstance.get(
				`/audits/${id}?service_updated=product&page=${prevPage}`
			);
			setUser((old) => response.data.data);
			setPageInfo((old) => response.data.pageInfo);
		} catch (error) {
			console.log(error);
			setError(true);
		}
	}, [id, prevPage]);

	// const heading = [
	// 	"S/N",
	// 	"Image",
	// 	"Name",
	// 	"Price",
	// 	"Market",
	// 	"Category",
	// 	"Action",
	// ];

	if (error) {
		return <p>An ERROR OCCURRED, PLEASE RELOAD THIS PAGE</p>;
	}

	return (
		<MainContainer>
			<div className=" flex mb-10 justify-between text-lg font-bold">
				<p>{location?.state?.name}</p>
				{pageInfo  && (
					<>
						<p>Total: {pageInfo?.totalAudits}</p>
						<p>
							page {currentPage} of {totalPages}
						</p>
					</>
				)}
			</div>
			<div className="flex justify-end mb-6 gap-4">
				{pageInfo?.previous?.page && <p
					className="cursor-pointer text-md font-bold"
					onClick={handlePrevPage}
				>
					prev
				</p>}
				{pageInfo?.next?.page && <p
					className="cursor-pointer text-md font-bold"
					onClick={handleNextPage}
				>
					next
				</p>}
			</div>

			<div>
				{user.map((user, index) => (
					<div key={user.id}>
						<div className="test text-gray-600 gap-6 text-xs text-left cursor-pointer hover:bg-gray-100 hover:shadow-lg p-4 rounded-lg   px-4 ">
							<p>{index + 1}</p>
							<img
								alt=""
								className="w-20 h-10 "
								src={`https://api.thrindle.com/api/thrindle/images/${user?.product?.images[0]}`}
							/>
							<p className="w-36">{user?.product?.name}</p>
							<p>
								N{" "}
								{user?.product?.original_price.toLocaleString()}
								.00
							</p>
							<p> {user?.product?.market.name}</p>
							<p> {user?.product?.category.name}</p>
							<p> {user?.action}</p>
							<p>
								
								{new Date(
									user?.product?.createdAt
								).toLocaleDateString()}
							</p>
							<p>
								
								{new Date(
									user?.product?.updatedAt
								).toLocaleDateString()}
							</p>
						</div>
						<hr />
					</div>
				))}
			</div>
		</MainContainer>
	);
};

export default AdminUser;

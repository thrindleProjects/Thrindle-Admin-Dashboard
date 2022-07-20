import React, { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation } from "react-router-dom";
// import AdminUserTable from "../../components/AdminUser/AdminUserTable";
import ReactPaginate from "react-paginate";

const AdminUser = () => {
	const [user, setUser] = useState([]);
	const [error, setError] = useState(false)

	const location = useLocation();
	console.log(user);
	const id =location?.state?.id

	const getUserDetails = useCallback(async () => {
		try {
			const response = await axiosInstance.get(
				`/audits/${id}?service_updated=product`
			);
			setUser((old) => response.data.data);
			console.log(response)
		} catch (error) {
			console.log(error);
			setError(true)
		}
	}, [id]);

	useEffect(() => {
		getUserDetails();
	}, [getUserDetails]);

	// const heading = [
	// 	"S/N",
	// 	"Image",
	// 	"Name",
	// 	"Price",
	// 	"Market",
	// 	"Category",
	// 	"Action",
	// ];
	const [pageNumber, setPageNumber] = useState(0);

	const usersPerPage = 10;

	const pagesVisited = pageNumber * usersPerPage;

	const displayProducts = user
		.slice(pagesVisited, pagesVisited + usersPerPage)
		.map((user, index) => {
			return (
				<div key={user.id}>
					<div className="test text-gray-600 gap-10 text-sm w text-left cursor-pointer hover:bg-gray-100 hover:shadow-lg p-4 rounded-lg   px-4 ">
						<p>{index + 1}</p>
						<img
							alt=""
							className="w-20 h-10 "
							src={`https://api.thrindle.com/api/thrindle/images/${user?.product?.images[0]}`}
						/>
						<p className="w-36">{user?.product?.name}</p>
						<p>
							N {user?.product?.original_price.toLocaleString()}
							.00
						</p>
						<p> {user?.product?.market.name}</p>
						<p> {user?.product?.category.name}</p>
						<p> {user?.action}</p>
						<p> {new Date(user?.product?.createdAt).toLocaleDateString()}</p>
					</div>
					<hr />
				</div>
			);
		});

	const pageCount = Math.ceil(user.length / usersPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	if (error) {
		return (
			<p>An ERROR OCCURRED, PLEASE RELOAD THIS PAGE</p>
		)
	}

	return (
		<MainContainer>
			<div className=" flex mb-10 justify-between">
				<p>{location?.state?.name}</p>
				<p>Total: {user?.length}</p>
			</div>
			<div className=" flex justify-end mb-10 ">
				<div>
					<ReactPaginate
					breakLabel="..."
					previousLabel={"<"}
					nextLabel={">"}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={"paginationBtns"}
					previousLinkClassName={"prevBtn"}
					nextLinkClassName={"nextBtn"}
					disabledClassName={"paginationDisabled"}
					activeClassName={"paginationActive"}
					pageRangeDisplayed={2}
					marginPagesDisplayed={2}
				/>
				</div>
			</div>
			<div className="  ">{displayProducts}</div>
			
		</MainContainer>
	);
};

export default AdminUser;

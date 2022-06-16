import React, { useState, useEffect } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import { useSelector, useDispatch } from "react-redux";
import { withdrawData } from "../../redux/actions/withdraw/WithdrawAction";
import ReactPaginate from "react-paginate";
import NewLoader from "../../components/newLoader/newLoader";
const Withdraw = () => {
	const login = useSelector((state) => state.login);
	const name = login?.user?.name;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(withdrawData());
	}, [dispatch]);

	const { data, loading, error } = useSelector((state) => state?.withdraw);

	const [pageNumber, setPageNumber] = useState(0);

	const usersPerPage = 10;

	const pagesVisited = pageNumber * usersPerPage;
	const displayProducts = data
		.slice(pagesVisited, pagesVisited + usersPerPage)
		.map((user, index) => {
			return (
				<div key={user.id}>
					<div className="withdraw text-gray-600 gap-10 w-full text-sm w text-left cursor-pointer hover:bg-gray-100 hover:shadow-lg p-4 rounded-lg   px-4 ">
						<p>{index + 1}</p>

						<p className="w-36">
							{user?.store?.owner_id?.name
								? user?.store?.owner_id?.name
								: "N/A"}
						</p>
						<p>
							N {user?.amount.toLocaleString()}
							.00
						</p>
						<p>
							{" "}
							{user?.store?.owner_id?.phone
								? user?.store?.owner_id?.phone
								: "N/A"}
						</p>
						<p> {user?.store?.owner_id?.store_id ? user?.store?.owner_id?.store_id :"N/A"}</p>
						<p className ={user?.status === "pending" ? "text-[#F69F13]":" text-green-600"}> {user?.status}</p>
						<p> {new Date(user?.createdAt).toLocaleDateString()}</p>
					</div>
					<hr />
				</div>
			);
		});

	const pageCount = Math.ceil(data.length / usersPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	if (loading) {
		return (
			<MainContainer>
				<div className="w-full h-96">
					<NewLoader />
				</div>
			</MainContainer>
		);
    }
    
    if (error) {
        return (
            <MainContainer>
                <p>An error has occurred, Reload page</p>
            </MainContainer>
        )
    }
	return (
		<MainContainer>
			<div>
				{name !== "Administrator" ? (
					<p>You are not authorized to view this page</p>
				) : (
					<>
						<div>
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
						</div>
					</>
				)}
			</div>
		</MainContainer>
	);
};

export default Withdraw;

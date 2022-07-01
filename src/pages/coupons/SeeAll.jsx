import React, { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import axiosInstance from "../../utils/axiosInstance";
import styled from "styled-components";
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";

const SeeAll = () => {
	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);
	const [code, setCode] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	console.log(data);

	const heading = [
		"Name",
		"Code",
		"Value",
		"Times Used",
		"Created At",
		"should be used",
		"Expires in",
		"Valid"
	];
	const getAllCoupons = useCallback(async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/coupons");
			setData((old) => response.data.data);
			setLoading(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getAllCoupons();
	}, [getAllCoupons]);

	const formateDate = (date) => {
		return new Date(date).toLocaleDateString();
	};

	const deleteCoupon = async () => {
		try {
			await axiosInstance.delete(`/coupons/${code}`);
			setModal(false);
			toast.success(`🦄 Coupon deleted Successfully}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			console.log(error);
			toast.error(`🦄An error occurred, try again later}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const DeleteModal = () => {
		return (
			<div
				className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
				style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
			>
				<div className="bg-white-main h-[10rem] p-10 shadow-lg rounded-xl w-96">
					<p className="font-bold">Are you sure???</p>
					<div className="flex gap-6 mt-10">
						<p className="cursor-pointer" onClick={() =>setModal(false)}>Cancel</p>
						<p onClick={deleteCoupon} className="text-red-600 cursor-pointer">
							Delete
						</p>
					</div>
				</div>
			</div>
		);
	};

	if (error) {
		return (
			<MainContainer>
				<p className="text-red-600 text-2xl text-center py-10">
					An error occurred, Try Reloading the page
				</p>
			</MainContainer>
		);
	}
	if (loading) {
		return (
			<MainContainer>
				<NewLoader />
			</MainContainer>
		);
    }
    if (data.length === 0 && !error && !loading) {
        return (
            <MainContainer>
                <p className=" text-2xl text-center py-32">
					There is no coupons available, start adding jare
				</p>
            </MainContainer>
        )
    }
	return (
		<MainContainer>
			{data.length > 0 && !error && (
				<div>
					{modal && <DeleteModal />}
					<Table class="table-fixed w-full">
						<thead>
							<tr>
								{heading.map((item, index) => (
									<th className="text-center" key={index}>
										{item}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={index} className="text-center  py-3">
									<th className="p-6  font-normal text-sm">
										{item?.name}
									</th>
									<th className="p-6  font-normal text-sm">
										{item?.code}
									</th>
									<th className="p-6  font-normal text-sm">
										{item?.value}
									</th>
									<th className="p-6  font-normal text-sm">
										{item?.timesUsed} times
									</th>

									<th className="p-6  font-normal text-sm">
										{formateDate(item?.createdAt)}
									</th>
									<th className="p-6  font-normal text-sm">
										{item?.usage} times
									</th>

                                    <th className="p-6  font-normal text-sm">
                                        
										{item?.expiresIn}
									</th>
									<th className="p-6  font-normal text-sm">
                                        
										{item?.valid? "Yes" :"Expired"}
									</th>
									<th
										className="p-6  font-normal text-sm text-red-600 cursor-pointer"
										onClick={() => {
											setModal(true);
											setCode(item?.code);
										}}
									>
										Delete
									</th>

									<th className="p-6  font-normal text-sm">
										Update
									</th>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</MainContainer>
	);
};

export default SeeAll;

const Table = styled.table`
	width: 100%;

	tbody tr:nth-child(odd) {
		background-color: #f4f4f4;
	}

	tbody tr:nth-child(even) {
		background-color: #fff;
	}
`;

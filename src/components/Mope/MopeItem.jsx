import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import NewLoader from "../../components/newLoader/newLoader";

const MopeItem = ({ id, setDetailsModal }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const getItemDetails = useCallback(async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get(
				`https://api.thrindle.com/api/thrindle/mope/${id}`
			);
			setData(response.data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(true);
		}
	}, [id]);

	useEffect(() => {
		getItemDetails();
	}, [getItemDetails]);

	const formateDate = (date) => {
		return new Date(date).toLocaleDateString();
	};

	return (
		<div
			className="fixed  top-0 left-0 right-0 flex justify-center items-center bottom-0"
			style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100000000 }}
		>
			<div className="bg-white-main overflow-y-scroll h-[70%] w-[50%] p-10 ">
				{loading && <NewLoader />}
				{!loading && !error && (
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 ml-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1}
							onClick={() => setDetailsModal(false)}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
						<div>
              <div className="flex gap-6 justify-center items-center">
                {data?.images?.map((item, index) => (
								<div key={index}>
										<img
											src={
												"https://api.thrindle.com/api/thrindle/images/" +
												item
											}
											className="w-[200px] rounded-lg h-[200px]"
											alt="product-img"
										/>
								</div>
							))}
              </div>
							<div>
								<p className="text-center text-2xl my-10">Customer Details</p>
								<p className="my-4 text-md">Name: {data?.cusName}</p>
								<p className="my-4 text-md">Email: {data?.cusEmail}</p>
								<p className="my-4 text-md">Phone: {data?.phone}</p>
							</div>

							{/* product details */}
							<div>
								<p className="text-center  text-2xl my-10">Product Details</p>
								<p className="my-4 text-md">Name: {data?.name}</p>
								<p className="my-4 text-md">Description: {data?.description}</p>
								<p className="my-4 text-md">Market: {data?.market?.name}</p>

								<p className="my-4 text-md">Category: {data?.category?.name}</p>
								<p className="my-4 text-md">Details: {data?.details}</p>
								<p className="my-4 text-md">
									Date Requested:{" "}
									{formateDate(data?.createdAt)}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MopeItem;

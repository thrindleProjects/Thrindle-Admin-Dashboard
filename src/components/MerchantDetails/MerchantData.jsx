import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import MerchantHeader from "./MerchantHeader";
import NewLoader from "../newLoader/newLoader";

function MerchantData() {
	const [loadingProfile, setLoadingProfile] = useState(true);
	const [data, setData] = useState(null);

	let { store_id } = useParams();

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			const fetchProducts = async () => {
				try {
					let res = await axiosInstance.get(
						`stores/data/${store_id}`
					);
					setData(res.data.data);

					setLoadingProfile(false);
				} catch (error) {
					if (error.response) {
						console.log(error.response);
						toast.warning(`${error.response.data.message}`);
					} else {
						toast.error(`${error}`);
					}
				} finally {
					setLoadingProfile(false);
				}
			};

			fetchProducts();
		}

		return () => {
			mounted = false;
		};
	}, [store_id]);
	const heading = ["S/N", "Amount", "Date", "Status"];
	const heading2 = ["S/N", "Buyer's Name", "Buyer's Email", "Date", ];

	return (
		<div className="rounded-md shadow-md w-full mb-20">
			<MerchantHeader text="Merchant's Data" />
			{loadingProfile && (
				<div className="h-vh40">
					<NewLoader />
				</div>
			)}
			{!loadingProfile && data !== null && (
				<>
					<div className="px-6 ">
						<p className="my-4 text-sm ">
							Total Earnings : N {data?.TotalEarnings}
						</p>
						<p className="my-4 text-sm ">
							Balance: N {data?.WalletBalance}
						</p>
					</div>
					<div>
						{data.WalletTransactions.length !== 0 && (
							<div className=" bg-white  px-6 py-10 border rounded-lg">
								<h1 className="my-6 ">Withdrawals</h1>

								<table className="table-auto w-full   ">
									<thead>
										<tr className="">
											{heading?.map((item, index) => (
												<th key={index} className="">
													<p className="text-left text-sm font-bold">
														{item}
													</p>
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{data?.WalletTransactions?.map(
											(item, index) => (
												<tr
													key={index}
													className="h-16 hover:bg-gray-100 px-2 mt-6 cursor-pointer text-sm"
												>
													<td>{index + 1}</td>
													<td> N {item.amount}</td>
													<td>
														{new Date(
															item?.createdAt
														).toLocaleDateString()}
													</td>
													<td>{item.status}</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						)}
					</div>

					{/* store orders */}
					{data.StoreOrders.length !== 0 && (
						<>
							<h1 className="my-6 px-6 text-brand-color">
								Store Orders
							</h1>
							<div>
								<div className=" bg-white  px-6 py-10 border rounded-lg">
									<table className="table-auto w-full   ">
										<thead>
											<tr className="">
												{heading2?.map(
													(item, index) => (
														<th
															key={index}
															className=""
														>
															<p className="text-left  font-bold">
																{item}
															</p>
														</th>
													)
												)}
											</tr>
										</thead>
										<tbody>
											{data?.StoreOrders?.map(
												(item, index) => (
													<tr
														key={index}
														className="h-16 hover:bg-gray-100 px-2 text-sm mt-6 cursor-pointer "
													>
														<td>{index + 1}</td>
														<td>
															{item.buyer?.name}
														</td>
														<td>
															{item.buyer?.email}
														</td>

														<td>
															{new Date(
																item?.buyer?.createdAt
															).toLocaleDateString()}
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default MerchantData;

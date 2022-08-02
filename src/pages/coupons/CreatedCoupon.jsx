import React from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import PrimaryInput from "../../components/input/PrimaryInput";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CreateCoupon = () => {
	// const [loading, setLoading] = useState(false)
	const login = useSelector((state) => state.login);
	const name = login?.user?.name;
	return (
		<MainContainer>
			<div className="pl-0 m-0 max-w-xl">
				{name !== "Administrator" ? (
					<p>You are not authorized to view this page</p>
				) : (
					<>
						<div>
							<p className="text-2xl  font-bold mb-10">
								Create a coupon{" "}
								<p className="text-sm font-light">
									(Note:Each coupon must be created with
									either "Number of usage" or "Expiry
									duration")
								</p>
							</p>
							<Link to="/see-all-coupons">
								<p className="text-right text-primary-light text-sm">{`See all >>`} </p>
							</Link>
							<div>
								<Formik
									initialValues={{
										name: "",
										code: "",
										value: "",
										usage: "",
										expiresIn: "",
									}}
									validationSchema={Yup.object({
										code: Yup.string().required(
											"This field is required"
										),
										name: Yup.string().required(
											"This field is required"
										),
										value: Yup.string().required(
											"This field is required"
										),
										// usage: Yup.string().required(
										// 	"This field is required"
										// ),
										// 	expiresIn: Yup.string().required(
										// 		"This field is required"
										// 	),
									})}
									onSubmit={async (
										values,
										{ resetForm, setSubmitting }
									) => {
										const body = {
											name:values.name,
											code: values.code,
											value: values.value,
											valid: true,
											usage: values.usage,
											expiresIn: values.expiresIn,
										};
										resetForm();

										try {
											const response =
												await axiosInstance.post(
													"/coupons",
													body
												);
											if (response) {
												toast.success(
													`🦄 Coupon created Successfully}`,
													{
														position: "top-right",
														autoClose: 5000,
														hideProgressBar: false,
														closeOnClick: true,
														pauseOnHover: true,
														draggable: true,
														progress: undefined,
													}
												);
											}
										} catch (error) {
											console.log(error);
											toast.error(
												"🦄 An error occurred, try again later",
												{
													position: "top-right",
													autoClose: 5000,
													hideProgressBar: false,
													closeOnClick: true,
													pauseOnHover: true,
													draggable: true,
													progress: undefined,
												}
											);
										}
									}}
								>
									{(formik) => (
										<form
											className=""
											onSubmit={formik.handleSubmit}
										>
											<PrimaryInput
												id="code"
												type="text"
												label="Coupon Name"
												placeholder="THRINDLE"
												formikTouched={
													formik.touched.name
												}
												formikErrors={
													formik.errors.name
												}
												getFieldProps={{
													...formik.getFieldProps(
														"name"
													),
												}}
											/>
											<PrimaryInput
												id="code"
												type="text"
												label="Coupon code"
												placeholder="THR12D1E"
												formikTouched={
													formik.touched.code
												}
												formikErrors={
													formik.errors.code
												}
												getFieldProps={{
													...formik.getFieldProps(
														"code"
													),
												}}
											/>
											<PrimaryInput
												id="value"
												type="number"
												label="Value in Amount"
												placeholder="10,000"
												formikTouched={
													formik.touched.value
												}
												formikErrors={
													formik.errors.value
												}
												getFieldProps={{
													...formik.getFieldProps(
														"value"
													),
												}}
											/>
											<PrimaryInput
												id="value"
												type="number"
												label="Number of usage"
												placeholder="5"
												formikTouched={
													formik.touched.usage
												}
												formikErrors={
													formik.errors.usage
												}
												getFieldProps={{
													...formik.getFieldProps(
														"usage"
													),
												}}
											/>
											<PrimaryInput
												id="value"
												type="text"
												label="Duration of code"
												placeholder="5h or 5m or 5s"
												formikTouched={
													formik.touched.expiresIn
												}
												formikErrors={
													formik.errors.expiresIn
												}
												getFieldProps={{
													...formik.getFieldProps(
														"expiresIn"
													),
												}}
											/>
											<div className="flex justify-end">
												<button
													className="text-white-main bg-[#20639B] rounded-lg py-2 px-5 ml-auto"
													type="submit"
												>
													CREATE
												</button>
											</div>
										</form>
									)}
								</Formik>
							</div>
						</div>
					</>
				)}
			</div>
		</MainContainer>
	);
};

export default CreateCoupon;

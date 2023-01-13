import React, { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import NewLoader from "../../components/newLoader/newLoader";

const Audit = () => {
  const [adminUSers, setAdminUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllAdminUSers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/audits/admin");
      setAdminUsers((old) => response.data.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllAdminUSers();
  }, [getAllAdminUSers]);

  const heading = ["S/N", "Name", "Email", "Phone"];

  const viewUsers = (id, userName) => {
    navigate(`/audit/${id}`, { state: { id: id, name: userName } });
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

  if (error && !loading) {
    return (
      <MainContainer>An ERROR OCCURRED, PLEASE RELOAD THIS PAGE</MainContainer>
    );
  }

  return (
    <MainContainer>
      <div>
        <div className=" bg-white  px-6 py-10 border rounded-lg">
          <table className="table-auto w-full   ">
            <thead>
              <tr className="">
                {heading?.map((item, index) => (
                  <th key={index} className="">
                    <p className="text-left  font-bold">{item}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminUSers?.map((item, index) => (
                <tr
                  key={index}
                  className="h-16 hover:bg-gray-100 px-2 mt-6 cursor-pointer "
                  onClick={() => viewUsers(item.id, item.name)}
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

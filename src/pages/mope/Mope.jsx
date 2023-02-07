import React, { useEffect, useState, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import axios from "axios";
import { useSelector } from "react-redux";
import NewLoader from "../../components/newLoader/newLoader";
import styled from "styled-components";
import MopeItem from "../../components/Mope/MopeItem";

const Mope = () => {
  const token = useSelector((state) => state.login.accessToken);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [id, setId] = useState("");

  const getAllMope = useCallback(async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      setLoading(true);
      const response = await axios.get(
        "https://store-staging-api.thrindle.com/api/thrindle/mope",
        config
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }, [token, setError]);

  const heading = [
    "Index",
    "Customer's Name",
    "Product Title",
    "Category",
    "Quantity",
    "Market",
    "Date Of request",
    "status",
  ];

  useEffect(() => {
    getAllMope();
  }, [getAllMope]);

  const formateDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

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
          There is no Mope requests available,
        </p>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <p className="text-red-600 text-2xl text-center py-10">
          An error occurred, Try Reloading the page or Login again
        </p>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {data.length > 0 && !error && (
        <div>
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
                <tr
                  key={index}
                  className="text-center cursor-pointer py-3"
                  onClick={() => {
                    setDetailsModal(true);
                    setId(item?._id);
                  }}
                >
                  <th className="p-6  font-normal text-sm">{index + 1}</th>
                  <th className="p-6  font-normal text-sm">{item?.cusName}</th>
                  <th className="p-6  font-normal text-sm">{item?.name}</th>
                  <th className="p-6  font-normal text-sm">
                    {item?.category.name}
                  </th>
                  <th className="p-6  font-normal text-sm">
                    {item?.requested_quantity}
                  </th>

                  <th className="p-6  font-normal text-sm">
                    {item?.market.name}
                  </th>

                  <th className="p-6  font-normal text-sm">
                    {formateDate(item?.createdAt)}
                  </th>
                  <th className="p-6  font-normal text-sm">
                    {item.status === "pending" ? "Pending" : "completed"}
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
          {detailsModal && (
            <MopeItem id={id} setDetailsModal={setDetailsModal} />
          )}
        </div>
      )}
    </MainContainer>
  );
};

export default Mope;

const Table = styled.table`
  width: 100%;

  tbody tr:nth-child(odd) {
    background-color: #f4f4f4;
  }

  tbody tr:nth-child(even) {
    background-color: #fff;
  }
`;

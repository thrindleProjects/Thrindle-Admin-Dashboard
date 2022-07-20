import MainContainer from "../../components/Common/MainContainer/MainContainer";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const balancesTableHeader = [
  "S/N",
  "Name",
  "Store Name",
  "Store ID",
  "Wallet Balance",
];

const Balances = () => {
  const [wallets, setWallets] = useState({ wallets: [], totalAmount: "0" });

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const {
          data: { data },
        } = await axiosInstance.get("/wallets/wallets");
        const wallets = data.filter((wallet) => !!wallet.balance);
        const totalAmount = wallets
          .reduce((acc, curr) => acc + curr.balance, 0)
          .toLocaleString();
        setWallets({ wallets, totalAmount });
      } catch (error) {
        if (error.message) {
          toast.error(error.message);
        }
        if (!error.message) {
          toast.error("Something went wrong");
        }
        throw new Error(error);
      }
    };
    fetchWallets();
  }, []);

  return (
    <MainContainer>
      <h1 className="w-full text-right text-2xl font-bold text-primary-main mb-4">Total Amount - {wallets.totalAmount}</h1>
      <table className="w-full divide-y-4 divide-primary-main">
        <thead className="grid grid-cols-5 gap-2 py-4">
          {balancesTableHeader.map((header, index) => {
            return (
              <tr key={index}>
                <th>{header}</th>
              </tr>
            );
          })}
        </thead>
        <tbody className="divide-y-2">
          {wallets.wallets.map((wallet, index) => {
            return (
              <tr key={index} className="grid grid-cols-5 py-2 gap-2 cursor-default">
                <td>{index + 1}</td>
                <td>{wallet?.seller?.name}</td>
                <td>{wallet.store.store_name}</td>
                <td>{wallet.store.store_id}</td>
                <td>₦{wallet.balance.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MainContainer>
  );
};

export default Balances;

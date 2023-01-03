import { numberFormat } from "../../utils/formatPrice";
import formatDate from "../../utils/formatDate";
// import { MdEdit } from "react-icons/md";
// import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";

const MerchantProductsTable = ({
  products,
  merchantProductsTableHeader,
  handleSetModal,
  displayDeleteModal,
  productsInfo,
}) => {
  const hiddenMobile = ["Uploaded", "Image"];

  return (
    <>
      <div className="px-4 text-xs md:text-sm">
        <span className="shrink-0 min-w-max text-left font-Bold flex flex-row items-center">
          {products.length > 1
            ? `${productsInfo.pageInfo?.totalHits} products found`
            : `${productsInfo.pageInfo?.totalHits} product found`}
        </span>
      </div>

      <MainTable className="w-full rounded-md pt-10 mt-5 overflow-auto text-xs md:text-sm">
        <table className="bg-white-main w-max min-w-full max-w-xl md:max-w-5xl flex flex-col">
          <thead>
            <tr className="grid grid-cols-7 md:grid-cols-9 gap-2 p-4 border-t border-b border-white-borderGrey font-Medium text-white-tableHeader text-left">
              {merchantProductsTableHeader.map(({ title }, index) => {
                return (
                  <th
                    key={index}
                    className={`${
                      ["Name"].includes(title) ? "col-span-2" : ""
                    } ${
                      hiddenMobile.includes(title) ? "hidden md:block" : "block"
                    }`}
                  >
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => {
              return (
                <tr
                  key={index}
                  className="grid grid-cols-7 md:grid-cols-9 gap-2 border-b border-white-borderGrey p-4 text-white-text text-left"
                >
                  <td>
                    {(productsInfo.pageInfo?.page - 1) * 20 + (index + 1)}
                  </td>
                  <td className="hidden md:block">
                    <img
                      src={
                        "https://store-staging-api.thrindle.com/api/thrindle/images/" +
                        product?.images[0]
                      }
                      className="w-12 h-12 mr-auto rounded-sm"
                      loading="eager"
                      alt={`product${index + 1}`}
                    />
                  </td>
                  <td className="col-span-2">{product?.name}</td>
                  <td>{product?.no_in_stock}</td>
                  <td>{product?.category?.name}</td>
                  <td>N{numberFormat(product?.price)}</td>
                  <td className="hidden md:block">
                    {formatDate(product?.createdAt)}
                  </td>
                  <td className="">
                    <p className="table-head-text font-normal font-Regular text-left text-white-text flex flex-row justify-start gap-2">
                      <button
                        onClick={() =>
                          handleSetModal(
                            "SHOW_EDIT_MODAL",
                            product._id,
                            product.verified
                          )
                        }
                        className="cursor-pointer flex flex-row items-center gap-px text-primary-dark"
                      >
                        {/* <MdEdit className="text-2xl text-primary-dark" /> */}
                        Edit
                      </button>
                      <button
                        className="cursor-pointer flex flex-row items-center gap-px text-secondary-error"
                        onClick={() => displayDeleteModal(product._id, product)}
                      >
                        {/* <AiFillCloseCircle className="text-2xl text-secondary-error" />{" "} */}
                        Delete
                      </button>
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </MainTable>
    </>
  );
};

export default MerchantProductsTable;

const MainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);

  .grid-cols-13 {
    grid-template-columns: repeat(13, minmax(0, 1fr));
  }

  .main-table-header {
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr {
    min-height: 80px;
    height: fit-content;
    align-items: center;
    justify-content: space-between;
  }
`;

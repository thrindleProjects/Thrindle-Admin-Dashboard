import { numberFormat } from "../../utils/formatPrice";
import formatDate from "../../utils/formatDate";
import { MdEdit } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import GeneralPagination from "../Common/GeneralPagination/GeneralPagination";

const MerchantProductsTable = ({
  products,
  merchantProductsTableHeader,
  handleSetModal,
  displayDeleteModal,
  productsInfo,
  handlePagination,
}) => {
  return (
    <table className="bg-white-main w-full flex flex-col">
      <caption className="text-left p-4 font-Bold flex flex-row items-center">
        <span className="shrink-0 min-w-max">
          {products.length > 1
            ? `${productsInfo.allProducts.length} products found`
            : `${productsInfo.allProducts.length} product found`}
        </span>
        <GeneralPagination
          showButtons={false}
          pag
          handlePagination={handlePagination}
          pageNumber={productsInfo.pageIndex}
          itemsNumber={productsInfo.paginatedProducts}
          totalNumber={productsInfo.allProducts?.length}
          nomargin
        />
      </caption>
      <thead>
        <tr className="grid grid-cols-9 gap-2 p-4 border-t border-b border-white-borderGrey font-Medium text-white-tableHeader text-center">
          {merchantProductsTableHeader.map(({ title }, index) => {
            return (
              <th
                key={index}
                className={`${["Action"].includes(title) ? "col-span-2" : ""}`}
              >
                {title}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {products.map((product, index) => (
          <tr
            key={index}
            className="grid grid-cols-9 gap-2 border-b border-white-borderGrey p-4 text-white-text text-center"
          >
            <td>{productsInfo?.pageIndex * 20 + (index + 1)}</td>
            <td>
              <img
                src={
                  "https://api.thrindle.com/api/thrindle/images/" +
                  product?.images[0]
                }
                className="w-12 h-12 mx-auto rounded-sm"
                loading="eager"
                alt={`product${index + 1}`}
              />
            </td>
            <td>{product?.name}</td>
            <td>{product?.no_in_stock}</td>
            <td>{product?.category?.name}</td>
            <td>N{numberFormat(product?.price)}</td>
            <td>{formatDate(product?.createdAt)}</td>
            <td className="col-span-2">
              <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text flex flex-row justify-center gap-2">
                <button
                  onClick={() =>
                    handleSetModal(
                      "SHOW_EDIT_MODAL",
                      product._id,
                      product.verified
                    )
                  }
                  className="cursor-pointer flex flex-row items-center gap-px"
                >
                  <MdEdit className="text-2xl text-primary-dark" /> Edit
                </button>
                <button
                  className="cursor-pointer flex flex-row items-center gap-px"
                  onClick={() => displayDeleteModal(product._id, product)}
                >
                  <AiFillCloseCircle className="text-2xl text-secondary-error" />{" "}
                  Delete
                </button>
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MerchantProductsTable;

import { useCallback, useEffect, useRef, useState } from 'react';
import Loader from '../Common/Loader/Loader';
import axios from 'axios';
import styled from 'styled-components';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import * as Yup from "yup"

const InventoryEditModal = (props) => {
  const modalRef = useRef(null);
  const [modalData, setModalData] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    category: { _id: '', name: '' },
    subcategory: { _id: '', name: '' },
    name: '',
  });
  const [categoryHandler, setCategoryHandler] = useState({
    marketName: '',
    category: [],
    subcategory: [],
  });
  // Keep track if form was updated
  const [updated, setUpdated] = useState(false);

  const url = 'https://thrindleservices.herokuapp.com/api/thrindle/sellers';
  const { handleSetModal, getAllUnverifiedProducts } = props;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let url =
      'https://thrindleservices.herokuapp.com/api/thrindle/products/admin/updateproduct';
    let formInfo = {
      name: formData.name,
      category: formData.category._id,
      description: formData.description,
      subcategory: formData.subcategory._id,
    };
    try {
      let res = await axiosInstance.put(`${url}/${modalData[0]._id}`, formInfo);
      if (res.status < 400) {
        setUpdated(true);
        return toast.success('Updated Successfully');
      }
      toast.error('Something went wrong...');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong...');
    }
  };

  const handleFormCancel = (e) => {
    e.preventDefault();
    if (updated) {
      return triggerTableUpdate();
    }
    return handleSetModal('CLOSE_ALL_MODALS');
  };

  const getMarketName = (storeId) => {
    if (storeId.trim().startsWith('CV')) return 'Computer Village';
    if (storeId.trim().startsWith('BM')) return 'Eko Market';
    if (storeId.trim().startsWith('EM')) return 'Eko Market';
    return 'Other Market';
  };

  const getMarketID = (marketValue) => {
    if (marketValue !== '') {
      let marketData = JSON.parse(localStorage.getItem('marketData'));
      let findMarket = marketData.find((item) => item.name === marketValue);
      return findMarket.id;
    }
    return false;
  };

  const getSubCategories = useCallback((categoryValue) => {
    let marketData = JSON.parse(localStorage.getItem('marketCategories'));
    let findMarket = marketData.find((item) => item.name === categoryValue);
    let subcategory = findMarket.subcategories;
    return subcategory;
  }, []);

  const getMarketCategories = useCallback(async (marketValue) => {
    const marketID = getMarketID(marketValue);
    try {
      let res = await axiosInstance.get(`categories/market/${marketID}`);
      localStorage.setItem('marketCategories', JSON.stringify(res.data.data));
      let category = res.data.data.map(({ name, _id }) => {
        return { name, _id };
      });
      setCategoryHandler((oldState) => {
        return { ...oldState, category };
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  }, []);

  const triggerTableUpdate = useCallback(() => {
    getAllUnverifiedProducts();
    return handleSetModal('CLOSE_ALL_MODALS');
  }, [getAllUnverifiedProducts, handleSetModal]);

  const getSingleProduct = useCallback(
    async (id) => {
      try {
        const {
          data: { data },
        } = await axios.get(`${url}/products/unverifiedproduct/${id}`);
        let { description, name, category, subcategory, store_id } = data[0];
        let marketName = getMarketName(store_id);
        await getMarketCategories(marketName);
        setFormData({ description, name, category, subcategory });
        setModalData(data);
        setCategoryHandler((old) => {
          return { ...old, marketName };
        });
      } catch (error) {
        console.error(error);
      }
    },
    [getMarketCategories]
  );

  const getUploadDate = (updatedAt) => {
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  const getCategoryId = (category) => {
    let marketData = JSON.parse(localStorage.getItem('marketCategories'));
    let findMarket = marketData.find((item) => item.name === category);
    return findMarket._id;
  };

  const getSubCategoryId = (subCategoryValue) => {
    let findMarket = categoryHandler.subcategory.find(
      (item) => item.name === subCategoryValue
    );
    return findMarket._id;
  };

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'category') {
      let _id = getCategoryId(value);
      return setFormData({
        ...formData,
        category: { name: value, _id },
      });
    }
    if (name === 'subcategory') {
      let _id = getSubCategoryId(value);
      return setFormData({
        ...formData,
        subcategory: { name: value, _id },
      });
    }
    return setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (modalData.length > 0 && updated) {
          return triggerTableUpdate();
        }
        handleSetModal('CLOSE_ALL_MODALS');
      }
      return true;
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleSetModal, triggerTableUpdate, modalData, updated]);

  useEffect(() => {
    getSingleProduct(props.modalId);
  }, [props.modalId, getSingleProduct]);

  useEffect(() => {
    if (formData.category.name === '') return;
    let subcategory = getSubCategories(formData.category.name);
    setCategoryHandler((old) => {
      return { ...old, subcategory };
    });
    return;
  }, [formData.category.name, getSubCategories]);

  return (
    <ModalWrapper className='fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center'>
      <ModalContainer
        ref={modalRef}
        className='rounded-md py-12 px-8 overflow-y-auto'
      >
        {modalData.length > 0 ? (
          modalData.map((item) => {
            const uploadDate = getUploadDate(item.updatedAt);
            return (
              <form key={item._id} className='items-center flex flex-col gap-8'>
                <div className='h-52 overflow-hidden shadow rounded-md'>
                  <img
                    className='object-contain h-full'
                    src={`https://thrindleservices.herokuapp.com/api/thrindle/images/${item.images[0]}`}
                    alt='Pending Item'
                  />
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <p className='text-white-text flex flex-col'>
                    Category:{' '}
                    <select
                      className='font-medium text-primary-dark'
                      name='category'
                      id='category'
                      value={formData.category.name}
                      onChange={handleFormChange}
                      required
                    >
                      {categoryHandler?.category?.length > 0 ? (
                        <>
                          {categoryHandler?.category?.map(({ _id, name }) => {
                            return (
                              <option key={_id} name={name} value={name}>
                                {name}
                              </option>
                            );
                          })}
                        </>
                      ) : (
                        <option
                          name={formData?.category?.name}
                          value={formData?.category?.name}
                        >
                          {formData?.category?.name}
                        </option>
                      )}
                    </select>
                  </p>
                  <p className='text-white-text flex flex-col'>
                    Sub Categories:
                    <select
                      name='subcategory'
                      id='subcategory'
                      value={formData?.subcategory?.name}
                      onChange={handleFormChange}
                      required
                    >
                      {categoryHandler?.subcategory?.length > 0 ? (
                        <>
                          {categoryHandler?.subcategory?.map(
                            ({ _id, name }) => {
                              return (
                                <option key={_id} name={name} value={name}>
                                  {name}
                                </option>
                              );
                            }
                          )}
                        </>
                      ) : (
                        <option
                          name={formData?.subcategory?.name}
                          value={formData?.subcategory?.name}
                        >
                          {formData?.subcategory?.name}
                        </option>
                      )}
                    </select>
                  </p>
                  <p className='text-white-text flex flex-col'>
                    Product Title:{' '}
                    <input
                      className='font-medium text-primary-dark'
                      type='text'
                      name={'name'}
                      value={formData.name}
                      required
                      onChange={handleFormChange}
                    />
                  </p>
                  <p className='text-white-text flex flex-col'>
                    Description:{' '}
                    <input
                      className='font-medium text-primary-dark'
                      type='text'
                      name={'description'}
                      value={formData.description}
                      required
                      onChange={handleFormChange}
                    />
                  </p>
                  <p className='text-white-text'>
                    Price:{' '}
                    <span className='font-medium text-primary-dark'>
                      N{item.price.toLocaleString()}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Stock:{' '}
                    <span className='font-medium text-primary-dark'>
                      {item.no_in_stock}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Upload Date:{' '}
                    <span className='font-medium text-primary-dark'>
                      {uploadDate}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Product Type:{' '}
                    <span className='font-medium text-primary-dark'>
                      {item.new ? 'New' : 'Used'}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Status:{' '}
                    <span
                      className={`capitalize font-medium ${
                        item.verified
                          ? 'text-secondary-success'
                          : 'text-secondary-yellow'
                      }`}
                    >
                      {item.verified ? 'Approved' : 'Pending'}
                    </span>
                  </p>
                </div>
                <div className='w-full flex flex-row gap-4 justify-end'>
                  <ModalButton
                    className={`border ${
                      updated
                        ? 'bg-secondary-success text-white-main border-secondary-success'
                        : 'bg-transparent border-inventory-gray text-inventory-gray'
                    }`}
                    onClick={handleFormCancel}
                  >
                    {updated ? 'Close' : 'Cancel'}
                  </ModalButton>
                  <ModalButton
                    className='border border-primary-dark bg-primary-dark text-white-main'
                    type='submit'
                    onClick={handleFormSubmit}
                  >
                    Update
                  </ModalButton>
                </div>
              </form>
            );
          })
        ) : (
          <Loader />
        )}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default InventoryEditModal;

const ModalWrapper = styled.div`
  z-index: 110;
`;
const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  width: 30%;
  max-height: 85vh;
  p {
    display: flex;
    gap: 0.75rem;
    font-weight: 300;
    font-size: 0.875;
  }
  input,
  select {
    padding: 0.5rem 1rem;
    border: 1px solid #16588f;
  }
`;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
`;

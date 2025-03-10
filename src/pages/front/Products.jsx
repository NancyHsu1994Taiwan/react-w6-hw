import { Modal } from "bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import MessageToast from "../../components/MessageToast";

import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
function Products() {
  const { VITE_BASE_URL: BASE_URL, VITE_API_BASE: API_BASE } = import.meta.env;

  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [loadingState, setLoadingState] = useState(false);
  const dispatch = useDispatch();
  const getProducts = async (page = 1) => {
    try {
      setLoadingState(true);
      const res = await axios.get(
        `${BASE_URL}/api/${API_BASE}/products?page=${page}`
      );
      const page_info = res.data.pagination;
      setProducts(res.data.products);
      setPageInfo(page_info);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingState(false);
    }
  };

  const productModalRef = useRef(null);
  const openModal = () => {
    const modalInstance =
      Modal.getInstance(productModalRef.current) ||
      new Modal(productModalRef.current);
    modalInstance.show();
  };
  const handleSeeMore = (product) => {
    setTempProduct(product);
    openModal();
  };
  useEffect(() => {
    getProducts(1);
  }, []);
  const addToCart = async (id, qty) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/${API_BASE}/cart/`, {
        data: {
          product_id: id,
          qty: qty,
        },
      });

      dispatch(createAsyncMessage(res.data));
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };
  return (
    <>
      <h1>Products</h1>
      <MessageToast />
      <table className="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ width: "200px" }}>
                <img
                  className="img-fluid"
                  src={product.imageUrl}
                  alt={product.title}
                />
              </td>
              <td>{product.title}</td>
              <td>
                <del className="h6">原價 {product.origin_price} 元</del>
                <div className="h5">特價 {product.origin_price}元</div>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button
                    onClick={() => handleSeeMore(product)}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    查看更多
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      addToCart(product.id, 1);
                    }}
                  >
                    加到購物車
                    {/* {loadingState && (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    )} */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageInfo={pageInfo} getProducts={getProducts} />
      <ProductModal
        tempProduct={tempProduct}
        productModalRef={productModalRef}
        addToCart={addToCart}
      />
      {loadingState && <Loading />}
    </>
  );
}
export default Products;

import axios from "axios";
import { useState, useEffect } from "react";
import Form from "../../components/Form";
import Loading from "../../components/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BASE;

function CartList() {
  const [cartProductList, setCartProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const getCartProduct = async () => {
    try {
      setLoadingState(true);
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCartProductList(res.data.data.carts);
      setTotalPrice(res.data.data.final_total);
    } catch (error) {
      alert("取得購物車失敗", error.message);
    } finally {
      setLoadingState(false);
    }
  };
  const deleteOneCartProduct = async (id) => {
    try {
      setLoadingState(true);
      const res = await axios.delete(`${BASE_URL}/api/${API_PATH}/cart/${id}`);

      alert(res.data.message);
      getCartProduct();
    } catch (error) {
      alert("刪除購物車失敗", error.message);
    } finally {
      setLoadingState(false);
    }
  };
  const deleteAllCartProduct = async () => {
    try {
      setLoadingState(true);
      const res = await axios.delete(`${BASE_URL}/api/${API_PATH}/carts`);

      alert(res.data.message);
      // getCartProduct();
      setCartProductList([]);
    } catch (error) {
      alert("刪除購物車失敗", error.message);
    } finally {
      setLoadingState(false);
    }
  };
  const updateCartProduct = async (cartId, productId, qty, status) => {
    let quantity;
    if (status === "add") {
      quantity = qty + 1;
    } else {
      quantity = qty - 1;
    }

    try {
      setLoadingState(true);
      const res = await axios.put(
        `${BASE_URL}/api/${API_PATH}/cart/${cartId}`,
        {
          data: {
            product_id: productId,
            qty: quantity,
          },
        }
      );
      alert(res.data.message);
      getCartProduct();
    } catch (error) {
      alert("調整購物車失敗", error.message);
    } finally {
      setLoadingState(false);
    }
  };
  useEffect(() => {
    getCartProduct();
  }, []);
  return (
    <>
      <div className="text-end py-3">
        <button
          className={
            cartProductList.length !== 0
              ? "btn btn-outline-danger"
              : "btn btn-outline-danger disabled"
          }
          type="button"
          onClick={deleteAllCartProduct}
        >
          清空購物車
        </button>
      </div>

      {cartProductList.length !== 0 ? (
        <table className="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style={{ width: "150px" }}>數量/單位</th>
              <th className="text-end">單價</th>
            </tr>
          </thead>

          <tbody>
            {cartProductList.map((item) => {
              return (
                <>
                  <tr>
                    <td key={item.product.id}>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          deleteOneCartProduct(item.id);
                        }}
                      >
                        x
                      </button>
                    </td>
                    <td>{item.product.title}</td>
                    <td style={{ width: "150px" }}>
                      <div className="d-flex align-items-center">
                        <div className="btn-group me-2" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => {
                              updateCartProduct(
                                item.id,
                                item.product.id,
                                item.qty,
                                "minus"
                              );
                            }}
                          >
                            -
                          </button>
                          <span
                            className="btn border border-dark"
                            style={{ width: "50px", cursor: "auto" }}
                          >
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => {
                              updateCartProduct(
                                item.id,
                                item.product.id,
                                item.qty,
                                "add"
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                        <span className="input-group-text bg-transparent border-0">
                          {item.product.unit}
                        </span>
                      </div>
                    </td>
                    <td className="text-end">{item.total}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end">
                總計：{totalPrice}
              </td>
              <td className="text-end" style={{ width: "130px" }}></td>
            </tr>
          </tfoot>
        </table>
      ) : (
        "購物車內尚無商品"
      )}
      <div className="my-5 row justify-content-center">
        <Form
          getCartProduct={getCartProduct}
          cartProductList={cartProductList}
          setLoadingState={setLoadingState}
        />
      </div>
      {loadingState && <Loading />}
    </>
  );
}

export default CartList;

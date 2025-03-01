import axios from "axios";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BASE;

function Input({ label, register, type, id, errors, rules }) {
  return (
    <>
      {type === "textarea" ? (
        <div className="mb-3">
          <textarea
            id={id}
            placeholder={`請輸入 ${label}`}
            {...register(id, rules)}
            className={`form-control ${errors[name] ? "is-invalid" : ""}`}
            rows="4"
          ></textarea>
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor={id} className="form-label">
            {label}
          </label>
          <input
            id={id}
            type={type}
            placeholder={`請輸入 ${label}`}
            {...register(id, rules)}
            className={`form-control ${errors[id] && "is-invalid"}`}
          />

          {errors[id] && (
            <div className="invalid-feedback">{errors?.[id]?.message}</div>
          )}
        </div>
      )}
    </>
  );
}

function Form({ getCartProduct, cartProductList, setLoadingState }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      tel: "",
      address: "",
      message: "",
    },
    // 錯誤驗證時機
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    setLoadingState(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/${API_PATH}/order`, {
        data: {
          user: {
            name: data.name,
            email: data.email,
            tel: data.tel,
            address: data.address,
          },
          message: data.message,
        },
      });

      alert(res.data.message);
      getCartProduct();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingState(false);
    }
  };
  return (
    <>
      <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          id="email"
          register={register}
          type="email"
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Email為必填",
            },
            pattern: {
              value: /^\S+@\S+$/,
              message: "Email為必填格式不正確",
            },
          }}
        />
        <Input
          label="收件人姓名"
          id="name"
          register={register}
          type="text"
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "收件人姓名為必填",
            },
          }}
        />
        <Input
          label="收件人電話"
          id="tel"
          register={register}
          type="tel"
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "電話為必填",
            },
            pattern: {
              value: /^(0[2-8]\d{7}|09\d{8})$/,
              message: "電話格式不正確",
            },
          }}
        />
        <Input
          label="收件人地址"
          id="address"
          register={register}
          type="text"
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "地址為必填",
            },
          }}
        />
        <Input
          label="留言"
          id="message"
          register={register}
          type="textarea"
          errors={errors}
          rules={"message"}
        />

        <div className="text-end">
          <button
            type="submit"
            className="btn btn-danger"
            disabled={cartProductList.length === 0}
          >
            送出訂單
          </button>
        </div>
      </form>
    </>
  );
}
export default Form;
Input.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  errors: PropTypes.string,
  rules: PropTypes.shape({
    message: PropTypes.string,
  }),
};
Form.propTypes = {
  getCartProduct: PropTypes.func,
  cartProductList: PropTypes.array,
  setLoadingState: PropTypes.func,
};

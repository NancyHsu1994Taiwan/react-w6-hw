import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import axios from "axios";
function Login() {
  const { VITE_BASE_URL: BASE_URL } = import.meta.env;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // 錯誤驗證時機
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/signin`, {
        username: data.email,
        password: data.password,
      });
      const { token, expired } = res.data;
      document.cookie = `yunlinToken=${token}; expires=${new Date(
        expired
      )}; SameSite=None; Secure`;
      axios.defaults.headers.common["Authorization"] = token;
      alert("登入成功");
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center">請先登入</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            id="email"
            aria-describedby="emailHelp"
            name="username"
            {...register("email", {
              required: {
                value: true,
                message: "Email為必填",
              },
              pattern: {
                value: /^\S+@\S+$/,
                message: "Email為必填格式不正確",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors?.email?.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password && "is-invalid"}`}
            id="password"
            name="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password為必填",
              },
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors?.password?.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          login
        </button>
      </form>
    </>
  );
}
export default Login;

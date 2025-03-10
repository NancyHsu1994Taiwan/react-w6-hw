import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);
  return (
    <>
      <h1>404 NotFound</h1>
    </>
  );
}

export default NotFound;

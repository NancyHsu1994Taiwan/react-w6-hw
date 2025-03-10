import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { removeMessage } from "../slice/messageSlice";

function MessageToast() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const removeToast = () => {
    dispatch(removeMessage());
  };
  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
        {message.map((msg) => (
          <div
            key={msg.id}
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header bg-success text-white">
              <strong className="me-auto">{msg.title}</strong>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => removeToast()}
              ></button>
            </div>
            <div className="toast-body">{msg.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MessageToast;

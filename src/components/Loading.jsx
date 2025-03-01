import ReactLoading from "react-loading";
function Loading() {
  return (
    <div
      className=""
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,255,255,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type={"spin"} color={"#000000"} height={30} width={30} />
    </div>
  );
}
export default Loading;

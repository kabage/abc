import Loader from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <Loader
      type="ThreeDots"
      color="#1e7b85"
      height={50}
      width={50}
      timeout={8000}
    />
  );
}

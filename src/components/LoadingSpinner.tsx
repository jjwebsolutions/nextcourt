import PuffLoader from "react-spinners/PuffLoader";

const LoadingSpinner = () => {
  // Display the loading spinner
  return (
    <>
      <div className="flex  justify-center opacity-90">
        <PuffLoader color="#00ADB5" />
      </div>
    </>
  );
};
export default LoadingSpinner;

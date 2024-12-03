
const Alert = ({ message, variant }) => {
 
  return (
    <div
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white rounded shadow-md ${
        variant === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message}
    </div>
  );
};

export default Alert;

import { useForm } from "react-hook-form";
import { getBlockchainContext } from "../../context/BlockchainContext";

export default function Form() {
  const { makePayment } = getBlockchainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (value) => {
    console.log(value);
    const { payment } = value;
    await makePayment(payment);
  };

  return (
    <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="font-semibold">Pay your Due</p>
      <input
        placeholder="Payment"
        className="border-2 border-gray-200 mb-1  hover:border-teal-600 rounded-md w-2/4"
        type={"number"}
        step="any"
        {...register("payment", { required: "This is required" })}
      />
      {/* errors will return when field validation fails  */}
      <div>{errors.payment && <span>{errors.payment.message}</span>}</div>

      <button
        type="submit"
        className="button bg-teal-600 p-1 rounded-md text-white"
      >
        Submit
      </button>
    </form>
  );
}

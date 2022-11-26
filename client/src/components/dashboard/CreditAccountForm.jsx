import { useForm } from "react-hook-form";
import { getBlockchainContext } from "../../context/BlockchainContext";

export default function Form() {
  const { deposit } = getBlockchainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (value) => {
    console.log(value);
    const { credit } = value;
    
    deposit(credit);
    console.log(credit, "amount deposited");
  };

  return (
    <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="font-semibold">Add Credit</p>
      <input
        placeholder="Credit"
        className="border-2 border-gray-200 mb-1  hover:border-teal-600 rounded-md w-2/4"
        type={"number"}
        step="any"
        {...register("credit", { required: "This is required" })}
      />
      {/* errors will return when field validation fails  */}
      <div>{errors.credit && <span>{errors.credit.message}</span>}</div>

      <button
        type="submit"
        className="button bg-teal-600 p-1 rounded-md text-white"
      >
        Submit
      </button>
    </form>
  );
}

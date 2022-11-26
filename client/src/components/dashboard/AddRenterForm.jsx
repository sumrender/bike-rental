import { useState } from "react";
import { useForm } from "react-hook-form";
import { getBlockchainContext } from "../../context/BlockchainContext";

export default function Form() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { addRenter, currentAccount } = getBlockchainContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setIsDisabled(true);
    let newObject = {
      walletAddress: currentAccount,
      canRent: true,
      active: false,
      balance: 0,
      due: 0,
      start: 0,
      end: 0,
      ...values,
    };
    const {
      walletAddress,
      canRent,
      active,
      balance,
      due,
      start,
      end,
      firstName,
      lastName,
    } = newObject;
    await addRenter(
      walletAddress,
      firstName,
      lastName,
      canRent,
      active,
      balance,
      due,
      start,
      end
    );
    setIsDisabled(false);
  };

  return (
    <>
      <p className="text-2xl font-semibold">Welcome!</p>
      <p className="text-2xl font-semibold">
        Please enter your first and last name to register.
      </p>
      <p>or connect your wallet, if already registered.</p>
      <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="First Name"
          className="border-2 border-gray-200 mb-1  hover:border-teal-600 rounded-md w-2/4"
          {...register("firstName", { required: "This is required" })}
        />
        {/* errors will return when field validation fails  */}
        <div>{errors.firstName && <span>{errors.firstName.message}</span>}</div>
        <input
          placeholder="Last Name"
          className="border-2 border-gray-200 mb-1  hover:border-teal-600 rounded-md w-2/4"
          {...register("lastName", { required: "This is required" })}
        />
        {/* errors will return when field validation fails  */}
        <div>{errors.lastName && <span>{errors.lastName.message}</span>}</div>

        <button
          type="submit"
          disabled={isDisabled}
          className="button bg-teal-600 p-1 rounded-md text-white"
        >
          {isDisabled ? "Please wait" : "Submit"}
        </button>
      </form>
    </>
  );
}

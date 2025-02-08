"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
    orderDate: z.string().min(1, { message: "Order Date is required!" }),
    invoiceId: z.string().min(1, { message: "Invoice ID is required!" }),
    customerName: z.string().min(1, { message: "Customer Name is required!" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required!" }),
    amount: z.string().min(1, { message: "Amount is required!" }),
    paymentMethod: z.string().min(1, { message: "Payment Method is required!" }),
});

type Inputs = z.infer<typeof schema>;

const OrderForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new order" : "Update order"}
            </h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Order Date" name="orderDate" defaultValue={data?.orderDate} register={register} error={errors?.orderDate} type="date" />
                <InputField label="Invoice ID" name="invoiceId" defaultValue={data?.invoiceId} register={register} error={errors?.invoiceId} />
                <InputField label="Customer Name" name="customerName" defaultValue={data?.customerName} register={register} error={errors?.customerName} />
                <InputField label="Phone Number" name="phoneNumber" defaultValue={data?.phoneNumber} register={register} error={errors?.phoneNumber} />
                <InputField label="Amount" name="amount" defaultValue={data?.amount} register={register} error={errors?.amount} />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Payment Method</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("paymentMethod")}
                        defaultValue={data?.paymentMethod}
                    >
                        <option value="Banking">Banking</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                    </select>
                    {errors.paymentMethod?.message && (
                        <p className="text-xs text-red-400">{errors.paymentMethod.message.toString()}</p>
                    )}
                </div>
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default OrderForm;

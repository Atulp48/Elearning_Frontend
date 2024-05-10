import React, { FC, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useLoaduserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { styles } from "@/app/styles/style";

type Props = {
  open?: boolean;
  setOpen: any;
  data: any;
};

const PayForm: FC<Props> = ({ setOpen, data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoaduserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      toast.success("course purchase successfully");
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
            {isLoading ? (
              <div className="spinner" id="spinner">
                proccess
              </div>
            ) : (
              <div>Pay now</div>
            )}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default PayForm;

// import React, { FC, useEffect, useState } from "react";
// import {
//   useStripe,
//   useElements,
//   LinkAuthenticationElement,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { useLoaduserQuery } from "@/redux/features/api/apiSlice";
// import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
// import { redirect } from "next/navigation";
// import toast from "react-hot-toast";
// import { styles } from "@/app/styles/style";

// type Props = {
//   open?: boolean;
//   setOpen: any;
//   data: any;
// };

// const PayForm: FC<Props> = ({ setOpen, data }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState<any>("");
//   const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
//   const [loadUser, setLoadUser] = useState(false);
//   const {} = useLoaduserQuery({ skip: loadUser ? false : true });
//   const [isLoading, setIsLoading] = useState(false);

//   console.log(orderData);
//   console.log("hello ji");

//   const HandleSubmitt = async (e: any) => {
//     e.preventDefault()
//     setIsLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       redirect: "if_required",
//     });

//     await createOrder({
//       courseId: data._id,
//       payment_info: paymentIntent,
//     });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }
//     setIsLoading(true);
//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       redirect: "if_required",
//     });

//     if (error) {
//       setMessage(error.message);
//       setIsLoading(false);
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       setIsLoading(false);
//       createOrder({
//         courseId: data._id,
//         payment_info: paymentIntent,
//       });
//     }
//   };

//   useEffect(() => {
//     if (orderData) {
//           redirect(`/course-access/${data._id}`);
//         setLoadUser(true);
//         toast.success("course purchase successfully");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error(errorData.data.message);
//       }
//     }
//   }, [orderData, error]);

//   return (
//     <div>
//       <form id="payment-form" onSubmit={HandleSubmitt}>
//         <LinkAuthenticationElement id="link-authentication-element" />
//         <PaymentElement id="payment-element" />
//         <button disabled={isLoading || !stripe || !elements} id="submit">
//           <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
//             {isLoading ? (
//               <div className="spinner" id="spinner">
//                 proccess
//               </div>
//             ) : (
//               <div>Pay now</div>
//             )}
//           </span>
//         </button>
//         {message && <div id="payment-message">{message}</div>}
//       </form>
//     </div>
//   );
// };

// export default PayForm;

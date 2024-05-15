import React, { FC, useEffect, useState } from "react";
import { useGetUserCoursesbyIdQuery } from "@/redux/features/courses/coursesAPi";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "../../component/Course/courseDetails";
import { loadStripe } from "@stripe/stripe-js";
import {
  useCreatePayMutation,
  useGetStripePublishkeyQuery,
} from "@/redux/features/orders/ordersApi";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetUserCoursesbyIdQuery(id);
  const [course, setCourse] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data: dataPublish } = useGetStripePublishkeyQuery({});
  const [createPay, { data: paymentIntentData }] = useCreatePayMutation();
  const [stripePromish, setStripePromish] = useState<any>(null);
  const [clientSectret, setClientSectret] = useState("");

  // console.log("print hi")
  // console.log(paymentIntentData?.client_secret)
  // console.log(dataPublish?.publishablekey)

  useEffect(() => {
    if (dataPublish) {
      const publishableKey = dataPublish?.publishablekey;
      setStripePromish(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPay(amount);
    }
  }, [dataPublish, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSectret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + "-Elearning"}
            description={"online course learning"}
            keywords={data?.course?.tags}
          />

          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromish && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromish}
              clientSecret={clientSectret}
              route={route}
              setRoute={setRoute}
              open={open}
              setOpen={setOpen}
            />
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;

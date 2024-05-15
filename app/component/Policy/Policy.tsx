import { styles } from "@/app/styles/style";
import React from "react";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div className="w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white">
        <h1 className={`${styles.title} !text-start pt-2`}>
        <span className="text-gradient text-red-400"> Terms and</span>  <span className="text-gradient text-green-400">Conditions</span>
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            We collect personal information such as name, email address, and
            possibly demographic information during the registration process to
            create and manage user accounts.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Personal information is primarily used for account management,
            communication purposes, and to customize the learning experience.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            We employ industry-standard security measures to safeguard personal
            information from unauthorized access, disclosure, alteration, or
            destruction.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Third-party Services: We may use third-party services for analytics,
            payment processing, or other functionalities, and they may have
            their own privacy policies governing data usage.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            We may use cookies and similar tracking technologies to enhance user
            experience, personalize content, and gather usage information.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            : Personal information is not shared with third parties except as
            necessary to provide services, comply with legal obligations, or
            with user consent.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Users have the right to access, update, or delete their personal
            information and can manage communication preferences.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Our services are not directed at children under the age of 13, and
            we do not knowingly collect personal information from them without
            parental consent.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            We reserve the right to update our privacy policy periodically, and
            users will be notified of any significant changes..
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Users can contact us for any inquiries or concerns regarding privacy
            practices and data protection.
          </p>
          <br />
        </ul>
      </div>
    </div>
  );
};

export default Policy;

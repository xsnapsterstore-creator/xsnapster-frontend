import User from "@/components/User/User";
import React from "react";

const UserDetails = ({ userData }) => {
  return (
    <div>
      <User user_data={userData} />
    </div>
  );
};

export default UserDetails;

export async function getServerSideProps({ params }) {
  const user = {
    id: "123trgfnhmju7654refs",
    user_name: "Avinash Chaurasia",
    user_email: "avinashch7800@gmail.com",
    user_contact: "6388846231",
    user_address: {
      country: "India",
      state: "Uttar Pradesh",
      city: "Deoria",
      pincode: "274001",
      street: "Ram Gulam Tola",
      house_no: "52/24",
      landmark: "East of Subhash Vidyalaya",
    },
    orders: [
      {
        order_id: "23465yujmnbfger342",
        order_date: "24-November-2025",
        order_status: "Delivered",
        order_amount: "798",
        ordered_product: [
          {
            product_id: "12345tyhjuygfdsw",
            title: "BMW M4 Car Frames | BMW Frames | Car Frames | Car Posters",
            img_link: "one_image_link_only",
            price: "399",
          },
          {
            product_id: "12345tgbnmjhgf",
            title:
              "Porsche 911 Car Frames | Porsche Frames | Car Frames | Car Posters",
            img_link: "one_image_link_only",
            price: "399",
          },
        ],
      },
      {
        order_id: "12345tghjkiuhgvdedc",
        order_date: "24-December-2025",
        order_status: "Shipped",
        order_amount: "798",
        ordered_product: [
          {
            product_id: "mnbvcfrt6789876543edf",
            title:
              "Audi A3 Car Frames | Audi Frames | Car Frames | Car Posters",
            img_link: "one_image_link_only",
            price: "399",
          },
          {
            product_id: "zxcvbhju8765432wedfghj",
            title:
              "Mercedes S Class Car Frames | Porsche Frames | Car Frames | Car Posters",
            img_link: "one_image_link_only",
            price: "399",
          },
        ],
      },
    ],
  };

  return {
    props: {
      userData: user || [],
    },
  };
}

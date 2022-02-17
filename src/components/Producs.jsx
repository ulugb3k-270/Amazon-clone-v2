import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

function Producs({ id, title, price, description, category, image, index}) {
  const [rating] = useState(Math.floor(Math.random() * 5) + 1);

  const [hasPrime] = useState(Math.random() < 0.5);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className={`relative flex flex-col m-5 bg-white rounded-md z-[4] p-10`}>
      <p className="absolute top-2 right-2 text-gray-400 text-xs italic">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3 cursor-pointer">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <p className="mb-5">${price}</p>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            src="https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png"
            className="w-12"
            alt="prime-has"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to basket
      </button>
    </div>
  );
}

export default Producs;

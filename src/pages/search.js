import { useEffect, useState } from "react";
import Header from "../components/Header";
import Producs from "../components/Producs";

function Search() {
  const [products, setProducts] = useState([]);
  const [isDocs, setIsDocs] = useState(false);

  const startTalking = () => {
    setIsDocs(false)
    const alanBtn = require("@alan-ai/alan-sdk-web");

    alanBtn({
      key: "78994025e57828d47aa05d52d6326e722e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        setProducts(commandData.data);
      },
    });
  };

  return (
    <div>
      <Header />
      <section className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => (
          <Producs
            key={i}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
            index="999"
          />
        ))}
      </section>

      {products.length === 0 && (
        <div className="w-full h-[800px] flex items-center justify-center">
          <h1>
            You can filter with your voice read docs{" "}
            <span
              className="text-blue-400 underline cursor-pointer hover:underline"
              onClick={() => setIsDocs(true)}
            >
              {" "}
              here
            </span>
          </h1>
        </div>
      )}

      {isDocs && (
        <div className="absolute w-full h-screen flex items-center justify-center bg-[#20202038] top-0">
          <div className="p-4 px-8 rounded-md bg-white">
            <div className="relative">
              <h2 className="text-xl text-center font-semibold">
                Documentation
              </h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute right-0 top-1 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setIsDocs(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <ul className="list-disc">
              <li>Order by name -- Orders by name</li>
              <li>Order by price -- Orders by price</li>
              <li>Order by category -- Orders by category</li>
              <li>Order by id -- Orders by id</li>
            </ul>
            <p
              className="text-blue-400 underline cursor-pointer"
              onClick={startTalking}
            >
              Start Talking
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;

import React, { Fragment, FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHighlighter, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faGithub,
  faTwitter,
  faPinterest,
  faYoutube,
  faMedium,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
library.add(faGithub, faTwitter, faPinterest, faYoutube, faMedium, faLinkedin);
// import "../../styles/Home.module.css";
import data from "../../data";

interface ProductsProps {}

const Products: React.FunctionComponent<ProductsProps> = () => {
  let isGood = true;
  console.log(data.products);
  return (
    <Fragment>
      <Head>
        <title>쇼핑몰</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre> */}
      {/* <div className="container flex pt-4">
        <div className="w-full px-4 md:w-160 md:p-0"> */}
      <ul className="flex flex-wrap p-4">
        {data.products.map((product) => (
          <li className="mb-3 mr-3" key={product._id}>
            <h3>{product.category}</h3>
            <div className="relative rounded-sm shadow-lg w-60 h-80">
              <img src={product.image} alt="마레통3중" />
              <div className="absolute top-0 left-0 m-2">
                <span
                  className="p-1 mr-1 text-xs text-white rounded bg-purple-850"
                  style={{ fontSize: "10px" }}
                >
                  특가
                </span>
                <span className="py-1 pl-2 text-sm font-bold rounded-full">
                  {product.price}원
                </span>
              </div>
              <Link href="/">
                <div className="mt-2 text-sm font-bold text-center text-gray-700 transition duration-500 ease-in-out cursor-pointer hover:text-green-100">
                  {product.name}
                </div>
              </Link>

              <h6
                className="mt-2 text-xs tracking-tighter text-center text-gray-700"
                style={{ fontSize: "10px" }}
              >
                {product.description}
              </h6>

              <div>
                <FontAwesomeIcon
                  icon={isGood ? faStar : farStar}
                  className="h-4 text-green-100"
                />
                <FontAwesomeIcon
                  icon={farStar}
                  className="h-3 text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="h-3 text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="h-3 text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="h-3 text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faGithub}
                  className="h-3 text-yellow-500"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Products;

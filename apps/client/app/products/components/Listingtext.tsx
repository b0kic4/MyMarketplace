import React from "react";
interface Props {
  filter: string;
}
const Listingtext: React.FC<Props> = ({ filter }) => {
  return (
    <div className="flex justify-center">
      {filter === "all" ? (
        <p className="font-bold text-xl">Listing All Products</p>
      ) : filter === "newArrivals" ? (
        <p className="font-bold text-xl"> Listing latest arrivals</p>
      ) : filter === "usedItems" ? (
        <p className="font-bold text-xl">Listing Used items</p>
      ) : filter === "saved-products" ? (
        <p className="font-bold text-xl">Listing Bookmarked products</p>
      ) : filter === "my-products" ? (
        <p className="font-bold text-xl">Listing My Products</p>
      ) : null}
    </div>
  );
};

export default Listingtext;

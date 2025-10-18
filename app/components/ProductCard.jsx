export default function ProductCard({ product }) {
  return (
    <div className="rounded-md overflow-hidden ">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-60 object-cover rounded-md transition-transform duration-300 hover:scale-110"
      />
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">
            Name :
            <span className="text-[#AD8A64]">
              {product.name.split(" ").slice(0, 1).join(" ")}
            </span>
          </h3>
          <p>
            Price : <span className="text-[#A44A3F]">${product.price}</span>
          </p>
        </div>
        <div className="mt-2">
          <h3>
            Des :
            <span className="text-[#4E6E5D] ">
              {product.description.split(" ").slice(0, 1).join(" ")}...
            </span>
          </h3>
          <p className="text-[#EFF1F3] mb-4">
            Category: {product.category.name}
          </p>
        </div>
      </div>
    </div>
  );
}

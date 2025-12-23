export default function ProductCard({product}) {
    return (
        <div
            className="
            bg-white rounded-xl border border-cream-200 p-4
            transition-transform transition-shadow duration-300
            hover:scale-[1.02] hover:shadow-lg
        ">
            <div className="aspect-square bg-cream-100 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                />
            </div>

            <p className="text-xs text-sage-500">
                {product.ageGroup}
            </p>

            <h3 className="mt-1 font-medium text-sage-800">
                {product.name}
            </h3>

            <p className={"mt-3 font-semibold"}>
                RM {product.price}
            </p>
        </div>
    );
}
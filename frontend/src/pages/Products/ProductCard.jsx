export default function ProductCard({product}) {
    return (
        <div className="bg-white rounded-xl border border-cream-200 p-4">
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
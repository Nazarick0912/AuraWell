import {motion} from "framer-motion";

export default function ProductCard({product}) {
    return (
        <motion.div
            layout
            initial={{opacity: 0, scale: 0.96, y: 12}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.96, y: 12}}
            transition={{duration: 0.25, ease: "easeOut"}}
            className="
        bg-white rounded-xl border border-cream-200 p-4
        hover:shadow-lg hover:scale-[1.02]
        transition-shadow
      "
        >
            <div className="aspect-square bg-cream-100 overflow-hidden rounded-lg">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <p className="mt-2 text-xs text-sage-500">{product.ageGroup}</p>

            <h3 className="mt-1 font-medium text-sage-800">
                {product.name}
            </h3>

            <p className="mt-3 font-semibold">
                RM {product.price}
            </p>
        </motion.div>
    );
}

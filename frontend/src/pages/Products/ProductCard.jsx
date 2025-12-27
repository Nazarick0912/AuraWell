import {motion} from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({product}) {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const handleCardClick = () => {
            navigate(`/product/${product.id}`);
        };

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        
        if (!user) {
            navigate('/login');
            return;
        }

        setIsAdding(true);
        const success = await addToCart(product.id, 1);
        setIsAdding(false);
        
        if (success) {
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
        }
    };

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
                transition-shadow flex flex-col
            "
        >
            <div className="aspect-square bg-cream-100 overflow-hidden rounded-lg">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = '/productCard/placeholder.jpg';
                        e.target.onerror = null;
                    }}
                />
            </div>

            <p className="mt-2 text-xs text-sage-500 capitalize">{product.ageGroup}</p>

            <h3 className="mt-1 font-medium text-sage-800">
                {product.name}
            </h3>

            <p className="mt-3 font-semibold">
                RM {product.price?.toFixed(2)}
            </p>

            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`
                    mt-4 w-full py-2.5 rounded-lg font-medium text-sm
                    flex items-center justify-center gap-2
                    transition-all duration-200
                    ${justAdded 
                        ? "bg-emerald-500 text-white" 
                        : "bg-sage-600 text-white hover:bg-sage-700"
                    }
                    ${isAdding ? "opacity-70 cursor-wait" : ""}
                `}
            >
                {justAdded ? (
                    <>
                        <Check size={16} />
                        Added!
                    </>
                ) : isAdding ? (
                    "Adding..."
                ) : (
                    <>
                        <ShoppingCart size={16} />
                        Add to Cart
                    </>
                )}
            </button>
        </motion.div>
    );
}

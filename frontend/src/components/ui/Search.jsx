import {Search as SearchIcon} from "lucide-react";

export default function Search({value, onChange, onSearch, placeholder = "Search products..."}) {
    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder={placeholder}
                className="
                    w-full text-lg px-4 py-3 pr-12 rounded-xl
                    bg-white border border-sage-300
                    text-sage-800 placeholder-sage-400
                    focus:outline-none focus:ring-2 focus:ring-sage-300
                "
            />
            <button
                onClick={onSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
                aria-label="Search"
            >
                <SearchIcon className="w-5 h-5"/>
            </button>
        </div>
    );
}

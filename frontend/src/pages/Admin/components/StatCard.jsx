export default function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${color}`}>
                <Icon size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-sage-500 font-bold uppercase tracking-wider truncate">{label}</p>
                <p className="text-xl sm:text-2xl font-display font-bold text-sage-900">{value}</p>
            </div>
        </div>
    );
}
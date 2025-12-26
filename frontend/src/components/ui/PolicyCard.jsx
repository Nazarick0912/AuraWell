import React from 'react';

export default function PolicyCard({ icon: Icon, title, content }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-cream-200 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-sage-100 rounded-lg">
                    <Icon className="w-5 h-5 text-sage-600" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-sage-800 mb-2">
                        {title}
                    </h2>
                    <p className="text-sage-600 text-sm leading-relaxed">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}

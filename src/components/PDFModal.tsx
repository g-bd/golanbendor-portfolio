"use client";

import { useEffect, useState } from "react";
import { X, BookOpen, Download } from "lucide-react";

interface PDFModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
}

export default function PDFModal({
    isOpen,
    onClose,
    pdfUrl,
    title,
}: PDFModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            onClick={onClose}
        >
            <div
                className={`w-[90%] max-w-[1000px] h-[85vh] bg-[#1a1a2e] border border-[#00e5ff] rounded-xl flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.2)] transform transition-transform duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-4"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/30 rounded-t-xl">
                    <div className="flex items-center gap-2 text-white font-grotesk text-lg">
                        <BookOpen className="text-[#00e5ff]" />
                        <span>{title}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-[#ff0055] hover:rotate-90 transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 bg-black overflow-hidden relative">
                    {isOpen && (
                        <iframe
                            src={pdfUrl}
                            className="w-full h-full border-0"
                            title="PDF Viewer"
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 flex justify-end bg-black/30 rounded-b-xl">
                    <a
                        href={pdfUrl}
                        download
                        className="flex items-center gap-2 px-5 py-2 bg-[#00e5ff] text-black font-rajdhani font-bold uppercase rounded hover:bg-white hover:shadow-[0_0_15px_white] transition-all"
                    >
                        <Download size={18} />
                        Download PDF
                    </a>
                </div>
            </div>
        </div>
    );
}

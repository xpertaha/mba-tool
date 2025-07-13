import React from 'react';

const TargetIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const frameworkData = [
  {
    title: "AIDA",
    tagline: "جذب الانتباه ثم بناء الرغبة تدريجياً. هو المسار الكلاسيكي لإقناع العميل خطوة بخطوة.",
    useCase: "أغلب المنتجات والخدمات. مثالي لحملات تبدأ من الصفر مع جمهور جديد.",
    example: "إطلاق علامة تجارية جديدة للملابس، تسويق لشقة..."
  },
  {
    title: "PAS",
    tagline: "عرض المشكلة، تم تضخيمها، ثم تقديم الحل. إطار عاطفي جداً يركز على 'الألم'.",
    useCase: "الخدمات التي تحل مشاكل واضحة ومؤلمة.",
    example: "خدمة استشارة نفسية، منتج لعلاج حب الشباب، برنامج للتخلص من الديون."
  },
  {
    title: "Before-After-Bridge",
    tagline: "تصوير الحالة قبل وبعد، وتقديم المنتج كجسر بينهما. يركز على قصة التحول.",
    useCase: "المنتجات والخدمات التي تغير حياة أو عادات الشخص.",
    example: "برنامج رياضي لإنقاص الوزن، دورات تكوينية لتغيير المسار المهني."
  },
  {
    title: "FAB",
    tagline: "إظهار المميزات، والفوائد العملية، ثم المنافع الحقيقية. إطار منطقي وعقلاني.",
    useCase: "المنتجات التقنية أو المعقدة، وخدمات SaaS و B2B.",
    example: "هاتف ذكي جديد، برنامج كمبيوتر، سيارة."
  },
  {
    title: "4U's / SLAP",
    tagline: "أطر عمل سريعة ومباشرة لجذب الانتباه الفوري في المحتوى السريع.",
    useCase: "العناوين، إعلانات الفيديو القصيرة (Reels/TikTok)، والمحتوى الفيروسي.",
    example: "إعلان عن تخفيضات سريعة (Flash Sale)، فيديو قصير يعرض خاصية مثيرة."
  }
];

interface FrameworkHelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FrameworkHelpModal: React.FC<FrameworkHelpModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-gray-800 text-gray-200 rounded-2xl shadow-2xl shadow-blue-500/20 p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in-down"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 left-4 text-gray-500 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <header className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">دليل سريع لاختيار إطار عمل كتابة الإعلانات المناسب</h2>
                </header>

                <div className="space-y-4">
                    {frameworkData.map((framework) => (
                        <div key={framework.title} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 transition-transform hover:scale-[1.02] hover:border-blue-500/50">
                            <h3 className="text-xl font-bold text-blue-300 mb-2">{framework.title}</h3>
                            <p className="text-gray-300 italic mb-4">"{framework.tagline}"</p>
                            
                            <div className="border-t border-gray-600 pt-3">
                                <h4 className="font-bold mb-2 flex items-center"><TargetIcon /> متى يُستخدم؟</h4>
                                <p className="text-gray-400 pr-7">{framework.useCase}</p>
                            </div>

                            <div className="mt-3 border-t border-gray-600 pt-3">
                                <h4 className="font-bold mb-2 flex items-center"><LightbulbIcon /> مثال للمنتج/الخدمة</h4>
                                <p className="text-gray-400 pr-7">{framework.example}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FrameworkHelpModal;

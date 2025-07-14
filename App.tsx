
import React, { useState, useCallback } from 'react';
import { FormData } from './types';
import { generateStrategy } from './services/geminiService';
import Loader from './components/Loader';
import MarkdownDisplay from './components/MarkdownDisplay';
import FrameworkHelpModal from './components/FrameworkHelpModal';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        productDesc: '',
        targetAudience: '',
        mainMessage: '',
        copywritingFramework: ''
    });
    const [strategy, setStrategy] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.productDesc || !formData.targetAudience || !formData.mainMessage) {
            setError('المرجو ملء جميع الخانات.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setStrategy('');

        try {
            const result = await generateStrategy(formData.productDesc, formData.targetAudience, formData.mainMessage, formData.copywritingFramework);
            setStrategy(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(`حدث خطأ أثناء إنشاء الاستراتيجية. تأكد من صحة مفتاح API الخاص بك. (${err.message})`);
            } else {
                setError('حدث خطأ غير متوقع.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [formData]);

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center p-4">
            <main className="container max-w-3xl w-full bg-gray-800 p-8 rounded-xl shadow-2xl shadow-blue-500/10">
                <header className="text-center mb-8 border-b border-gray-700 pb-6">
                    <h1 className="text-4xl font-bold text-blue-400">مولد استراتيجيات الإعلان</h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        الفكرة عليك، والاستراتيجية علينا. أدخل وصفاً بسيطاً لإعلانك، واحصل على خطة تسويق متكاملة من 5 مراحل، مبنية على خبرة MBA.
                    </p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="form-group">
                            <label htmlFor="productDesc" className="block mb-2 font-bold text-gray-300">1. شنو هو المنتج أو الخدمة ديالك؟</label>
                            <textarea
                                id="productDesc"
                                rows={3}
                                placeholder="مثال: خدمة تبديل الدراجات الهوائية القديمة بالجديدة..."
                                value={formData.productDesc}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="targetAudience" className="block mb-2 font-bold text-gray-300">2. شكون هو الجمهور المستهدف الرئيسي؟</label>
                            <textarea
                                id="targetAudience"
                                rows={3}
                                placeholder="مثال: الناس لي عندهم دراجات قديمة وباغيين يجددوها..."
                                value={formData.targetAudience}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mainMessage" className="block mb-2 font-bold text-gray-300">3. شنو هي الرسالة الأساسية لي بغيتي توصل؟</label>
                            <textarea
                                id="mainMessage"
                                rows={3}
                                placeholder="مثال: يمكنك الاستفادة من دراجتك القديمة للحصول على تخفيض..."
                                value={formData.mainMessage}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500"
                            />
                        </div>
                         <div className="form-group">
                            <div className="flex items-center gap-x-2 mb-2">
                                <label htmlFor="copywritingFramework" className="font-bold text-gray-300">4. اختر إطار عمل الكتابة (اختياري)</label>
                                <button
                                    type="button"
                                    onClick={() => setIsHelpModalOpen(true)}
                                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                                    aria-label="مساعدة في اختيار إطار العمل"
                                >
                                    اعرف المزيد
                                </button>
                            </div>
                            <select
                                id="copywritingFramework"
                                value={formData.copywritingFramework}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200"
                            >
                                <option value="">بدون إطار محدد</option>
                                <option value="AIDA">AIDA (Attention, Interest, Desire, Action)</option>
                                <option value="PAS">PAS (Problem, Agitate, Solve)</option>
                                <option value="Before-After-Bridge">Before-After-Bridge</option>
                                <option value="FAB">FAB (Features, Advantages, Benefits)</option>
                                <option value="4U's">4U's (Useful, Urgent, Unique, Ultra-specific)</option>
                                <option value="SLAP">SLAP (Stop, Look, Act, Purchase)</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full mt-8 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-lg">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="mr-3">جاري الإنشاء...</span>
                            </>
                        ) : (
                            <span>أنشئ الاستراتيجية</span>
                        )}
                    </button>
                </form>

                <section className="mt-10 min-h-[100px]">
                    {isLoading && !strategy && <Loader />}
                    {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}
                    {strategy && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold mb-4 text-center">الاستراتيجية المقترحة:</h2>
                            <MarkdownDisplay markdownContent={strategy} />
                        </div>
                    )}
                </section>
            </main>
            <footer className="text-center mt-6 text-gray-500 text-sm">
                <p>تم التطوير من طرف  XperTaha لـ MBA Community.</p>
            </footer>
            
            <FrameworkHelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default App;

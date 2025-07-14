import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'https://esm.sh/react-i18next@^15.0.0';
import { FormData } from './types';
import { generateStrategy } from './services/geminiService';
import Loader from './components/Loader';
import MarkdownDisplay from './components/MarkdownDisplay';
import FrameworkHelpModal from './components/FrameworkHelpModal';

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const langButtonClass = (lang: string) => 
        `px-3 py-1 text-sm rounded-md transition-colors ${i18n.language === lang ? 'bg-blue-600 font-bold text-white' : 'bg-gray-700 hover:bg-gray-600'}`;

    return (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-900 p-1 rounded-lg">
            <button onClick={() => changeLanguage('ar')} className={langButtonClass('ar')}>العربية</button>
            <button onClick={() => changeLanguage('en')} className={langButtonClass('en')}>English</button>
            <button onClick={() => changeLanguage('fr')} className={langButtonClass('fr')}>Français</button>
        </div>
    );
}

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        productDesc: '',
        targetAudience: '',
        mainMessage: '',
        copywritingFramework: '',
        outputLanguage: 'العربية' // Default output language
    });
    const [strategy, setStrategy] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.productDesc || !formData.targetAudience || !formData.mainMessage) {
            setError(t('errorFillFields'));
            return;
        }

        setIsLoading(true);
        setError(null);
        setStrategy('');

        try {
            const result = await generateStrategy(formData.productDesc, formData.targetAudience, formData.mainMessage, formData.copywritingFramework, formData.outputLanguage);
            setStrategy(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(t('errorApi', { message: err.message }));
            } else {
                setError(t('errorUnexpected'));
            }
        } finally {
            setIsLoading(false);
        }
    }, [formData, t]);

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center p-4">
            <main className="container max-w-3xl w-full bg-gray-800 p-8 rounded-xl shadow-2xl shadow-blue-500/10 relative">
                <LanguageSelector />
                <header className="text-center mb-8 border-b border-gray-700 pb-6 pt-10">
                    <h1 className="text-4xl font-bold text-blue-400">{t('title')}</h1>
                    <p className="text-gray-400 mt-2 text-lg">{t('subtitle')}</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="form-group">
                            <label htmlFor="productDesc" className="block mb-2 font-bold text-gray-300">{t('productDescLabel')}</label>
                            <textarea
                                id="productDesc"
                                rows={3}
                                placeholder={t('productDescPlaceholder')}
                                value={formData.productDesc}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="targetAudience" className="block mb-2 font-bold text-gray-300">{t('targetAudienceLabel')}</label>
                            <textarea
                                id="targetAudience"
                                rows={3}
                                placeholder={t('targetAudiencePlaceholder')}
                                value={formData.targetAudience}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mainMessage" className="block mb-2 font-bold text-gray-300">{t('mainMessageLabel')}</label>
                            <textarea
                                id="mainMessage"
                                rows={3}
                                placeholder={t('mainMessagePlaceholder')}
                                value={formData.mainMessage}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500"
                            />
                        </div>
                         <div className="form-group">
                            <div className="flex items-center gap-x-2 mb-2">
                                <label htmlFor="copywritingFramework" className="font-bold text-gray-300">{t('frameworkLabel')}</label>
                                <button
                                    type="button"
                                    onClick={() => setIsHelpModalOpen(true)}
                                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                                    aria-label={t('helpAriaLabel')}
                                >
                                    {t('helpLink')}
                                </button>
                            </div>
                            <select
                                id="copywritingFramework"
                                value={formData.copywritingFramework}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200"
                            >
                                <option value="">{t('noFramework')}</option>
                                <option value="AIDA">AIDA (Attention, Interest, Desire, Action)</option>
                                <option value="PAS">PAS (Problem, Agitate, Solve)</option>
                                <option value="Before-After-Bridge">Before-After-Bridge</option>
                                <option value="FAB">FAB (Features, Advantages, Benefits)</option>
                                <option value="4U's">4U's (Useful, Urgent, Unique, Ultra-specific)</option>
                                <option value="SLAP">SLAP (Stop, Look, Act, Purchase)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="outputLanguage" className="block mb-2 font-bold text-gray-300">{t('outputLanguageLabel')}</label>
                             <select
                                id="outputLanguage"
                                value={formData.outputLanguage}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200"
                            >
                                <option value="العربية">العربية</option>
                                <option value="English">English</option>
                                <option value="Français">Français</option>
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
                                <span className="mr-3">{t('generatingButton')}</span>
                            </>
                        ) : (
                            <span>{t('generateButton')}</span>
                        )}
                    </button>
                </form>

                <section className="mt-10 min-h-[100px]">
                    {isLoading && !strategy && <Loader />}
                    {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}
                    {strategy && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold mb-4 text-center">{t('suggestedStrategy')}</h2>
                            <MarkdownDisplay markdownContent={strategy} />
                        </div>
                    )}
                </section>
            </main>
            <footer className="text-center mt-6 text-gray-500 text-sm">
                <p>{t('footer')}</p>
            </footer>
            
            <FrameworkHelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default App;

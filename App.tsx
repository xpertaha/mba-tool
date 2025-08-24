import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FormData } from './types';
import { generateStrategy, analyzeUrlAndGenerateStrategy, analyzeImageAndExtractDetails } from './services/geminiService';
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
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-900 p-1 rounded-lg z-10">
            <button onClick={() => changeLanguage('ar')} className={langButtonClass('ar')}>العربية</button>
            <button onClick={() => changeLanguage('en')} className={langButtonClass('en')}>English</button>
            <button onClick={() => changeLanguage('fr')} className={langButtonClass('fr')}>Français</button>
        </div>
    );
}

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve({ base64, mimeType: file.type });
        };
        reader.onerror = error => reject(error);
    });
};

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [view, setView] = useState<'home' | 'manual'>('home');

    // === State for Manual Form ===
    const [formData, setFormData] = useState<FormData>({
        productDesc: '',
        targetAudience: '',
        mainMessage: '',
        copywritingFramework: '',
        outputLanguage: 'العربية'
    });
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    
    // === State for Link Analyzer ===
    const [url, setUrl] = useState('');

    // === State for Image Analyzer ===
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // === Shared State ===
    const [strategy, setStrategy] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);
    
    const resetState = useCallback(() => {
        setStrategy('');
        setError(null);
        setIsLoading(false);
        setLoadingMessage('');
        setUrl('');
        setImageFile(null);
        setImagePreview(null);
        setFormData(prev => ({...prev, productDesc: '', targetAudience: '', mainMessage: ''}));
    }, []);

    // Manual Form Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleManualSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.productDesc || !formData.targetAudience || !formData.mainMessage) {
            setError(t('errorFillFields'));
            return;
        }
        setIsLoading(true);
        setLoadingMessage(t('generatingButton'));
        setError(null);
        setStrategy('');
        try {
            const result = await generateStrategy(formData.productDesc, formData.targetAudience, formData.mainMessage, formData.copywritingFramework, formData.outputLanguage);
            setStrategy(result);
        } catch (err) {
            setError(err instanceof Error ? t('errorApi', { message: err.message }) : t('errorUnexpected'));
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [formData, t]);

    // Link Analyzer Handler
    const handleUrlSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) {
            setError(t('errorFillFields'));
            return;
        }
        setIsLoading(true);
        setLoadingMessage(t('loadingAnalysis'));
        setError(null);
        setStrategy('');
        try {
            const result = await analyzeUrlAndGenerateStrategy(url, formData.outputLanguage);
            setStrategy(result);
        } catch (err) {
            if (err instanceof Error && err.message === 'CORS_ERROR') {
                setError(t('errorCors'));
            } else {
                 setError(err instanceof Error ? t('errorFetch') : t('errorUnexpected'));
            }
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [url, formData.outputLanguage, t]);

    // Image Analyzer Handlers
    const handleImageFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImageFile(null);
            setImagePreview(null);
        }
    };
    
    const handleImageSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) return;

        setIsLoading(true);
        setLoadingMessage(t('loadingImageAnalysis'));
        setError(null);
        try {
            const { base64, mimeType } = await fileToBase64(imageFile);
            const details = await analyzeImageAndExtractDetails(base64, mimeType);
            setFormData(prev => ({
                ...prev,
                productDesc: details.productDesc,
                targetAudience: details.targetAudience,
                mainMessage: details.mainMessage,
            }));
            setView('manual');
        } catch (err) {
             setError(err instanceof Error ? t('errorApi', { message: err.message }) : t('errorUnexpected'));
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [imageFile, t]);

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageFileChange(e.dataTransfer.files[0]);
        }
    };


    const handleViewChange = (newView: 'home' | 'manual') => {
        resetState();
        setView(newView);
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl relative">
                <LanguageSelector />
            </div>
            {view === 'manual' ? (
                // ===================================
                //        MANUAL VIEW
                // ===================================
                <main className="container max-w-3xl w-full bg-gray-800 p-8 rounded-xl shadow-2xl shadow-blue-500/10 relative mt-4">
                     <button onClick={() => handleViewChange('home')} className="text-blue-400 hover:text-blue-300 transition-colors absolute top-6 ltr:left-6 rtl:right-6 text-sm font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                        {t('switchToLink')}
                    </button>
                    <header className="text-center mb-8 border-b border-gray-700 pb-6 pt-10">
                        <h1 className="text-4xl font-bold text-blue-400">{t('title')}</h1>
                        <p className="text-gray-400 mt-2 text-lg">{t('subtitle')}</p>
                    </header>

                    {imagePreview && (
                      <div className="mb-6 text-center">
                          <h3 className="text-lg font-semibold text-gray-300 mb-3">{t('analyzedImageTitle')}</h3>
                          <img src={imagePreview} alt="Analyzed image" className="max-w-xs mx-auto rounded-lg shadow-lg border-2 border-gray-600" />
                      </div>
                    )}

                    <form onSubmit={handleManualSubmit}>
                        <div className="space-y-6">
                            <div className="form-group">
                                <label htmlFor="productDesc" className="block mb-2 font-bold text-gray-300">{t('productDescLabel')}</label>
                                <textarea id="productDesc" rows={3} placeholder={t('productDescPlaceholder')} value={formData.productDesc} onChange={handleInputChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="targetAudience" className="block mb-2 font-bold text-gray-300">{t('targetAudienceLabel')}</label>
                                <textarea id="targetAudience" rows={3} placeholder={t('targetAudiencePlaceholder')} value={formData.targetAudience} onChange={handleInputChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mainMessage" className="block mb-2 font-bold text-gray-300">{t('mainMessageLabel')}</label>
                                <textarea id="mainMessage" rows={3} placeholder={t('mainMessagePlaceholder')} value={formData.mainMessage} onChange={handleInputChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500" />
                            </div>
                            <div className="form-group">
                                <div className="flex items-center gap-x-2 mb-2">
                                    <label htmlFor="copywritingFramework" className="font-bold text-gray-300">{t('frameworkLabel')}</label>
                                    <button type="button" onClick={() => setIsHelpModalOpen(true)} className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors" aria-label={t('helpAriaLabel')}>{t('helpLink')}</button>
                                </div>
                                <select id="copywritingFramework" value={formData.copywritingFramework} onChange={handleInputChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200">
                                    <option value="">{t('noFramework')}</option>
                                    <option value="AIDA">AIDA</option>
                                    <option value="PAS">PAS</option>
                                    <option value="Before-After-Bridge">Before-After-Bridge</option>
                                    <option value="FAB">FAB</option>
                                    <option value="4U's">4U's</option>
                                    <option value="SLAP">SLAP</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="outputLanguage" className="block mb-2 font-bold text-gray-300">{t('outputLanguageLabel')}</label>
                                <select id="outputLanguage" value={formData.outputLanguage} onChange={handleInputChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200">
                                    <option value="العربية">العربية</option>
                                    <option value="English">English</option>
                                    <option value="Français">Français</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full mt-8 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-lg">
                            {isLoading && loadingMessage === t('generatingButton') ? (<><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="mr-3">{t('generatingButton')}</span></>) : (<span>{t('generateButton')}</span>)}
                        </button>
                    </form>
                </main>
            ) : (
                // ===================================
                //        HOME / WORKFLOW VIEW
                // ===================================
                <main className="container max-w-5xl w-full p-8 rounded-xl relative mt-4">
                    <header className="text-center mb-8 border-b border-gray-700 pb-6">
                        <h1 className="text-4xl font-bold text-blue-400">{t('title')}</h1>
                        <p className="text-gray-400 mt-2 text-lg">{t('subtitle')}</p>
                    </header>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        
                        {/* Card 1: Analyze by Image */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500/30 flex flex-col transition-all duration-300">
                            <h2 className="text-2xl font-bold text-blue-300 mb-2">{t('analyzeWithImage')}</h2>
                            <p className="text-gray-400 mb-4 flex-grow">{t('analyzeWithImageDesc')}</p>
                            <form onSubmit={handleImageSubmit} className="flex flex-col h-full">
                                <div 
                                    className={`flex-grow flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-blue-400 bg-gray-700/50' : 'border-gray-600 hover:border-gray-500'}`}
                                    onDragEnter={handleDragEvents} onDragOver={handleDragEvents} onDragLeave={handleDragEvents} onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={(e) => handleImageFileChange(e.target.files ? e.target.files[0] : null)} />
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="max-h-24 rounded-md object-contain" />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <p className="mt-1 text-sm font-semibold text-blue-400">{t('uploadImage')}</p>
                                            <p className="text-xs text-gray-500">{t('dragDropPrompt')}</p>
                                        </div>
                                    )}
                                </div>
                                <button type="submit" disabled={isLoading || !imageFile} className="w-full mt-4 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-lg">
                                    {isLoading && loadingMessage === t('loadingImageAnalysis') ? (<><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="mr-3">{t('generatingButton')}</span></>) : (<span>{t('analyzeImageButton')}</span>)}
                                </button>
                            </form>
                        </div>
                        
                        {/* Card 2: Analyze by Link */}
                        <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg border border-gray-700/80 flex flex-col transition-all duration-300">
                            <h2 className="text-2xl font-bold text-blue-300/80 mb-2">{t('analyzeWithLink')}</h2>
                            <p className="text-gray-400 mb-4 flex-grow">{t('analyzeWithLinkDesc')}</p>
                            <form onSubmit={handleUrlSubmit} className="flex flex-col h-full">
                                <div className="flex-grow space-y-3">
                                <input type="url" placeholder={t('urlPlaceholder')} value={url} onChange={(e) => setUrl(e.target.value)} required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200 placeholder-gray-500" />
                                 <select id="outputLanguage" value={formData.outputLanguage} onChange={handleInputChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-200">
                                    <option value="العربية">العربية</option>
                                    <option value="English">English</option>
                                    <option value="Français">Français</option>
                                </select>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full mt-4 py-3 px-4 bg-blue-600/80 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-lg">
                                    {isLoading && loadingMessage === t('loadingAnalysis') ? (<><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="mr-3">{t('generatingButton')}</span></>) : (<span>{t('analyzeLinkButton')}</span>)}
                                </button>
                            </form>
                        </div>
                        
                        {/* Card 3: Manual Entry */}
                        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700/50 flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-gray-600 hover:bg-gray-800/80">
                            <h2 className="text-2xl font-bold text-gray-400 mb-2">{t('manualEntry')}</h2>
                            <p className="text-gray-500 mb-4 flex-grow">{t('manualEntryDesc')}</p>
                            <button onClick={() => handleViewChange('manual')} className="w-full py-3 px-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors duration-300 text-lg">
                                {t('manualEntryButton')}
                            </button>
                        </div>
                    </div>
                </main>
            )}

            <section className="container max-w-4xl w-full mt-10 min-h-[100px]">
                {isLoading && (
                    <div className="text-center">
                        <Loader />
                         {loadingMessage && <p className="text-blue-300 animate-pulse">{loadingMessage}</p>}
                    </div>
                )}
                {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}
                {strategy && (
                    <div className="animate-fade-in bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">{t('suggestedStrategy')}</h2>
                        <MarkdownDisplay markdownContent={strategy} />
                    </div>
                )}
            </section>
            
            <footer className="text-center mt-6 text-gray-500 text-sm">
                <p>{t('footer')}</p>
            </footer>
            
            <FrameworkHelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default App;

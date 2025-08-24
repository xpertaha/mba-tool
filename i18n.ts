import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Ad Strategy Generator",
      subtitle: "You have the idea, we have the strategy. Enter a simple description of your ad, and get a complete 5-stage marketing plan, built on MBA expertise.",
      productDescLabel: "1. What is your product or service?",
      productDescPlaceholder: "Example: A service to trade old bicycles for new ones...",
      targetAudienceLabel: "2. Who is the main target audience?",
      targetAudiencePlaceholder: "Example: People who have old bikes and want to upgrade...",
      mainMessageLabel: "3. What is the core message you want to convey?",
      mainMessagePlaceholder: "Example: You can use your old bike to get a discount...",
      frameworkLabel: "4. Choose a copywriting framework (optional)",
      helpLink: "(Help?)",
      helpAriaLabel: "Help choosing a framework",
      noFramework: "No specific framework",
      outputLanguageLabel: "5. Strategy Language",
      generateButton: "Generate Strategy",
      generatingButton: "Generating...",
      errorFillFields: "Please fill in all required fields.",
      errorApi: "An error occurred while generating the strategy. Check your API key. ({{message}})",
      errorUnexpected: "An unexpected error occurred.",
      suggestedStrategy: "Suggested Strategy:",
      footer: "Developed with Gemini for the MBA Community.",
      modalTitle: "Quick Guide to Choosing the Right Copywriting Framework",
      modalClose: "Close",
      modalWhenToUse: "When to use?",
      modalExample: "Product/Service Example",

      // Redesigned homepage keys
      analyzeWithImage: "Analyze with an Image",
      analyzeWithImageDesc: "Upload an ad image to get started instantly.",
      uploadImage: "Upload Image",
      dragDropPrompt: "or drag & drop",
      analyzeImageButton: "Analyze Image",
      
      analyzeWithLink: "Analyze with a Link",
      analyzeWithLinkDesc: "Just paste a product URL and let AI do the work.",
      urlPlaceholder: "Paste product URL here...",
      analyzeLinkButton: "Analyze Link",

      manualEntry: "Manual Entry",
      manualEntryDesc: "Enter your product details yourself for a custom strategy.",
      manualEntryButton: "Start Now",
      
      switchToManual: "Or, enter details manually",
      switchToLink: "Analyze a URL instead",

      loadingAnalysis: "Analyzing URL, extracting data, and building strategy...",
      loadingImageAnalysis: "Analyzing image and extracting details...",
      analyzedImageTitle: "Image for Analysis:",

      errorFetch: "Failed to fetch content from the link. Please ensure the URL is correct and publicly accessible.",
      errorCors: "Could not analyze the link due to browser security restrictions (CORS). This often happens with major sites like AliExpress or Temu. Please try the manual entry method instead.",

      frameworks: {
        aida: {
          title: "AIDA",
          tagline: "Grab attention, then gradually build desire. The classic path to persuade a customer step by step.",
          useCase: "Most products and services. Ideal for campaigns starting from scratch with a new audience.",
          example: "Launching a new clothing brand, marketing an apartment..."
        },
        pas: {
          title: "PAS",
          tagline: "Present the Problem, Agitate it, then offer the Solution. A very emotional framework focusing on 'pain'.",
          useCase: "Services that solve clear and painful problems.",
          example: "Psychological counseling, acne treatment product, debt relief program."
        },
        beforeAfterBridge: {
          title: "Before-After-Bridge",
          tagline: "Picture the before and after states, presenting the product as the bridge between them. Focuses on the transformation story.",
          useCase: "Products and services that change a person's life or habits.",
          example: "A weight loss fitness program, training courses for a career change."
        },
        fab: {
          title: "FAB",
          tagline: "Show Features, practical Advantages, then the real Benefits. A logical and rational framework.",
          useCase: "Technical or complex products, SaaS, and B2B services.",
          example: "A new smartphone, computer software, a car."
        },
        uslap: {
          title: "4U's / SLAP",
          tagline: "Quick and direct frameworks for grabbing immediate attention in fast-paced content.",
          useCase: "Headlines, short video ads (Reels/TikTok), and viral content.",
          example: "An ad for a flash sale, a short video showcasing an exciting feature."
        }
      }
    }
  },
  fr: {
    translation: {
      title: "Générateur de Stratégies Publicitaires",
      subtitle: "Vous avez l'idée, nous avons la stratégie. Entrez une description simple de votre publicité et obtenez un plan marketing complet en 5 étapes, basé sur l'expertise MBA.",
      productDescLabel: "1. Quel est votre produit ou service ?",
      productDescPlaceholder: "Exemple : Un service d'échange de vélos anciens contre des neufs...",
      targetAudienceLabel: "2. Qui est le public cible principal ?",
      targetAudiencePlaceholder: "Exemple : Les personnes qui ont de vieux vélos et veulent les renouveler...",
      mainMessageLabel: "3. Quel est le message principal que vous voulez transmettre ?",
      mainMessagePlaceholder: "Exemple : Vous pouvez utiliser votre ancien vélo pour obtenir une réduction...",
      frameworkLabel: "4. Choisissez un framework de copywriting (optionnel)",
      helpLink: "(Aide ?)",
      helpAriaLabel: "Aide pour choisir un framework",
      noFramework: "Sans framework spécifique",
      outputLanguageLabel: "5. Langue de la Stratégie",
      generateButton: "Générer la Stratégie",
      generatingButton: "Génération en cours...",
      errorFillFields: "Veuillez remplir tous les champs obligatoires.",
      errorApi: "Une erreur est survenue lors de la génération de la stratégie. Vérifiez votre clé API. ({{message}})",
      errorUnexpected: "Une erreur inattendue est survenue.",
      suggestedStrategy: "Stratégie Suggérée :",
      footer: "Développé avec Gemini pour la Communauté MBA.",
      modalTitle: "Guide Rapide pour Choisir le Bon Framework de Copywriting",
      modalClose: "Fermer",
      modalWhenToUse: "Quand l'utiliser ?",
      modalExample: "Exemple de Produit/Service",
      
      // Redesigned homepage keys
      analyzeWithImage: "Analyser avec une Image",
      analyzeWithImageDesc: "Téléchargez une image publicitaire pour commencer instantanément.",
      uploadImage: "Télécharger une image",
      dragDropPrompt: "ou glisser-déposer",
      analyzeImageButton: "Analyser l'image",

      analyzeWithLink: "Analyser avec un lien",
      analyzeWithLinkDesc: "Collez simplement l'URL d'un produit et laissez l'IA faire le travail.",
      urlPlaceholder: "Collez l'URL du produit ici...",
      analyzeLinkButton: "Analyser le lien",
      
      manualEntry: "Saisie manuelle",
      manualEntryDesc: "Entrez vous-même les détails de votre produit pour une stratégie personnalisée.",
      manualEntryButton: "Commencer",

      switchToManual: "Ou, entrez les détails manuellement",
      switchToLink: "Analyser une URL à la place",
      
      loadingAnalysis: "Analyse de l'URL, extraction des données et élaboration de la stratégie...",
      loadingImageAnalysis: "Analyse de l'image et extraction des détails...",
      analyzedImageTitle: "Image pour analyse :",

      errorFetch: "Échec de la récupération du contenu du lien. Veuillez vous assurer que l'URL est correcte et publiquement accessible.",
      errorCors: "Impossible d'analyser le lien à cause des restrictions de sécurité du navigateur (CORS). Cela arrive souvent avec les grands sites comme AliExpress ou Temu. Veuillez essayer la saisie manuelle.",

      frameworks: {
        aida: {
          title: "AIDA",
          tagline: "Attirer l'attention, puis construire le désir progressivement. Le parcours classique pour persuader le client étape par étape.",
          useCase: "La plupart des produits et services. Idéal pour les campagnes qui partent de zéro avec un nouveau public.",
          example: "Lancement d'une nouvelle marque de vêtements, marketing d'un appartement..."
        },
        pas: {
          title: "PAS",
          tagline: "Présenter le Problème, l'Agiter, puis proposer la Solution. Un framework très émotionnel axé sur la 'douleur'.",
          useCase: "Services qui résolvent des problèmes clairs et douloureux.",
          example: "Conseil psychologique, produit contre l'acné, programme de désendettement."
        },
        beforeAfterBridge: {
          title: "Before-After-Bridge",
          tagline: "Décrire l'état avant et après, en présentant le produit comme le pont entre les deux. Se concentre sur l'histoire de la transformation.",
          useCase: "Produits et services qui changent la vie ou les habitudes d'une personne.",
          example: "Un programme de fitness pour perdre du poids, des formations pour un changement de carrière."
        },
        fab: {
          title: "FAB",
          tagline: "Montrer les Caractéristiques, les Avantages pratiques, puis les Bénéfices réels. Un framework logique et rationnel.",
          useCase: "Produits techniques ou complexes, services SaaS et B2B.",
          example: "Un nouveau smartphone, un logiciel informatique, une voiture."
        },
        uslap: {
          title: "4U's / SLAP",
          tagline: "Frameworks rapides et directs pour capter l'attention immédiate dans un contenu rapide.",
          useCase: "Titres, publicités vidéo courtes (Reels/TikTok), et contenu viral.",
          example: "Publicité pour une vente flash, une courte vidéo montrant une fonctionnalité excitante."
        }
      }
    }
  },
  ar: {
    translation: {
      title: "مولد استراتيجيات الإعلان",
      subtitle: "الفكرة عليك، والاستراتيجية علينا. أدخل وصفاً بسيطاً لإعلانك، واحصل على خطة تسويق متكاملة من 5 مراحل، مبنية على خبرة MBA.",
      productDescLabel: "1. شنو هو المنتج أو الخدمة ديالك؟",
      productDescPlaceholder: "مثال: خدمة تبديل الدراجات الهوائية القديمة بالجديدة...",
      targetAudienceLabel: "2. شكون هو الجمهور المستهدف الرئيسي؟",
      targetAudiencePlaceholder: "مثال: الناس لي عندهم دراجات قديمة وباغيين يجددوها...",
      mainMessageLabel: "3. شنو هي الرسالة الأساسية لي بغيتي توصل؟",
      mainMessagePlaceholder: "مثال: يمكنك الاستفادة من دراجتك القديمة للحصول على تخفيض...",
      frameworkLabel: "4. اختر إطار عمل الكتابة (اختياري)",
      helpLink: "(مساعدة؟)",
      helpAriaLabel: "مساعدة في اختيار إطار العمل",
      noFramework: "بدون إطار محدد",
      outputLanguageLabel: "5. لغة الاستراتيجية",
      generateButton: "أنشئ الاستراتيجية",
      generatingButton: "جاري الإنشاء...",
      errorFillFields: "المرجو ملء جميع الخانات.",
      errorApi: "حدث خطأ أثناء إنشاء الاستراتيجية. تأكد من صحة مفتاح API الخاص بك. ({{message}})",
      errorUnexpected: "حدث خطأ غير متوقع.",
      suggestedStrategy: "الاستراتيجية المقترحة:",
      footer: "تم التطوير بمساعدة Gemini لـ MBA Community.",
      modalTitle: "دليل سريع لاختيار إطار عمل كتابة الإعلانات المناسب",
      modalClose: "إغلاق",
      modalWhenToUse: "متى يُستخدم؟",
      modalExample: "مثال للمنتج/الخدمة",

      // Redesigned homepage keys
      analyzeWithImage: "أنشئ استراتيجية بصورة",
      analyzeWithImageDesc: "ارفع صورة إعلان لتبدأ فوراً.",
      uploadImage: "اختر صورة",
      dragDropPrompt: "أو اسحبها وأفلتها هنا",
      analyzeImageButton: "حلل الصورة",
      
      analyzeWithLink: "أنشئ استراتيجية عبر رابط",
      analyzeWithLinkDesc: "فقط الصق رابط المنتج ودع الذكاء الاصطناعي يقوم بالباقي.",
      urlPlaceholder: "الصق رابط المنتج هنا...",
      analyzeLinkButton: "حلل الرابط",
      
      manualEntry: "أنشئ استراتيجية يدوياً",
      manualEntryDesc: "أدخل تفاصيل منتجك بنفسك للحصول على استراتيجية مخصصة.",
      manualEntryButton: "ابدأ الآن",

      switchToManual: "أو، أدخل التفاصيل يدوياً",
      switchToLink: "أو، قم بتحليل رابط بدلاً من ذلك",

      loadingAnalysis: "جاري تحليل الرابط واستخراج البيانات وبناء الاستراتيجية...",
      loadingImageAnalysis: "جاري تحليل الصورة واستخراج التفاصيل...",
      analyzedImageTitle: "الصورة قيد التحليل:",

      errorFetch: "فشل في جلب محتوى الرابط. تأكد من صحة الرابط وأن الصفحة متاحة للعموم.",
      errorCors: "تعذر تحليل الرابط بسبب قيود أمان المتصفح (CORS). يحدث هذا غالبًا مع المواقع الكبرى مثل AliExpress أو Temu. الرجاء تجربة طريقة الإدخال اليدوي بدلاً من ذلك.",

      frameworks: {
        aida: {
          title: "AIDA",
          tagline: "جذب الانتباه ثم بناء الرغبة تدريجياً. هو المسار الكلاسيكي لإقناع العميل خطوة بخطوة.",
          useCase: "أغلب المنتجات والخدمات. مثالي لحملات تبدأ من الصفر مع جمهور جديد.",
          example: "إطلاق علامة تجارية جديدة للملابس، تسويق لشقة..."
        },
        pas: {
          title: "PAS",
          tagline: "عرض المشكلة، تم تضخيمها، ثم تقديم الحل. إطار عاطفي جداً يركز على 'الألم'.",
          useCase: "الخدمات التي تحل مشاكل واضحة ومؤلمة.",
          example: "خدمة استشارة نفسية، منتج لعلاج حب الشباب، برنامج للتخلص من الديون."
        },
        beforeAfterBridge: {
          title: "Before-After-Bridge",
          tagline: "تصوير الحالة قبل وبعد، وتقديم المنتج كجسر بينهما. يركز على قصة التحول.",
          useCase: "المنتجات والخدمات التي تغير حياة أو عادات الشخص.",
          example: "برنامج رياضي لإنقاص الوزن، دورات تكوينية لتغيير المسار المهني."
        },
        fab: {
          title: "FAB",
          tagline: "إظهار المميزات، والفوائد العملية، ثم المنافع الحقيقية. إطار منطقي وعقلاني.",
          useCase: "المنتجات التقنية أو المعقدة، وخدمات SaaS و B2B.",
          example: "هاتف ذكي جديد، برنامج كمبيوتر، سيارة."
        },
        uslap: {
          title: "4U's / SLAP",
          tagline: "أطر عمل سريعة ومباشرة لجذب الانتباه الفوري في المحتوى السريع.",
          useCase: "العناوين، إعلانات الفيديو القصيرة (Reels/TikTok)، والمحتوى الفيروسي.",
          example: "إعلان عن تخفيضات سريعة (Flash Sale)، فيديو قصير يعرض خاصية مثيرة."
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, 
    },
    detection: {
      order: ['htmlTag'],
      caches: [],
    }
  });

export default i18n;

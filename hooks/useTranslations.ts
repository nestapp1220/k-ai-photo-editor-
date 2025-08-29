/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

type Language = 'ja' | 'en' | 'ko';
type Translations = Record<string, string>;
type TranslationData = Record<Language, Translations>;

const translations: TranslationData = {
  en: {
    // App.tsx
    errorOccurred: 'An Error Occurred',
    tryAgain: 'Try Again',
    aiWorking: 'AI is working its magic...',
    retouch: 'Retouch',
    adjust: 'Adjust',
    filters: 'Filters',
    crop: 'Crop',
    promptDescription: 'Great! Now describe your localized edit below.',
    promptClick: 'Click an area on the image to make a precise edit.',
    promptExample: "e.g., 'change my shirt color to green'",
    promptPlaceholder: 'First click a point on the image',
    generate: 'Generate',
    undo: 'Undo',
    redo: 'Redo',
    compare: 'Compare',
    reset: 'Reset',
    uploadNew: 'Upload New',
    downloadImage: 'Download Image',
    compareAria: 'Press and hold to see original image',
    errorNoImage: 'No image loaded to edit.',
    errorNoPrompt: 'Please enter a description for your edit.',
    errorNoHotspot: 'Please click on the image to select an area to edit.',
    errorGenerateFailed: 'Failed to generate the image.',
    errorUnknown: 'An unknown error occurred.',
    errorNoImageApplyFilter: 'No image loaded to apply a filter to.',
    errorFilterFailed: 'Failed to apply the filter.',
    errorNoImageApplyAdjustment: 'No image loaded to apply an adjustment to.',
    errorAdjustmentFailed: 'Failed to apply the adjustment.',
    errorNoCropArea: 'Please select an area to crop.',
    errorCropProcessFailed: 'Could not process the crop.',

    // AdjustmentPanel.tsx
    adjTitle: 'Apply a Professional Adjustment',
    adjPresetBlur: 'Blur Background',
    adjPresetEnhance: 'Enhance Details',
    adjPresetWarmer: 'Warmer Lighting',
    adjPresetStudio: 'Studio Light',
    adjPlaceholder: "Or describe an adjustment (e.g., 'change background to a forest')",
    applyAdjustment: 'Apply Adjustment',

    // CropPanel.tsx
    cropTitle: 'Crop Image',
    cropDescription: 'Click and drag on the image to select a crop area.',
    aspectRatio: 'Aspect Ratio',
    free: 'free',
    applyCrop: 'Apply Crop',

    // FilterPanel.tsx
    filterTitle: 'Apply a Filter',
    filterPresetSynthwave: 'Synthwave',
    filterPresetAnime: 'Anime',
    filterPresetLomo: 'Lomo',
    filterPresetGlitch: 'Glitch',
    filterPlaceholder: "Or describe a custom filter (e.g., '80s synthwave glow')",
    applyFilter: 'Apply Filter',

    // StartScreen.tsx
    startTitle1: 'AI-Powered Photo Editing,',
    startTitle2: 'Simplified.',
    startSubtitle: 'Retouch photos, apply creative filters, or make professional adjustments using simple text prompts. No complex tools needed.',
    uploadImage: 'Upload an Image',
    dragAndDrop: 'or drag and drop a file',
    feature1Title: 'Precise Retouching',
    feature1Desc: 'Click any point on your image to remove blemishes, change colors, or add elements with pinpoint accuracy.',
    feature2Title: 'Creative Filters',
    feature2Desc: 'Transform photos with artistic styles. From vintage looks to futuristic glows, find or create the perfect filter.',
    feature3Title: 'Pro Adjustments',
    feature3Desc: 'Enhance lighting, blur backgrounds, or change the mood. Get studio-quality results without complex tools.',
  },
  ja: {
    // App.tsx
    errorOccurred: 'エラーが発生しました',
    tryAgain: '再試行',
    aiWorking: 'AIが魔法をかけています...',
    retouch: 'レタッチ',
    adjust: '調整',
    filters: 'フィルター',
    crop: 'クロップ',
    promptDescription: '素晴らしい！次に、部分的な編集内容を説明してください。',
    promptClick: '画像をクリックして、精密な編集を行う領域を選択してください。',
    promptExample: "例: 「シャツの色を緑に変えて」",
    promptPlaceholder: 'まず画像上の点をクリックしてください',
    generate: '生成',
    undo: '元に戻す',
    redo: 'やり直す',
    compare: '比較',
    reset: 'リセット',
    uploadNew: '新規アップロード',
    downloadImage: '画像をダウンロード',
    compareAria: '長押しで元の画像を表示',
    errorNoImage: '編集する画像が読み込まれていません。',
    errorNoPrompt: '編集内容の説明を入力してください。',
    errorNoHotspot: '画像をクリックして編集領域を選択してください。',
    errorGenerateFailed: '画像の生成に失敗しました。',
    errorUnknown: '不明なエラーが発生しました。',
    errorNoImageApplyFilter: 'フィルターを適用する画像が読み込まれていません。',
    errorFilterFailed: 'フィルターの適用に失敗しました。',
    errorNoImageApplyAdjustment: '調整を適用する画像が読み込まれていません。',
    errorAdjustmentFailed: '調整の適用に失敗しました。',
    errorNoCropArea: 'クロップする領域を選択してください。',
    errorCropProcessFailed: 'クロップを処理できませんでした。',

    // AdjustmentPanel.tsx
    adjTitle: 'プロフェッショナルな調整を適用',
    adjPresetBlur: '背景をぼかす',
    adjPresetEnhance: 'ディテール強化',
    adjPresetWarmer: '暖色照明',
    adjPresetStudio: 'スタジオ照明',
    adjPlaceholder: "または調整内容を記述 (例: 「背景を森に変えて」)",
    applyAdjustment: '調整を適用',

    // CropPanel.tsx
    cropTitle: '画像をクロップ',
    cropDescription: '画像上でドラッグしてクロップ領域を選択します。',
    aspectRatio: 'アスペクト比',
    free: '自由',
    applyCrop: 'クロップを適用',

    // FilterPanel.tsx
    filterTitle: 'フィルターを適用',
    filterPresetSynthwave: 'シンセウェーブ',
    filterPresetAnime: 'アニメ',
    filterPresetLomo: 'ロモ',
    filterPresetGlitch: 'グリッチ',
    filterPlaceholder: "またはカスタムフィルターを記述 (例: 「80年代のシンセ風の輝き」)",
    applyFilter: 'フィルターを適用',

    // StartScreen.tsx
    startTitle1: 'AIによる写真編集を、',
    startTitle2: 'もっとシンプルに。',
    startSubtitle: '簡単なテキスト指示で、写真のレタッチ、クリエイティブなフィルターの適用、プロフェッショナルな調整が可能です。複雑なツールは必要ありません。',
    uploadImage: '画像をアップロード',
    dragAndDrop: 'またはファイルをドラッグ＆ドロップ',
    feature1Title: '精密レタッチ',
    feature1Desc: '画像上の任意の点をクリックして、シミの除去、色の変更、要素の追加を正確に行えます。',
    feature2Title: 'クリエイティブフィルター',
    feature2Desc: 'ヴィンテージ風から未来的な輝きまで、芸術的なスタイルで写真を変換し、完璧なフィルターを見つけたり作成したりできます。',
    feature3Title: 'プロの調整',
    feature3Desc: '照明の強化、背景のぼかし、雰囲気の変更など、複雑なツールなしでスタジオ品質の結果を得られます。',
  },
  ko: {
    // App.tsx
    errorOccurred: '오류가 발생했습니다',
    tryAgain: '다시 시도',
    aiWorking: 'AI가 마법을 부리고 있습니다...',
    retouch: '리터치',
    adjust: '조정',
    filters: '필터',
    crop: '자르기',
    promptDescription: '좋아요! 이제 편집할 내용을 설명해주세요.',
    promptClick: '정밀한 편집을 위해 이미지 영역을 클릭하세요.',
    promptExample: "예: '셔츠 색상을 녹색으로 변경'",
    promptPlaceholder: '먼저 이미지의 한 점을 클릭하세요',
    generate: '생성',
    undo: '실행 취소',
    redo: '다시 실행',
    compare: '비교',
    reset: '초기화',
    uploadNew: '새로 업로드',
    downloadImage: '이미지 다운로드',
    compareAria: '원본 이미지를 보려면 길게 누르세요',
    errorNoImage: '편집할 이미지가 로드되지 않았습니다.',
    errorNoPrompt: '편집에 대한 설명을 입력하세요.',
    errorNoHotspot: '편집할 영역을 선택하려면 이미지를 클릭하세요.',
    errorGenerateFailed: '이미지 생성에 실패했습니다.',
    errorUnknown: '알 수 없는 오류가 발생했습니다.',
    errorNoImageApplyFilter: '필터를 적용할 이미지가 로드되지 않았습니다.',
    errorFilterFailed: '필터 적용에 실패했습니다.',
    errorNoImageApplyAdjustment: '조정을 적용할 이미지가 로드되지 않았습니다.',
    errorAdjustmentFailed: '조정 적용에 실패했습니다.',
    errorNoCropArea: '자르기 영역을 선택하세요.',
    errorCropProcessFailed: '자르기를 처리할 수 없습니다.',

    // AdjustmentPanel.tsx
    adjTitle: '전문적인 조정 적용',
    adjPresetBlur: '배경 흐리게',
    adjPresetEnhance: '디테일 강화',
    adjPresetWarmer: '따뜻한 조명',
    adjPresetStudio: '스튜디오 조명',
    adjPlaceholder: "또는 조정 내용 설명 (예: '배경을 숲으로 변경')",
    applyAdjustment: '조정 적용',

    // CropPanel.tsx
    cropTitle: '이미지 자르기',
    cropDescription: '이미지를 드래그하여 자르기 영역을 선택하세요.',
    aspectRatio: '종횡비',
    free: '자유롭게',
    applyCrop: '자르기 적용',

    // FilterPanel.tsx
    filterTitle: '필터 적용',
    filterPresetSynthwave: '신스웨이브',
    filterPresetAnime: '애니메이션',
    filterPresetLomo: '로모',
    filterPresetGlitch: '글리치',
    filterPlaceholder: "또는 사용자 정의 필터 설명 (예: '80년대 신스웨이브 빛')",
    applyFilter: '필터 적용',

    // StartScreen.tsx
    startTitle1: 'AI 기반 사진 편집,',
    startTitle2: '더 간편하게.',
    startSubtitle: '간단한 텍스트 프롬프트로 사진을 수정하고, 창의적인 필터를 적용하고, 전문적인 조정을 해보세요. 복잡한 도구는 필요 없습니다.',
    uploadImage: '이미지 업로드',
    dragAndDrop: '또는 파일을 드래그 앤 드롭',
    feature1Title: '정밀한 리터칭',
    feature1Desc: '이미지의 어느 지점이든 클릭하여 흠집을 제거하고, 색상을 변경하고, 정확하게 요소를 추가할 수 있습니다.',
    feature2Title: '창의적인 필터',
    feature2Desc: '빈티지 스타일부터 미래적인 빛까지, 예술적인 스타일로 사진을 변환하고 완벽한 필터를 찾거나 만들어보세요.',
    feature3Title: '전문가급 조정',
    feature3Desc: '복잡한 도구 없이 조명을 강화하고, 배경을 흐리게 하고, 분위기를 바꾸어 스튜디오 품질의 결과를 얻으세요.',
  },
};

const availableLanguages = {
    en: 'English',
    ja: '日本語',
    ko: '한국어'
};


interface LanguageContextType {
  language: Language;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ja');

  useEffect(() => {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ja' || browserLang === 'ko' || browserLang === 'en') {
          setLanguageState(browserLang as Language);
      } else {
          setLanguageState('en'); // Default fallback
      }
  }, []);

  const setLanguage = (lang: string) => {
    if(lang === 'ja' || lang === 'ko' || lang === 'en') {
        setLanguageState(lang as Language);
    }
  }

  const t = useMemo(() => (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  }, [language]);

  const value = { language, setLanguage, t, availableLanguages };

  // FIX: Replaced JSX with React.createElement to prevent parsing errors in a .ts file.
  // JSX syntax is not supported in files with a .ts extension and was causing compilation errors.
  return React.createElement(LanguageContext.Provider, { value }, children);
};

export const useTranslations = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return context;
};
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Predict by Image": "Predict by Image",
      "Upload a clear side-view image": "Upload clear side and front view images of the goat.",
      "Side View": "Side View",
      "Front View": "Front View",
      "Drag & Drop or Click to Upload": "Drag & Drop or Click to Upload",
      "Clear goat image recommended": "Clear goat image recommended",
      "Run Image AI Analysis": "Run Image AI Analysis",
      "AI Processing...": "AI Processing...",
      "AI Pipeline Status": "AI Pipeline Status",
      "Detection": "Detection",
      "Estimation": "Estimation",
      "Prediction": "Prediction",
      "Wait for Analysis": "Wait for Analysis",
      "Predicted Ready Mutton": "Predicted Ready Mutton",
      "Live Weight": "Live Weight",
      "Confidence": "Confidence",
      "Carcass Yield Verified": "Carcass Yield Verified",
      "Download PDF Report": "Download PDF Report",
      "Predict Another": "Predict Another",
      "Language": "Language",
      "Detecting Goat...": "Detecting Goat...",
      "Extracting Biometrics": "Extracting Biometrics"
    }
  },
  kn: {
    translation: {
      "Predict by Image": "ಚಿತ್ರದಿಂದ ಭವಿಷ್ಯವಾಣಿ",
      "Upload a clear side-view image": "ಮೇಕೆಯ ಸ್ಪಷ್ಟ ಪಕ್ಕದ ಮತ್ತು ಮುಂಭಾಗದ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      "Side View": "ಪಕ್ಕದ ನೋಟ",
      "Front View": "ಮುಂಭಾಗದ ನೋಟ",
      "Drag & Drop or Click to Upload": "ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
      "Clear goat image recommended": "ಸ್ಪಷ್ಟವಾದ ಮೇಕೆ ಚಿತ್ರವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",
      "Run Image AI Analysis": "AI ವಿಶ್ಲೇಷಣೆಯನ್ನು ರನ್ ಮಾಡಿ",
      "AI Processing...": "AI ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
      "AI Pipeline Status": "AI ಪೈಪ್‌ಲೈನ್ ಸ್ಥಿತಿ",
      "Detection": "ಪತ್ತೆ",
      "Estimation": "ಅಂದಾಜು",
      "Prediction": "ಭವಿಷ್ಯವಾಣಿ",
      "Wait for Analysis": "ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಕಾಯಿರಿ",
      "Predicted Ready Mutton": "ಸಿದ್ಧ ಮಟನ್ ಅಂದಾಜು",
      "Live Weight": "ಜೀವಂತ ತೂಕ",
      "Confidence": "ವಿಶ್ವಾಸ",
      "Carcass Yield Verified": "ಮಟನ್ ಇಳುವರಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      "Download PDF Report": "PDF ರಿಪೋರ್ಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      "Predict Another": "ಮತ್ತೊಂದು ಊಹಿಸಿ",
      "Language": "ಭಾಷೆ",
      "Detecting Goat...": "ಮೇಕೆಯನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
      "Extracting Biometrics": "ಜೈವಿಕ ಮಾಪನಗಳನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;

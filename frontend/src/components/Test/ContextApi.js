const languages = ["JavaScript", "Python"];
const LanguagesContext = createContext([]);
const LanguageProvider = ({ children }) => {
  const [languageIndex, setLanguageIndex] = useState(0);

  const toggleLanguage = () => {
    setLanguageIndex((previousIndex) => (previousIndex + 1) % languages.length);
  };

  return (
    <LanguagesContext.Provider
      value={{ currentLanguage: languages[languageIndex], toggleLanguage }}
    >
      {children}
    </LanguagesContext.Provider>
  );
};

function ContextApi() {
  // implement Context here so can be used in child components

  return (
    <LanguageProvider>
      <MainSection />;
    </LanguageProvider>
  );
}

function MainSection() {
  const { currentLanguage, toggleLanguage } = useContext(LanguagesContext);

  return (
    <div>
      <p id="favoriteLanguage">
        favorite programing language: {currentLanguage}
      </p>
      <button id="changeFavorite" onClick={toggleLanguage}>
        toggle language
      </button>
    </div>
  );
}

export default ContextApi;

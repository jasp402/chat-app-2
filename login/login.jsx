import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, initializeApp, signInWithRedirect, onAuthStateChanged } from "firebase/app";
import { firebaseConfig } from '../../data/js/config.js';
function Login() {
    const [lang, setLang] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const changeLanguage = async (event) => {
        const language = event.target.value;
        setLoading(true);
        await userLocale.action.cahngeLang(language);
        await langCheker();
        setLoading(false);
    };

    const googleSignIn = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const langCheker = async () => {
        const response = await fetch("../data/js/language.json");
        const languages = await response.json();
        const currentLang = userLocale.state.last_lang === "indonesia" ? "indonesia" : "english";
        setLang(languages[currentLang].Login.Index);
    };

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        onAuthStateChanged(auth, setUser);
        userLocale.onData.load();
        langCheker();
    }, []);

    return (
        <div className="container">
      {loading ? (
          <h1>{lang.loading}</h1>
      ) : user ? (
          (window.location.href = `${window.location.origin}/dashboard/`)
      ) : (
          <div className="card">
          <h1>{lang.login}</h1>
          <div className="group">
            <select name="language" onChange={changeLanguage}>
              <option value="">Language</option>
              <option value="indonesia">Bahasa Indonesia</option>
              <option value="english">English</option>
            </select>
          </div>
          <br />
          <div className="group">
            <button className="c-red" onClick={googleSignIn}>
              <i className="fa-brands fa-google"></i>
              <p>Google</p>
            </button>
          </div>
        </div>
      )}
    </div>
    );
}

export default Login;
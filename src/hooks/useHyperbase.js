import { useEffect, useMemo, useState } from "react";
import hyperbaseConfig from "../utils/hyperbase/hyperbaseConfig.json";
import hyperbaseCollections from "../utils/hyperbase/hyperbaseCollections.json";
import Hyperbase from "../utils/hyperbase/hyperbase";

function useHyperbase() {
  const hyperbase = useMemo(() => new Hyperbase(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      hyperbase.init(hyperbaseConfig);
      const token = localStorage.getItem("token");
      if (token) {
        const newToken = await hyperbase.setAuthToken(token);
        localStorage.setItem("token", newToken);
        setIsSignedIn(true);
      }
      setIsLoading(false);
    })();
  }, [hyperbase]);

  const signIn = async (email, password) => {
    setIsLoading(true);
    const token = await hyperbase.signin(
      hyperbaseCollections.users,
      email,
      password
    );
    if (token) {
      localStorage.setItem("token", token);
      setIsSignedIn(true);
    }
    setIsLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  };

  const newCollection = async (collectionId) => {
    return await hyperbase.setCollection(collectionId);
  };

  return {
    hyperbase,
    isLoading,
    isSignedIn,
    signIn,
    signOut,
    newCollection,
  };
}

export default useHyperbase;

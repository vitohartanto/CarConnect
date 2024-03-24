import { useEffect, useMemo, useState } from "react";
import hyperbaseConfig from "../utils/hyperbase/hyperbaseConfig.json";
import hyperbaseCollections from "../utils/hyperbase/hyperbaseCollections.json";
import Hyperbase from "../utils/hyperbase/hyperbase";

function useHyperbase() {
  const hyperbase = useMemo(() => new Hyperbase(hyperbaseConfig), []);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const newToken = await hyperbase.setAuthToken(token);
        if (newToken) {
          localStorage.setItem("token", newToken);
          const user = await hyperbase.getUserData();
          setUser(user);
          setIsSignedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    })();
  }, [hyperbase]);

  const signIn = async (email, password) => {
    setIsLoading(true);
    const token = await hyperbase.signIn(hyperbaseCollections.users, {
      email,
      password,
    });
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

  const setCollection = async (collectionId) => {
    return await hyperbase.setCollection(collectionId);
  };

  return {
    hyperbase,
    isLoading,
    isSignedIn,
    user,
    signIn,
    signOut,
    setCollection,
  };
}

export default useHyperbase;

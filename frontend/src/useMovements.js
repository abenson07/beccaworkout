import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function useMovements() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchMovements() {
      setLoading(true);
      const { data, error } = await supabase.from("movements").select();
      if (isMounted) {
        if (error) setError(error);
        else setMovements(data);
        setLoading(false);
      }
    }
    fetchMovements();
    return () => { isMounted = false; };
  }, []);

  return { movements, loading, error };
} 
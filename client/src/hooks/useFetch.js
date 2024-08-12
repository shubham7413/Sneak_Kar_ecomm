import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

const useFetch = (tableName, columns = '*') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(tableName)
          .select(columns);

        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tableName, columns]);

  return { data, loading, error };
};

export default useFetch;

import React from "react";

export default function useGetDataHook(url, filter) {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const abortController = new AbortController();

    if (!url) return;

    const fetchData = async () => {
      setStatus("fetching");

      let response;
      if (filter) {
        response = await fetch(url + filter, {
          signal: abortController.signal,
        });
      } else {
        response = await fetch(url, { signal: abortController.signal });
      }

      const data = await response.json();
      setData(data);
      setStatus("fetched");
    };

    try {
      fetchData();
    } catch (err) {
      console.error("ERROR IN GET DATA HOOK OR REQUEST ABORTED: " + err);
    }

    return () => {
      abortController.abort();
    };
  }, [url, filter]);

  return { status, data };
}

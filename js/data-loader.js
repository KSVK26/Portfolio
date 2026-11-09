/* ==========================================================================
   DataLoader — Unified client-side content data fetching utility
   Handles missing files gracefully with fallback data structures.
   ========================================================================== */

(function () {
  "use strict";

  const cache = {};

  async function fetchJSON(path) {
    if (cache[path]) return cache[path];
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("HTTP status " + res.status);
      const data = await res.json();
      cache[path] = data;
      return data;
    } catch (err) {
      console.warn("DataLoader: Failed to fetch " + path, err);
      return null;
    }
  }

  const DataLoader = {
    async getStats() {
      const data = await fetchJSON("content/stats.json");
      return data && data.stats ? data.stats : [];
    },

    async getNow() {
      const data = await fetchJSON("content/now.json");
      return data && data.items ? data.items : [];
    },

    async getProjects() {
      const data = await fetchJSON("content/projects.json");
      return data && data.items ? data.items : [];
    },

    async getWriting() {
      const data = await fetchJSON("content/writing.json");
      return data && data.items ? data.items : [];
    },

    async getTimeline() {
      const data = await fetchJSON("content/timeline.json");
      return data && data.items ? data.items : [];
    },
  };

  window.DataLoader = DataLoader;
})();
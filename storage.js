const StorageManager = {
    save(key, data) {
        try { localStorage.setItem(key, JSON.stringify(data)); return true; }
        catch(e) { console.warn(e); return false; }
    },
    load(key) {
        try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
        catch(e) { return null; }
    },
    remove(key) { localStorage.removeItem(key); },
    clear() { localStorage.clear(); }
};

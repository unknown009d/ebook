/* Install Service Worker */
self.addEventListener('install', evt => {
    // console.log("Service Worker Has Been Installed !");
});

/* Activate the Service Worker */
self.addEventListener('activate', evt => {
    // console.log("Service Worker Has Been Activated !"); 
});

/* Fetch Event */
self.addEventListener('fetch', evt => {
    // console.log("Fetch Event : ", evt); 
});

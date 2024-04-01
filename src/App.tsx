import { useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let skip = false;
    let registration: ServiceWorkerRegistration;
    async function registerServiceWorker() {
      registration = await navigator.serviceWorker.register('/sw.js');
      if (skip || !canvasRef.current || !registration.active) {
        return;
      }
      const offscreenCanvas = canvasRef.current.transferControlToOffscreen();
      registration.active.postMessage({ canvas: offscreenCanvas }, [
        offscreenCanvas
      ]);
    }
    registerServiceWorker();
    return () => {
      skip = true;
      registration?.unregister();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default App;

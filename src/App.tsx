import { useCallback, useEffect, useState } from 'react';

async function registerServiceWorker(
  canvas: HTMLCanvasElement,
  registration: ServiceWorkerRegistration | undefined
) {
  const controller = navigator.serviceWorker.controller;
  if (controller) return;

  console.log('registering...');
  registration = await navigator.serviceWorker.register('/sw.js');

  console.log('registered. waiting for activation.');
  await navigator.serviceWorker.ready;

  console.log('ready.');
  const offscreenCanvas = canvas.transferControlToOffscreen();
  registration.active?.postMessage({ canvas: offscreenCanvas }, [
    offscreenCanvas
  ]);
}

function App() {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const callbackCanvasRef = useCallback((node: HTMLCanvasElement | null) => {
    if (node !== null) {
      setCanvasRef(node);
    }
  }, []);

  useEffect(() => {
    let registration: ServiceWorkerRegistration | undefined;
    if (canvasRef) {
      registerServiceWorker(canvasRef, registration);
    }
    return () => {
      registration?.unregister();
    };
  }, [canvasRef]);

  return (
    <canvas ref={callbackCanvasRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default App;

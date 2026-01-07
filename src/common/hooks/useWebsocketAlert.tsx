import { useCallback, useEffect, useRef } from "react";
import { AppState, Alert, AppStateStatus } from "react-native";
import  { triggerNotification, initNotifications } from "../notifications/customNotification";

export function useWebsocketAlert(wsUrl: string, apiKey: string | null) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReconnectRef = useRef(true);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const cleanupSocket = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  const connect = useCallback(() => {
    // Don’t connect without key
    if (!apiKey) return;

    // Don’t reconnect if app is not active
    if (appStateRef.current !== "active") return;

    // Close previous
    wsRef.current?.close();

    const ws = new WebSocket(`${wsUrl}?apiKey=${encodeURIComponent(apiKey)}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
    };

    ws.onmessage = async () => {
      console.log("Message received");
      await triggerNotification();
    };

    ws.onerror = () => {
      // This will usually lead to onclose as well
      try { ws.close(); } catch {}
    };

    ws.onclose = () => {
      if (!shouldReconnectRef.current) return;
      if (appStateRef.current !== "active") return;

      // schedule reconnect
      reconnectTimerRef.current = setTimeout(() => {
        console.log("Websocket closed: reconnecting...")
        connect();
      }, 1000);
    };
  }, [wsUrl, apiKey]);

  useEffect(() => {
    initNotifications();

    shouldReconnectRef.current = true;

    // Connect when ready
    connect();

    const sub = AppState.addEventListener("change", (nextState) => {
      appStateRef.current = nextState;

      if (nextState === "active") {
        connect();
      } else {
        // prevent reconnect loops while backgrounded
        cleanupSocket();
      }
    });

    return () => {
      shouldReconnectRef.current = false;
      sub.remove();
      cleanupSocket();
    };
  }, [connect, cleanupSocket]);
}
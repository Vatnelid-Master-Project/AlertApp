import { useEffect, useRef } from "react";
import { AppState, Alert } from "react-native";
import { apiKey } from "../../variables/ApiVariables";
import  { triggerNotification, initNotifications } from "../notifications/customNotification";

export function useWebsocketAlert(wsUrl: string) {
  const wsRef = useRef<WebSocket | null>(null);

  const connect = () => {
    wsRef.current?.close();
    const ws = new WebSocket(`${wsUrl}?apiKey=${apiKey}`
    );
    wsRef.current = ws;

    ws.onopen = () => console.log("WS connected");
    ws.onmessage = async (e) => {
      // assume JSON message like { title, body }
      console.log("Message recived")

      await triggerNotification()
    };

    ws.onclose = () => {
      console.log("WS closed, retrying...");
      setTimeout(connect, 100);
    };

    ws.onerror = () => {
      ws.close();
    };
  };

  useEffect(() => {
    initNotifications();
    connect();

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        connect();
      } else {
        // background: close to avoid OS/network weirdness
        wsRef.current?.close();
      }
    });

    return () => {
      sub.remove();
      wsRef.current?.close();
    };
  }, [wsUrl]);
}
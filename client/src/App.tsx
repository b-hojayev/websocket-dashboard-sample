import { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const App = () => {
  const [onlineUserCount, setOnlineUserCount] = useState<any[]>([]);
  const [error, setError] = useState<null | string>("null");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000/dashboard");

    socketRef.current.onopen = () => {
      // setError(null);
      console.log("Connected to server");
      const helloMessage = { message: "Hi server!" };
      socketRef.current?.send(JSON.stringify(helloMessage));
    };

    socketRef.current.onmessage = (event: MessageEvent<string>) => {
      setOnlineUserCount((prev) => {
        if (prev.length > 20) {
          return [...prev.slice(1), JSON.parse(event.data)];
        } else {
          return [...prev, JSON.parse(event.data)];
        }
      });
      console.log("Message from server:", event.data);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Something went wrong please, try again");
    };

    socketRef.current.onclose = () => {
      setError("You disconnected from server...");
      console.log("Disconnected from server");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  console.log(onlineUserCount);

  const handleConnect = async () => {
    window.location.reload();
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={onlineUserCount}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="onlineCount"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        {error && (
          <button
            onClick={handleConnect}
            className="bg-green-500 p-4 rounded-2xl text-white font-semibold cursor-pointer hover:bg-green-400"
          >
            Try again
          </button>
        )}
      </div>
    </main>
  );
};

export default App;

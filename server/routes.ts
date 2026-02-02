
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Session Middleware
  const SessionStore = MemoryStore(session);
  app.use(
    session({
      secret: "dgr-secret-key",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({
        checkPeriod: 86400000,
      }),
      cookie: { maxAge: 86400000 }, // 1 day
    })
  );

  // --- Auth Routes ---
  app.post(api.auth.login.path, async (req, res) => {
    try {
      const { email, password } = api.auth.login.input.parse(req.body);
      
      // Specific requirement logic
      if (email === "cartoon@gmail.com" && password === "1234") {
        // Ensure user exists in DB for session consistency, or just mock it
        let user = await storage.getUserByEmail(email);
        if (!user) {
            user = await storage.createUser({
                email,
                password, // In real app, hash this
                name: "Admin User",
                role: "admin"
            });
        }
        
        (req.session as any).userId = user.id;
        return res.json(user);
      }

      return res.status(401).json({ message: "ลองใหม่อีกครั้ง ! ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    } catch (error) {
       res.status(400).json({ message: "Invalid input" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    
    const user = await storage.getUser(userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    
    res.json(user);
  });

  // --- Dashboard Data Routes ---
  app.get(api.dashboard.getStats.path, (req, res) => {
    // Return the EXACT mock data requested in requirements
    const data = {
        summary: {
            totalWells: 302,
            government: {
                total: 102,
                agriculture: 50,
                consumption: 52
            },
            privateSector: {
                total: 200,
                agriculture: 70,
                consumption: 100,
                business: 30
            },
            lastUpdated: "15/01/2026 20:43:50"
        },
        charts: {
            depth: [
                { range: "1-3", count: 5 },
                { range: "4-6", count: 12 },
                { range: "7-10", count: 20 },
                { range: "10+", count: 15 }
            ],
            diameter: [
                { size: "4", count: 10 },
                { size: "6", count: 20 },
                { size: "8", count: 15 },
                { size: "No Data", count: 5 }
            ],
            usage: [
                { month: "ม.ค.", government: 10000, privateSector: 20000 },
                { month: "ก.พ.", government: 12000, privateSector: 22000 },
                { month: "มี.ค.", government: 15000, privateSector: 25000 },
                { month: "เม.ย.", government: 20000, privateSector: 40000 }, // Peak in summer
                { month: "พ.ค.", government: 18000, privateSector: 35000 },
                { month: "มิ.ย.", government: 15000, privateSector: 30000 },
                { month: "ก.ค.", government: 14000, privateSector: 28000 },
                { month: "ส.ค.", government: 13000, privateSector: 26000 },
                { month: "ก.ย.", government: 12000, privateSector: 25000 },
                { month: "ต.ค.", government: 11000, privateSector: 24000 },
                { month: "พ.ย.", government: 10000, privateSector: 22000 },
                { month: "ธ.ค.", government: 9000, privateSector: 20000 },
            ],
            contamination: [
                { status: "มีการปนเปื้อน", count: 15, fill: "#DC0E0E" },
                { status: "ไม่มีการปนเปื้อน", count: 287, fill: "#3F944C" }
            ]
        }
    };
    
    res.json(data);
  });

  return httpServer;
}

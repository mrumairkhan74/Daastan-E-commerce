"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Shield, Globe, Palette, Database, Key, Moon, Sun, Plus } from "lucide-react";

const SETTINGS_TABS = [
  { id: "general", label: "General", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Database },
  { id: "api", label: "API Keys", icon: Key },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Settings</h1>
          <p className="font-body text-sm text-neutral-500 mt-1">Manage your store configuration</p>
        </div>
        {saved && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
            Settings saved successfully
          </motion.div>
        )}
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-56 flex-shrink-0"
        >
          <nav className="bg-white rounded-xl border border-neutral-200 p-3">
            <ul className="space-y-1">
              {SETTINGS_TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-charcoal text-white"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-charcoal"
                    }`}
                  >
                    <tab.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-body text-sm font-medium">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          {activeTab === "general" && <GeneralSettings onSave={handleSave} />}
          {activeTab === "notifications" && <NotificationSettings onSave={handleSave} />}
          {activeTab === "security" && <SecuritySettings onSave={handleSave} />}
          {activeTab === "appearance" && <AppearanceSettings onSave={handleSave} />}
          {activeTab === "integrations" && <IntegrationSettings onSave={handleSave} />}
          {activeTab === "api" && <APISettings onSave={handleSave} />}
        </motion.div>
      </div>
    </div>
  );
}

function GeneralSettings({ onSave }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-8">
      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Store Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Store Name</label>
            <input type="text" defaultValue="DASTAN" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Store Email</label>
            <input type="email" defaultValue="dastanbyahmedullah@gmail.com" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Phone</label>
            <input type="tel" defaultValue="+92 3XX XXXXXXX" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Address</label>
            <input type="text" defaultValue="Pakistan" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Currency & Localization</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Currency</label>
            <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal">
              <option value="PKR">PKR - Pakistani Rupee</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Language</label>
            <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal">
              <option value="en">English</option>
              <option value="ur">Urdu</option>
            </select>
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Timezone</label>
            <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal">
              <option value="Asia/Karachi">GMT+5 (Karachi)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-neutral-200">
        <button onClick={onSave} className="px-6 py-3 bg-charcoal text-white font-body text-sm uppercase tracking-wider hover:bg-charcoal/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function NotificationSettings({ onSave }) {
  const [emailNotifications, setEmailNotifications] = useState({ orders: true, lowStock: true, marketing: false, weekly: true });
  const [pushNotifications, setPushNotifications] = useState({ orders: true, lowStock: false, marketing: false });

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-8">
      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Email Notifications</h2>
        <div className="space-y-4">
          {[
            { key: "orders", label: "New Orders", desc: "Receive email when a new order is placed" },
            { key: "lowStock", label: "Low Stock Alerts", desc: "Get notified when product stock is low" },
            { key: "marketing", label: "Marketing Emails", desc: "Receive promotional emails from us" },
            { key: "weekly", label: "Weekly Reports", desc: "Get weekly sales summary every Monday" },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50">
              <div>
                <p className="font-body text-sm font-medium text-charcoal">{item.label}</p>
                <p className="font-body text-xs text-neutral-500">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications[item.key]}
                onChange={(e) => setEmailNotifications({ ...emailNotifications, [item.key]: e.target.checked })}
                className="w-5 h-5 text-charcoal border-neutral-300 rounded focus:ring-charcoal"
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Push Notifications</h2>
        <div className="space-y-4">
          {[
            { key: "orders", label: "Order Updates", desc: "Real-time order status changes" },
            { key: "lowStock", label: "Stock Alerts", desc: "Instant low stock warnings" },
            { key: "marketing", label: "Promotions", desc: "Sale and new product notifications" },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50">
              <div>
                <p className="font-body text-sm font-medium text-charcoal">{item.label}</p>
                <p className="font-body text-xs text-neutral-500">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={pushNotifications[item.key]}
                onChange={(e) => setPushNotifications({ ...pushNotifications, [item.key]: e.target.checked })}
                className="w-5 h-5 text-charcoal border-neutral-300 rounded focus:ring-charcoal"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-neutral-200">
        <button onClick={onSave} className="px-6 py-3 bg-charcoal text-white font-body text-sm uppercase tracking-wider hover:bg-charcoal/90">Save Changes</button>
      </div>
    </div>
  );
}

function SecuritySettings({ onSave }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-8">
      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Two-Factor Authentication</h2>
        <div className="p-4 border border-neutral-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm font-medium text-charcoal">Enable 2FA</p>
              <p className="font-body text-xs text-neutral-500">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Enable</button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Current Password</label>
            <input type="password" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">New Password</label>
            <input type="password" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Confirm Password</label>
            <input type="password" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-neutral-200">
        <button onClick={onSave} className="px-6 py-3 bg-charcoal text-white font-body text-sm uppercase tracking-wider hover:bg-charcoal/90">Save Changes</button>
      </div>
    </div>
  );
}

function AppearanceSettings({ onSave }) {
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#1A1A1A");

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-8">
      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Theme</h2>
        <div className="grid grid-cols-3 gap-4">
          {["light", "dark", "system"].map((t) => (
            <label key={t} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${theme === t ? "border-charcoal bg-charcoal/5" : "border-neutral-200 hover:border-charcoal"}`}>
              <input type="radio" name="theme" value={t} checked={theme === t} onChange={(e) => setTheme(e.target.value)} className="sr-only" />
              <div className="flex flex-col items-center gap-2">
                {t === "light" && <Sun className="w-8 h-8 text-amber-500" />}
                {t === "dark" && <Moon className="w-8 h-8 text-blue-500" />}
                {t === "system" && <Globe className="w-8 h-8 text-green-500" />}
                <span className="font-body text-sm font-medium capitalize">{t}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Brand Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-12 h-12 border border-neutral-300 rounded-lg cursor-pointer" />
              <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal font-mono text-sm" />
            </div>
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Secondary Color</label>
            <input type="color" defaultValue="#C8A951" className="w-12 h-12 border border-neutral-300 rounded-lg cursor-pointer" />
          </div>
          <div>
            <label className="block font-body text-sm text-neutral-700 mb-2">Accent Color</label>
            <input type="color" defaultValue="#E8E0D0" className="w-12 h-12 border border-neutral-300 rounded-lg cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-neutral-200">
        <button onClick={onSave} className="px-6 py-3 bg-charcoal text-white font-body text-sm uppercase tracking-wider hover:bg-charcoal/90">Save Changes</button>
      </div>
    </div>
  );
}

function IntegrationSettings({ onSave }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-8">
      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Payment Gateways</h2>
        <div className="space-y-4">
          {["JazzCash", "Easypaisa", "Bank Transfer", "Cash on Delivery"].map((gateway) => (
            <div key={gateway} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
              <div>
                <p className="font-body text-sm font-medium text-charcoal">{gateway}</p>
                <p className="font-body text-xs text-neutral-500">Configure {gateway} settings</p>
              </div>
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50">Configure</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Shipping Providers</h2>
        <div className="space-y-4">
          {["TCS", "Leopards Courier", "Pakistan Post", "Custom"].map((provider) => (
            <div key={provider} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
              <div>
                <p className="font-body text-sm font-medium text-charcoal">{provider}</p>
                <p className="font-body text-xs text-neutral-500">Configure shipping rates and zones</p>
              </div>
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50">Configure</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-neutral-200">
        <button onClick={onSave} className="px-6 py-3 bg-charcoal text-white font-body text-sm uppercase tracking-wider hover:bg-charcoal/90">Save Changes</button>
      </div>
    </div>
  );
}

function APISettings({ onSave }) {
  const [apiKeys, setApiKeys] = useState([
    { id: "1", name: "Webhook - Orders", key: "sk_live_****_abcd", created: "2024-01-10", lastUsed: "2 hours ago", active: true },
    { id: "2", name: "Mobile App", key: "sk_live_****_efgh", created: "2024-01-05", lastUsed: "1 day ago", active: true },
    { id: "3", name: "Analytics Dashboard", key: "sk_live_****_ijkl", created: "2023-12-20", lastUsed: "Never", active: false },
  ]);

  const toggleKey = (id) => {
    setApiKeys(apiKeys.map(k => k.id === id ? { ...k, active: !k.active } : k));
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-charcoal">API Keys</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white font-body text-sm rounded-lg hover:bg-charcoal/90">
          <Plus className="w-4 h-4" />
          Create Key
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Key</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Used</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {apiKeys.map((key) => (
              <tr key={key.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-body text-sm font-medium text-charcoal">{key.name}</td>
                <td className="px-6 py-4 font-mono text-sm text-neutral-600">{key.key}</td>
                <td className="px-6 py-4 font-body text-sm text-neutral-500">{key.created}</td>
                <td className="px-6 py-4 font-body text-sm text-neutral-500">{key.lastUsed}</td>
                <td className="px-6 py-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={key.active} onChange={() => toggleKey(key.id)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:ring-4 peer-focus:ring-charcoal rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                  </label>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-6 border-t border-neutral-200">
        <h3 className="font-body text-sm font-medium text-charcoal mb-3">Webhook URLs</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <span className="font-mono text-xs text-neutral-600 w-40">Order Created</span>
            <input type="text" placeholder="https://yourdomain.com/webhook/orders" className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-charcoal" />
            <button className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-100">Test</button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <span className="font-mono text-xs text-neutral-600 w-40">Order Updated</span>
            <input type="text" placeholder="https://yourdomain.com/webhook/orders" className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-charcoal" />
            <button className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-100">Test</button>
          </div>
        </div>
      </div>
    </div>
  );
}
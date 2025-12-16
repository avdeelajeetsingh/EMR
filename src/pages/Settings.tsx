import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { getSettings, updateSettings } from "@/services/api";
import { Settings as SettingsIcon, Bell, Clock, Users, Shield } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  if (!settings) return null;

  const save = async () => {
    await updateSettings(settings);
    alert("Settings saved");
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-6">
        <SettingsIcon className="mb-3" />
        <Label>Clinic Name</Label>
        <Input
          value={settings.clinic_name}
          onChange={e => setSettings({ ...settings, clinic_name: e.target.value })}
        />
        <Label className="mt-3">Timezone</Label>
        <Input
          value={settings.timezone}
          onChange={e => setSettings({ ...settings, timezone: e.target.value })}
        />
      </Card>

      <Card className="p-6 space-y-3">
        <Bell />
        <Switch
          checked={settings.email_notifications}
          onCheckedChange={v => setSettings({ ...settings, email_notifications: v })}
        /> Email Notifications
        <Separator />
        <Switch
          checked={settings.sms_reminders}
          onCheckedChange={v => setSettings({ ...settings, sms_reminders: v })}
        /> SMS Reminders
        <Separator />
        <Switch
          checked={settings.push_notifications}
          onCheckedChange={v => setSettings({ ...settings, push_notifications: v })}
        /> Push Notifications
      </Card>

      <Card className="p-6">
        <Clock />
        <Input
          type="time"
          value={settings.business_start}
          onChange={e => setSettings({ ...settings, business_start: e.target.value })}
        />
        <Input
          type="time"
          value={settings.business_end}
          onChange={e => setSettings({ ...settings, business_end: e.target.value })}
        />
        <Input
          type="number"
          value={settings.appointment_duration}
          onChange={e => setSettings({ ...settings, appointment_duration: +e.target.value })}
        />
      </Card>

      <Card className="p-6 space-y-3">
        <Shield />
        <Switch
          checked={settings.two_factor_auth}
          onCheckedChange={v => setSettings({ ...settings, two_factor_auth: v })}
        /> Two-Factor Auth
        <Separator />
        <Switch
          checked={settings.session_timeout}
          onCheckedChange={v => setSettings({ ...settings, session_timeout: v })}
        /> Session Timeout
      </Card>

      <Button onClick={save}>Save Settings</Button>
    </div>
  );
}

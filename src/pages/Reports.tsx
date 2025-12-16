import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getDailyReport,
  getWeeklyReport,
  getDoctorWorkload,
  getCancellationReport,
} from "@/services/api";

export default function Reports() {
  const [reportData, setReportData] = useState<any>(null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      {/* REPORT BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold">Daily Appointment Summary</h3>
          <Button
            className="mt-3"
            onClick={async () => setReportData(await getDailyReport(today))}
          >
            Generate Report
          </Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold">Weekly Performance</h3>
          <Button
            className="mt-3"
            onClick={async () => setReportData(await getWeeklyReport(today))}
          >
            Generate Report
          </Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold">Doctor Workload</h3>
          <Button
            className="mt-3"
            onClick={async () => setReportData(await getDoctorWorkload())}
          >
            Generate Report
          </Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold">Cancellation Report</h3>
          <Button
            className="mt-3"
            onClick={async () => setReportData(await getCancellationReport())}
          >
            Generate Report
          </Button>
        </Card>
      </div>

      {/* REPORT VIEWER */}
      <Card className="p-6">
        <h3 className="font-semibold mb-2">Report Viewer</h3>
        <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
          {reportData ? JSON.stringify(reportData, null, 2) : "No report generated"}
        </pre>
      </Card>
    </div>
  );
}

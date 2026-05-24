import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  department: string;
  description: string;
}

interface JobCardProps {
  job: Job;
}

interface JobListProps {
  jobs: Job[];
}

type Department = string;

// ─── Data ────────────────────────────────────────────────────────────────────

const jobs: Job[] = [
  { id: 1, title: "Airport Security Officer", company: "Port Harcourt International Airport", location: "Port Harcourt, Rivers State", salary: "₦180,000", type: "Full-time", department: "Security", description: "Conduct passenger and baggage screening, monitor CCTV, manage access control points, and ensure compliance with aviation security regulations." },
  { id: 2, title: "Airline Check-In Agent", company: "Air Peace Nigeria", location: "Lagos, Murtala Muhammed Airport", salary: "₦150,000", type: "Full-time", department: "Ground Services", description: "Process passenger check-ins, issue boarding passes, handle baggage tagging, and resolve ticketing issues at the departure counter." },
  { id: 3, title: "Baggage Handler", company: "Skyway Ground Services", location: "Abuja, Nnamdi Azikiwe Airport", salary: "₦120,000", type: "Full-time", department: "Ground Operations", description: "Load and unload aircraft baggage, operate belt loaders and baggage carts, sort cargo, and ensure timely dispatch of luggage to passengers." },
  { id: 4, title: "Air Traffic Controller", company: "Nigerian Airspace Management Agency", location: "Lagos, Murtala Muhammed Airport", salary: "₦450,000", type: "Full-time", department: "Air Traffic Management", description: "Monitor and direct aircraft movements within designated airspace, coordinate takeoffs and landings, and communicate weather and safety information to pilots." },
  { id: 5, title: "Immigration Officer", company: "Nigeria Immigration Service", location: "Kano, Mallam Aminu Kano Airport", salary: "₦200,000", type: "Full-time", department: "Border Control", description: "Verify travel documents, conduct passport control, screen arriving and departing passengers, and enforce border security protocols." },
  { id: 6, title: "Airport Firefighter", company: "Federal Airports Authority of Nigeria", location: "Enugu, Akanu Ibiam Airport", salary: "₦220,000", type: "Full-time", department: "Rescue & Firefighting", description: "Respond to aircraft emergencies, conduct fire suppression operations, perform aircraft rescue duties, and carry out regular equipment inspections and drills." },
  { id: 7, title: "Customs Officer", company: "Nigeria Customs Service", location: "Port Harcourt, Rivers State", salary: "₦190,000", type: "Full-time", department: "Customs & Excise", description: "Inspect passenger luggage and cargo for prohibited items, collect applicable duties and levies, and enforce customs regulations at international terminals." },
  { id: 8, title: "Airport Lounge Attendant", company: "Bi-Courtney Aviation Services", location: "Lagos, Murtala Muhammed Airport", salary: "₦130,000", type: "Full-time", department: "Passenger Experience", description: "Serve food and beverages in the VIP lounge, assist premium passengers, maintain lounge cleanliness, and coordinate special passenger requests." },
  { id: 9, title: "Aircraft Maintenance Engineer", company: "MRO Nigeria Ltd.", location: "Abuja, Nnamdi Azikiwe Airport", salary: "₦500,000", type: "Full-time", department: "Technical / Engineering", description: "Perform routine and unscheduled maintenance on aircraft systems, certify aircraft airworthiness, troubleshoot mechanical faults, and maintain accurate maintenance logs." },
  { id: 10, title: "Airport Operations Coordinator", company: "Federal Airports Authority of Nigeria", location: "Benin City Airport", salary: "₦260,000", type: "Full-time", department: "Operations Management", description: "Oversee day-to-day terminal operations, coordinate between airlines and ground handlers, manage flight schedules, and ensure compliance with safety standards." },
  { id: 11, title: "Ramp Agent", company: "Skyway Ground Services", location: "Kaduna Airport", salary: "₦110,000", type: "Full-time", department: "Ground Operations", description: "Marshal aircraft on the apron, connect jet bridges, fuel trucks, and ground power units, and support on-time departure by coordinating ramp activities." },
  { id: 12, title: "Aviation Medical Officer", company: "Nigeria Civil Aviation Authority", location: "Lagos, Murtala Muhammed Airport", salary: "₦380,000", type: "Full-time", department: "Medical Services", description: "Provide medical clearance for flight crew, respond to passenger medical emergencies, conduct health screenings, and maintain the airport medical centre." },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const departments: Department[] = [
  "All",
  ...Array.from(new Set(jobs.map((j: Job) => j.department))),
];

const deptColors: Record<string, { bg: string; color: string }> = {
  "Security":               { bg: "#E6F1FB", color: "#0C447C" },
  "Ground Services":        { bg: "#EAF3DE", color: "#27500A" },
  "Ground Operations":      { bg: "#EAF3DE", color: "#27500A" },
  "Air Traffic Management": { bg: "#EEEDFE", color: "#3C3489" },
  "Border Control":         { bg: "#FAEEDA", color: "#633806" },
  "Rescue & Firefighting":  { bg: "#FCEBEB", color: "#A32D2D" },
  "Customs & Excise":       { bg: "#FAEEDA", color: "#633806" },
  "Passenger Experience":   { bg: "#FBEAF0", color: "#72243E" },
  "Technical / Engineering":{ bg: "#EEEDFE", color: "#3C3489" },
  "Operations Management":  { bg: "#E1F5EE", color: "#085041" },
  "Medical Services":       { bg: "#FAECE7", color: "#993C1D" },
};

const deptIcons: Record<string, string> = {
  "Security":               "🛡️",
  "Ground Services":        "🎫",
  "Ground Operations":      "🧳",
  "Air Traffic Management": "📡",
  "Border Control":         "🛂",
  "Rescue & Firefighting":  "🚒",
  "Customs & Excise":       "📦",
  "Passenger Experience":   "☕",
  "Technical / Engineering":"🔧",
  "Operations Management":  "📋",
  "Medical Services":       "⚕️",
};

// ─── JobCard Component ────────────────────────────────────────────────────────

function JobCard({ job }: JobCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const deptStyle = deptColors[job.department] ?? { bg: "#F1EFE8", color: "#444441" };
  const deptIcon  = deptIcons[job.department] ?? "✈️";

  return (
    <div className="job-card">
      {/* Header Row: Title & Badge */}
      <div className="card-header">
        <h3 className="job-title">
          {job.title}
        </h3>
        <span
          className="job-badge"
          style={{
            background: deptStyle.bg,
            color: deptStyle.color,
          }}
        >
          <span>{deptIcon}</span>
          {job.department}
        </span>
      </div>

      {/* Company Name */}
      <div className="job-company">
        {job.company}
      </div>

      {/* Location & Type Inline */}
      <div className="job-meta">
        <span className="job-meta-item">
          <span style={{ color: "#E11D48" }}>📍</span> {job.location}
        </span>
        <span className="job-meta-item">
          <span>⏱</span> {job.type}
        </span>
      </div>

      {/* Salary Row (Right Aligned) */}
      <div className="salary-row">
        <span className="salary-amount">
          {job.salary}
          <span className="salary-period">/mo</span>
        </span>
      </div>

      {/* Conditional: Job Description */}
      {showDetails && (
        <div className="job-details">
          {job.description}
        </div>
      )}

      {/* Action Row */}
      <div className="card-actions">
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="details-btn"
        >
          Show Details {showDetails ? "▲" : "▼"}
        </button>
        <button className="btn-primary">
          Apply Now
        </button>
      </div>
    </div>
  );
}

// ─── JobList Component ────────────────────────────────────────────────────────

function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">✈️</div>
        <p className="empty-state-title">
          No jobs available at the moment.
        </p>
        <p className="empty-state-desc">
          Check back soon — new airport positions are posted regularly.
        </p>
      </div>
    );
  }

  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

// ─── App (Root) Component ─────────────────────────────────────────────────────

export default function App() {
  const [activeDept, setActiveDept] = useState("All");
  const [search, setSearch]         = useState("");

  const filtered = jobs.filter((job) => {
    const matchDept   = activeDept === "All" || job.department === activeDept;
    const q            = search.toLowerCase();
    const matchSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  return (
    <div className="app-container">

      {/* Header */}
      <div className="app-header">
        <div className="app-title-container">
          <span className="app-title-icon">✈️</span>
          <h1 className="app-title">
            Airport Career Portal
          </h1>
        </div>
        <p className="app-subtitle">
          {jobs.length} open positions across Nigerian airports
        </p>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title, company, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Department filters */}
      <div className="filters-container">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`filter-btn ${activeDept === dept ? "filter-btn--active" : ""}`}
          >
            {dept === "All" ? "All Departments" : dept}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="stats-container">
        {[
          { label: "Total Jobs",   value: jobs.length },
          { label: "Showing",      value: filtered.length },
          { label: "Departments",  value: departments.length - 1 },
          { label: "Locations",    value: new Set(jobs.map((j) => j.location.split(",")[0])).size },
        ].map((stat) => (
          <div
            key={stat.label}
            className="stat-item"
          >
            <p className="stat-label">
              {stat.label}
            </p>
            <p className="stat-value">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Job list — conditionally renders grid or empty state */}
      <JobList jobs={filtered} />
    </div>
  );
}


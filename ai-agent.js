const symptomInput = document.querySelector("#symptomInput");
const agentForm = document.querySelector("#agentForm");
const resetAgent = document.querySelector("#resetAgent");
const patientName = document.querySelector("#patientName");
const patientPhone = document.querySelector("#patientPhone");
const patientAge = document.querySelector("#patientAge");
const ageGroup = document.querySelector("#ageGroup");
const symptomDuration = document.querySelector("#symptomDuration");
const patientLocation = document.querySelector("#patientLocation");
const symptomButtons = document.querySelectorAll(".symptom-bank button");
const bodyViewTabs = document.querySelectorAll("[data-body-view]");
const bodyViewPanels = document.querySelectorAll("[data-body-panel]");
const bodyPartButtons = document.querySelectorAll("[data-body-part]");
const bodyTargetMap = {
  front: {
    "hair pain": [58, 6],
    "head pain": [51, 7],
    "forehead pain": [51, 9],
    "eye pain": [54, 11],
    "ear pain": [59, 13],
    "nose problem": [51, 13],
    "cheek pain": [55, 15],
    "mouth or throat pain": [51, 16],
    "chin pain": [51, 18],
    "neck pain": [54, 20],
    "shoulder pain": [28, 24],
    "chest pain": [40, 31],
    "stomach pain": [50, 43],
    "hip pain": [24, 53],
    "pelvic pain": [50, 56],
    "groin pain": [25, 56],
    "arm pain": [74, 33],
    "elbow pain": [76, 39],
    "forearm pain": [77, 44],
    "wrist pain": [76, 50],
    "hand pain": [74, 53],
    "thumb pain": [76, 56],
    "finger pain": [77, 60],
    "thigh pain": [64, 63],
    "knee pain": [66, 72],
    "leg pain": [65, 79],
    "shin pain": [65, 79],
    "ankle pain": [66, 88],
    "foot pain": [31, 93],
    "toe pain": [66, 96]
  },
  back: {
    "hair pain": [42, 10],
    "back of head pain": [50, 11],
    "neck pain": [41, 20],
    "shoulder pain": [28, 26],
    "shoulder blade pain": [30, 36],
    "upper back pain": [43, 31],
    "spine pain": [50, 41],
    "lower back pain": [36, 45],
    "elbow pain": [39, 41],
    "wrist pain": [32, 51],
    "hand pain": [26, 56],
    "hip pain": [50, 55],
    "buttocks pain": [29, 60],
    "back thigh pain": [35, 67],
    "knee pain": [33, 72],
    "calf pain": [33, 78],
    "ankle pain": [33, 91],
    "heel pain": [30, 95]
  },
  side: {
    "hair pain": [59, 8],
    "head pain": [59, 8],
    "temple pain": [56, 10],
    "ear pain": [50, 12],
    "eye pain": [59, 12],
    "nose problem": [60, 14],
    "mouth pain": [59, 16],
    "chin pain": [58, 18],
    "jaw pain": [51, 15],
    "neck pain": [36, 20],
    "throat pain": [36, 20],
    "shoulder pain": [34, 26],
    "chest or rib pain": [57, 29],
    "upper arm pain": [42, 33],
    "arm pain": [42, 33],
    "elbow pain": [35, 40],
    "side stomach pain": [58, 41],
    "lower back pain": [38, 46],
    "buttocks pain": [37, 50],
    "wrist pain": [56, 54],
    "hand pain": [57, 58],
    "finger pain": [58, 61],
    "hip pain": [42, 55],
    "thigh pain": [50, 67],
    "knee pain": [48, 72],
    "calf pain": [47, 79],
    "ankle pain": [46, 87],
    "foot pain": [55, 92],
    "toe pain": [61, 96]
  }
};
const agentTranscript = document.querySelector("#agentTranscript");
const conditionCards = document.querySelector("#conditionCards");
const riskBadge = document.querySelector("#riskBadge");
const doctorList = document.querySelector("#doctorList");
const mapSearch = document.querySelector("#mapSearch");
const reportList = document.querySelector("#reportList");
const reportSheet = document.querySelector("#reportSheet");
const reportTabs = document.querySelectorAll("[data-report-tab]");
const reportPanels = document.querySelectorAll("[data-report-panel]");
const printReport = document.querySelector("#printReport");
const downloadReport = document.querySelector("#downloadReport");
const downloadDigitalReport = document.querySelector("#downloadDigitalReport");
const sheetPainMaps = document.querySelector("#sheetPainMaps");

let latestDigitalReportItems = [
  ["Status", "Complete symptom analysis to generate the patient report."]
];
const selectedPainPoints = new Map();

const sheetFields = {
  reportNo: document.querySelector("#sheetReportNo"),
  reportDate: document.querySelector("#sheetReportDate"),
  patientName: document.querySelector("#sheetPatientName"),
  patientPhone: document.querySelector("#sheetPatientPhone"),
  patientAge: document.querySelector("#sheetPatientAge"),
  ageGroup: document.querySelector("#sheetAgeGroup"),
  duration: document.querySelector("#sheetDuration"),
  location: document.querySelector("#sheetLocation"),
  risk: document.querySelector("#sheetRisk"),
  symptoms: document.querySelector("#sheetSymptoms"),
  condition: document.querySelector("#sheetCondition"),
  advice: document.querySelector("#sheetAdvice"),
  painLocations: document.querySelector("#sheetPainLocations"),
  doctorName: document.querySelector("#sheetDoctorName"),
  doctorType: document.querySelector("#sheetDoctorType"),
  doctorContact: document.querySelector("#sheetDoctorContact"),
  generatedOn: document.querySelector("#sheetGeneratedOn"),
  footerDate: document.querySelector("#sheetFooterDate")
};

const selectedSymptoms = new Set();

const conditions = [
  {
    id: "emergency",
    name: "Emergency warning signs",
    specialty: "Emergency care",
    severity: "high",
    keywords: [
      "breathing trouble",
      "shortness of breath",
      "chest pain",
      "unconscious",
      "seizure",
      "blue lips",
      "severe dehydration",
      "blood in stool",
      "vomiting blood"
    ],
    advice:
      "Seek urgent medical care now. Do not wait for chatbot advice when breathing trouble, chest pain, seizure, unconsciousness, severe dehydration, or bleeding is present."
  },
  {
    id: "dengue",
    name: "Possible dengue or mosquito-borne fever",
    specialty: "General physician or internal medicine",
    severity: "medium",
    keywords: ["fever", "headache", "body pain", "joint pain", "rash", "eye pain", "mosquito", "vomiting"],
    advice:
      "Drink fluids, rest, avoid mosquito bites, and visit a clinic for assessment and testing. If belly pain, repeated vomiting, bleeding, extreme tiredness, or restlessness appears, seek urgent care."
  },
  {
    id: "respiratory",
    name: "Possible respiratory infection",
    specialty: "General physician or pulmonologist",
    severity: "medium",
    keywords: ["cough", "fever", "sore throat", "runny nose", "breathing", "wheezing", "chest"],
    advice:
      "Use a mask around others, drink fluids, rest, and monitor breathing. Seek medical care quickly for breathing difficulty, chest pain, high fever, or symptoms lasting more than a few days."
  },
  {
    id: "diarrhea",
    name: "Possible diarrhea or dehydration risk",
    specialty: "General physician, gastroenterologist, or pediatrician",
    severity: "medium",
    keywords: ["diarrhea", "loose motion", "vomiting", "stomach pain", "dehydration", "thirst", "weakness"],
    advice:
      "Use safe drinking water and oral rehydration solution if available. Seek care for blood in stool, repeated vomiting, severe weakness, very little urination, or symptoms in infants."
  },
  {
    id: "skin",
    name: "Possible skin infection or allergy",
    specialty: "General physician or dermatologist",
    severity: "low",
    keywords: ["rash", "itching", "swelling", "redness", "skin", "allergy"],
    advice:
      "Keep the area clean and avoid scratching. Seek care if rash spreads quickly, fever is present, swelling affects the face, or breathing becomes difficult."
  },
  {
    id: "pain",
    name: "Possible localized pain or injury",
    specialty: "Primary care, orthopedics, or physiotherapy referral",
    severity: "low",
    keywords: [
      "head pain",
      "back of head pain",
      "temple pain",
      "eye pain",
      "ear pain",
      "nose problem",
      "mouth or throat pain",
      "throat pain",
      "jaw pain",
      "neck pain",
      "shoulder pain",
      "shoulder blade pain",
      "arm pain",
      "elbow pain",
      "wrist pain",
      "hand pain",
      "chest or rib pain",
      "stomach pain",
      "side stomach pain",
      "pelvic pain",
      "upper back pain",
      "spine pain",
      "lower back pain",
      "hip pain",
      "thigh pain",
      "knee pain",
      "leg pain",
      "calf pain",
      "ankle pain",
      "foot pain",
      "heel pain",
      "jaw pain",
      "rib pain"
    ],
    advice:
      "Rest the painful area, avoid heavy activity, and seek a clinic review if pain is severe, follows injury, causes swelling, numbness, weakness, fever, or does not improve."
  },
  {
    id: "heat",
    name: "Possible heat stress",
    specialty: "Primary care or emergency care",
    severity: "medium",
    keywords: ["heat", "dizziness", "faint", "weakness", "headache", "thirst", "dehydration"],
    advice:
      "Move to shade, sip safe fluids, cool the body, and rest. Seek urgent care for confusion, fainting, very high body temperature, or inability to drink."
  }
];

const doctors = {
  emergency: [
    {
      label: "Emergency care",
      name: "Nearest Emergency Unit",
      detail: "Best choice for breathing trouble, bleeding, seizures, unconsciousness, or severe dehydration.",
      phone: "108"
    },
    {
      label: "Ambulance",
      name: "Emergency Ambulance Helpline",
      detail: "Use your local emergency number where available.",
      phone: "102"
    }
  ],
  dengue: [
    {
      label: "General physician",
      name: "Dr. Ananya Rao",
      detail: "Fever, dengue screening, dehydration check, and referral.",
      phone: "+91 98765 42110"
    },
    {
      label: "Community clinic",
      name: "Block Primary Health Centre",
      detail: "Testing support, fever clinic, and public health reporting.",
      phone: "+91 98765 43210"
    }
  ],
  respiratory: [
    {
      label: "General physician",
      name: "Dr. Vivek Sharma",
      detail: "Cough, fever, throat infection, and breathing assessment.",
      phone: "+91 98765 42111"
    },
    {
      label: "Pulmonology referral",
      name: "District Respiratory Clinic",
      detail: "Referral option for wheezing, long cough, or breathing difficulty.",
      phone: "+91 98765 42112"
    }
  ],
  diarrhea: [
    {
      label: "Primary care",
      name: "Community Health Centre",
      detail: "Oral rehydration, dehydration assessment, and stool testing referral.",
      phone: "+91 98765 43210"
    },
    {
      label: "Pediatrician",
      name: "Dr. Farah Khan",
      detail: "Child diarrhea, vomiting, fever, and nutrition follow-up.",
      phone: "+91 98765 42113"
    }
  ],
  skin: [
    {
      label: "Dermatology",
      name: "Dr. Meera Nair",
      detail: "Rash, allergy, itching, skin infection, and wound review.",
      phone: "+91 98765 42114"
    },
    {
      label: "Primary care",
      name: "Rural Health Sub-Centre",
      detail: "First assessment and medicine guidance.",
      phone: "+91 98765 42115"
    }
  ],
  pain: [
    {
      label: "Primary care",
      name: "Community Health Centre",
      detail: "First assessment for body pain, injury, swelling, or movement difficulty.",
      phone: "+91 98765 43210"
    },
    {
      label: "Orthopedic referral",
      name: "District Bone and Joint Clinic",
      detail: "Referral option for joint pain, back pain, sprain, fracture concern, or long-lasting pain.",
      phone: "+91 98765 42117"
    }
  ],
  heat: [
    {
      label: "Primary care",
      name: "Heat Safety Clinic Desk",
      detail: "Dehydration check, heat illness guidance, and referral.",
      phone: "+91 98765 42116"
    },
    {
      label: "Emergency care",
      name: "Nearest Emergency Unit",
      detail: "For fainting, confusion, or severe heat illness signs.",
      phone: "108"
    }
  ],
  default: [
    {
      label: "Primary care",
      name: "Community Health Centre",
      detail: "General symptoms, vaccination questions, and referral guidance.",
      phone: "+91 98765 43210"
    }
  ]
};

function addTranscript(type, text) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  agentTranscript.appendChild(message);
  agentTranscript.scrollTop = agentTranscript.scrollHeight;
}

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function calculateAgeGroup(ageValue) {
  const age = Number(ageValue);

  if (!Number.isFinite(age) || age < 0) {
    return { key: "adult", label: "" };
  }

  if (age <= 5) {
    return { key: "child", label: "Early child (0-5)" };
  }

  if (age <= 12) {
    return { key: "child", label: "Child (6-12)" };
  }

  if (age <= 17) {
    return { key: "teen", label: "Teen (13-17)" };
  }

  if (age <= 59) {
    return { key: "adult", label: "Adult (18-59)" };
  }

  return { key: "senior", label: "Senior (60+)" };
}

function updateAgeGroup() {
  const calculated = calculateAgeGroup(patientAge.value);
  ageGroup.value = calculated.label;
}

function getAgeGroupKey() {
  return calculateAgeGroup(patientAge.value).key;
}

function calculateMatches(text) {
  const ageKey = getAgeGroupKey();

  return conditions
    .map((condition) => {
      const matches = condition.keywords.filter((keyword) => text.includes(keyword));
      let score = matches.length;

      if (ageKey === "child" && condition.id === "diarrhea") {
        score += 1;
      }

      if (ageKey === "senior" && condition.severity !== "low") {
        score += 1;
      }

      return { ...condition, matches, score };
    })
    .filter((condition) => condition.score > 0)
    .sort((a, b) => {
      if (a.id === "emergency") {
        return -1;
      }
      if (b.id === "emergency") {
        return 1;
      }
      return b.score - a.score;
    });
}

function setRisk(matches) {
  const hasEmergency = matches.some((match) => match.id === "emergency");
  const topSeverity = hasEmergency ? "high" : matches[0]?.severity || "neutral";

  riskBadge.className = `risk-badge ${topSeverity}`;
  riskBadge.textContent =
    topSeverity === "high" ? "Urgent" :
    topSeverity === "medium" ? "Needs clinic review" :
    topSeverity === "low" ? "Monitor" :
    "Waiting";
}

function renderConditions(matches) {
  conditionCards.innerHTML = "";

  if (!matches.length) {
    conditionCards.innerHTML = `
      <article>
        <h3>More information needed</h3>
        <p>Add symptoms such as fever, cough, rash, diarrhea, vomiting, breathing difficulty, pain, duration, and severity.</p>
      </article>
    `;
    return;
  }

  matches.slice(0, 3).forEach((condition) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <span class="condition-tag">${condition.specialty}</span>
      <h3>${condition.name}</h3>
      <p>${condition.advice}</p>
      <small>Matched: ${condition.matches.join(", ") || "context clues"}</small>
    `;
    conditionCards.appendChild(card);
  });
}

function renderDoctors(primaryCondition) {
  const doctorKey = primaryCondition?.id || "default";
  const relevantDoctors = doctors[doctorKey] || doctors.default;
  doctorList.innerHTML = "";

  relevantDoctors.forEach((doctor) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <span>${doctor.label}</span>
      <h3>${doctor.name}</h3>
      <p>${doctor.detail}</p>
      <a href="tel:${doctor.phone.replace(/\s/g, "")}">${doctor.phone}</a>
    `;
    doctorList.appendChild(article);
  });

  const location = patientLocation.value.trim() || "near me";
  const specialty = primaryCondition?.specialty || "doctor";
  mapSearch.href = `https://www.google.com/maps/search/${encodeURIComponent(`${specialty} ${location}`)}`;
  return relevantDoctors;
}

function buildSymptomText() {
  const typed = symptomInput.value.trim();
  const chips = Array.from(selectedSymptoms).join(", ");
  return normalize(`${typed} ${chips}`);
}

function getSelectedAgeText() {
  return ageGroup.value || "Not provided";
}

function formatSymptoms(rawText, chipText) {
  if (rawText && chipText) {
    return `${rawText}; selected: ${chipText}`;
  }

  return rawText || chipText || "Not provided";
}

function setSheetText(field, value) {
  if (sheetFields[field]) {
    sheetFields[field].textContent = value;
  }
}

function setActiveReport(type) {
  reportTabs.forEach((tab) => {
    const isActive = tab.dataset.reportTab === type;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  reportPanels.forEach((panel) => {
    const isActive = panel.dataset.reportPanel === type;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

function renderDigitalReport(items) {
  latestDigitalReportItems = items;
  reportList.innerHTML = "";

  items.forEach(([label, value]) => {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${label}:`;
    item.appendChild(strong);
    item.append(` ${value}`);
    reportList.appendChild(item);
  });
}

function setActiveBodyView(view) {
  bodyViewTabs.forEach((tab) => {
    const isActive = tab.dataset.bodyView === view;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  bodyViewPanels.forEach((panel) => {
    const isActive = panel.dataset.bodyPanel === view;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  window.requestAnimationFrame(() => {
    positionBodyHotspots();
    drawBodyArrows();
  });
}

function getPainKey(view, part) {
  return `${view}:${part}`;
}

function getPainLocationList() {
  return Array.from(selectedPainPoints.values()).map((point) => `${point.label} (${point.view})`);
}

function addBodyPartToSymptoms(part, button) {
  const view = button?.closest(".body-view")?.dataset.bodyPanel || "front";
  const target = bodyTargetMap[view]?.[part] || [50, 50];
  const key = getPainKey(view, part);
  const label = button?.textContent.trim() || part;

  if (selectedPainPoints.has(key)) {
    selectedPainPoints.delete(key);
    button?.classList.remove("selected");
    button?.setAttribute("aria-pressed", "false");
  } else {
    selectedPainPoints.set(key, { key, view, part, label, x: target[0], y: target[1] });
    button?.classList.add("selected");
    button?.setAttribute("aria-pressed", "true");
  }

  const current = symptomInput.value.trim();
  const hasPart = current.toLowerCase().includes(part.toLowerCase());

  if (!hasPart) {
    const addition = current ? `, ${part}` : part;
    symptomInput.value = `${current}${addition}`;
  }

  symptomInput.focus();
  renderPainMaps();
}

function positionBodyHotspots() {
  bodyViewPanels.forEach((panel) => {
    const view = panel.dataset.bodyPanel;
    const targets = bodyTargetMap[view] || {};
    const diagram = panel.querySelector(".body-diagram");
    const image = panel.querySelector(".body-picture");
    const diagramRect = diagram?.getBoundingClientRect();
    const imageRect = image?.getBoundingClientRect();
    let contentRect = null;

    if (diagramRect && imageRect && imageRect.width && imageRect.height) {
      const naturalRatio = image.naturalWidth && image.naturalHeight
        ? image.naturalWidth / image.naturalHeight
        : 532 / 1024;
      const boxRatio = imageRect.width / imageRect.height;
      let width = imageRect.width;
      let height = imageRect.height;
      let left = imageRect.left - diagramRect.left;
      let top = imageRect.top - diagramRect.top;

      if (boxRatio > naturalRatio) {
        width = imageRect.height * naturalRatio;
        left += (imageRect.width - width) / 2;
      } else {
        height = imageRect.width / naturalRatio;
        top += (imageRect.height - height) / 2;
      }

      contentRect = { left, top, width, height };
    }

    panel.querySelectorAll(".body-label").forEach((label) => {
      const target = targets[label.dataset.bodyPart];

      if (target && contentRect) {
        label.style.left = `${contentRect.left + contentRect.width * target[0] / 100}px`;
        label.style.top = `${contentRect.top + contentRect.height * target[1] / 100}px`;
      } else if (target) {
        label.style.setProperty("--x", `${target[0]}%`);
        label.style.setProperty("--y", `${target[1]}%`);
      }
    });
  });
}

function drawBodyArrows() {
  document.querySelectorAll(".body-arrow, .body-target-dot").forEach((item) => item.remove());

  if (document.querySelector(".body-map-card-svg")) {
    return;
  }

  const activePanel = document.querySelector(".body-view.active");
  if (!activePanel) {
    return;
  }

  const view = activePanel.dataset.bodyPanel;
  const diagram = activePanel.querySelector(".body-diagram");
  const targets = bodyTargetMap[view] || {};

  activePanel.querySelectorAll(".body-label").forEach((label) => {
    const target = targets[label.dataset.bodyPart];

    if (!target) {
      return;
    }

    const diagramRect = diagram.getBoundingClientRect();
    const labelRect = label.getBoundingClientRect();
    const labelCenterX = labelRect.left - diagramRect.left + labelRect.width / 2;
    const labelCenterY = labelRect.top - diagramRect.top + labelRect.height / 2;
    const targetX = diagramRect.width * (target[0] / 100);
    const targetY = diagramRect.height * (target[1] / 100);
    const deltaX = targetX - labelCenterX;
    const deltaY = targetY - labelCenterY;
    const distance = Math.hypot(deltaX, deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    const arrow = document.createElement("span");
    arrow.className = "body-arrow";
    arrow.style.left = `${labelCenterX}px`;
    arrow.style.top = `${labelCenterY}px`;
    arrow.style.width = `${Math.max(distance - 16, 20)}px`;
    arrow.style.transform = `rotate(${angle}deg)`;

    const dot = document.createElement("span");
    dot.className = "body-target-dot";
    dot.style.left = `${targetX}px`;
    dot.style.top = `${targetY}px`;

    diagram.append(arrow, dot);
  });
}

const reportBodyImages = {
  front: "assets/anatomy-front.svg",
  back: "assets/anatomy-back.svg",
  side: "assets/anatomy-side.svg"
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function getAssetUrl(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch (error) {
    return path;
  }
}

function reportBodyImage(view, points) {
  const title = view.charAt(0).toUpperCase() + view.slice(1);
  const source = getAssetUrl(reportBodyImages[view] || reportBodyImages.front);
  const marks = points
    .map((point) => {
      const label = escapeHtml(point.label);
      return `<span class="sheet-pain-dot" style="left: ${point.x}%; top: ${point.y}%;" title="${label}"><span>${label}</span></span>`;
    })
    .join("");

  return `
    <div class="sheet-pain-map">
      <strong>${title} view</strong>
      <div class="sheet-pain-frame">
        <img class="sheet-body-picture" src="${source}" alt="${title} view anatomy diagram">
        ${marks}
      </div>
    </div>
  `;
}

function renderPainMaps() {
  const painLocations = getPainLocationList();
  setSheetText("painLocations", painLocations.length ? painLocations.join(", ") : "No anatomy point selected.");

  if (!sheetPainMaps) {
    return;
  }

  const grouped = { front: [], back: [], side: [] };
  selectedPainPoints.forEach((point) => {
    grouped[point.view]?.push(point);
  });
  const activeViews = Object.entries(grouped).filter(([, points]) => points.length);

  if (!activeViews.length) {
    sheetPainMaps.className = "sheet-pain-maps";
    sheetPainMaps.innerHTML = "<p>No pain location selected from the body map.</p>";
    return;
  }

  sheetPainMaps.className = `sheet-pain-maps view-count-${activeViews.length}`;
  sheetPainMaps.innerHTML = activeViews
    .map(([view, points]) => reportBodyImage(view, points))
    .join("");
}

function makeReportNumber() {
  const stamp = Date.now().toString().slice(-6);
  return `AIH-${stamp}`;
}

function renderPatientReport(matches, primaryDoctor, rawText, chipText) {
  const top = matches[0];
  const advice = top
    ? top.advice
    : "More symptom details are needed before the AI can suggest a care path.";
  const condition = top ? top.name : "More information needed";
  const urgency = riskBadge.textContent;
  const doctorName = primaryDoctor?.name || "Community Health Centre";
  const doctorType = primaryDoctor?.label || "Primary care";
  const doctorPhone = primaryDoctor?.phone || "+91 98765 43210";
  const now = new Date();
  const dateText = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const timeText = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const reportItems = [
    ["Patient name", patientName.value.trim() || "Not provided"],
    ["Patient contact number", patientPhone.value.trim() || "Not provided"],
    ["Age", patientAge.value.trim() || "Not provided"],
    ["Age group", getSelectedAgeText()],
    ["Symptoms", formatSymptoms(rawText, chipText)],
    ["Anatomy pain locations", getPainLocationList().join(", ") || "No anatomy point selected"],
    ["Duration", symptomDuration.value.trim() || "Not provided"],
    ["Location", patientLocation.value.trim() || "Not provided"],
    ["AI risk level", urgency],
    ["Possible condition category", condition],
    ["Advice", advice],
    ["Recommended doctor", `${doctorName} (${doctorType})`],
    ["Doctor contact number", doctorPhone]
  ];

  renderDigitalReport(reportItems);

  setSheetText("reportNo", makeReportNumber());
  setSheetText("reportDate", dateText);
  setSheetText("patientName", patientName.value.trim() || "Not provided");
  setSheetText("patientPhone", patientPhone.value.trim() || "Not provided");
  setSheetText("patientAge", patientAge.value.trim() || "Not provided");
  setSheetText("ageGroup", getSelectedAgeText());
  setSheetText("duration", symptomDuration.value.trim() || "Not provided");
  setSheetText("location", patientLocation.value.trim() || "Not provided");
  setSheetText("risk", urgency);
  setSheetText("symptoms", formatSymptoms(rawText, chipText));
  setSheetText("condition", condition);
  setSheetText("advice", advice);
  renderPainMaps();
  setSheetText("doctorName", doctorName);
  setSheetText("doctorType", doctorType);
  setSheetText("doctorContact", doctorPhone);
  setSheetText("generatedOn", `${dateText}, ${timeText}`);
  setSheetText("footerDate", `Generated by AI HealthBot on ${dateText}`);
}

function downloadReportSheet() {
  const patientFileName = (patientName.value.trim() || "patient")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const datePart = new Date().toISOString().slice(0, 10);
  const fileName = `${patientFileName || "patient"}-ai-healthbot-a4-report-${datePart}.html`;
  const reportStyles = `
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 18px; background: #eeeeee; color: #4d4659; font-family: Arial, Helvetica, sans-serif; }
    .a4-sheet { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 17mm 18mm; background: #ffffff; box-shadow: 0 10px 32px rgba(0,0,0,0.18); }
    .sheet-header { text-align: center; }
    .sheet-brand { margin: 0 0 5px; color: #0b8f83; font-size: 17px; font-weight: 900; text-transform: uppercase; }
    .sheet-header h3 { margin: 0; color: #7b175c; font-size: 25px; text-transform: uppercase; }
    .sheet-about { max-width: 150mm; margin: 9px auto 0; color: #6b6375; font-size: 11px; line-height: 1.45; }
    .sheet-rule.strong { height: 7px; margin: 14px -18mm 16px; background: linear-gradient(90deg, #ef4057 0 46%, #ffc48f 46% 100%); }
    .sheet-rule.soft { height: 6px; margin: 12px -18mm 12px; background: linear-gradient(90deg, #ffc48f 0 50%, transparent 50% 100%); }
    .sheet-meta, .sheet-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 26px; }
    .sheet-meta { margin: 0 0 10px; }
    .sheet-meta span, .sheet-info-grid span { display: block; margin-bottom: 5px; color: #7b175c; font-size: 11px; font-weight: 800; }
    .sheet-meta strong, .sheet-info-grid strong { color: #5f586b; font-size: 11px; font-weight: 600; line-height: 1.45; }
    .sheet-section { margin-top: 12px; }
    .sheet-section h4 { margin: 0 0 9px; color: #7b175c; font-size: 12px; }
    .sheet-table { width: 100%; border-collapse: collapse; font-size: 11px; }
    .sheet-table th, .sheet-table td { border: 1px solid #e6e0ea; padding: 9px; text-align: left; vertical-align: top; line-height: 1.45; }
    .sheet-table th { width: 35%; color: #7b175c; background: #f6f2f8; }
    .sheet-pain-maps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .sheet-pain-maps p { margin: 0; color: #6b6375; font-size: 11px; }
    .sheet-pain-map { min-height: 122px; padding: 7px; border: 1px solid #e6e0ea; background: #faf7fb; text-align: center; }
    .sheet-pain-map strong { display: block; margin-bottom: 4px; color: #7b175c; font-size: 10px; }
    .sheet-pain-map svg { width: 100%; height: 104px; display: block; }
    .mini-head, .mini-neck, .mini-body { fill: #f4b78f; stroke: #8b5844; stroke-width: 1.6; }
    .mini-limb { fill: none; stroke: #8b5844; stroke-width: 5; stroke-linecap: round; }
    .mini-pain-dot { fill: #e5362f; stroke: #ffffff; stroke-width: 1.4; filter: drop-shadow(0 1px 2px rgba(0,0,0,.25)); }
    .sheet-footer { display: flex; justify-content: space-between; gap: 18px; margin-top: 22px; padding-top: 12px; border-top: 1px solid #e6e0ea; color: #6b6375; font-size: 10px; line-height: 1.45; }
    .sheet-footer p { margin: 0; max-width: 125mm; }
    .sheet-footer span { white-space: nowrap; }
    @media print { body { padding: 0; background: #ffffff; } .a4-sheet { box-shadow: none; margin: 0; } }
  `;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI HealthBot A4 Patient Report</title>
  <style>${reportStyles}</style>
</head>
<body>
  ${reportSheet.outerHTML}
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadDigitalReportFile() {
  const patientFileName = (patientName.value.trim() || "patient")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const datePart = new Date().toISOString().slice(0, 10);
  const fileName = `${patientFileName || "patient"}-ai-healthbot-digital-report-${datePart}.txt`;
  const lines = [
    "AI HealthBot",
    "AI Patient Digital Report",
    "About us: AI HealthBot is an AI-driven public health chatbot for disease awareness, preventive care education, vaccination reminders, and safe doctor referral support.",
    "",
    ...latestDigitalReportItems.map(([label, value]) => `${label}: ${value}`),
    "",
    "Note: This is an AI-generated awareness and referral note, not a medicine prescription. A qualified doctor must confirm diagnosis and treatment."
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function analyzeSymptoms() {
  const rawText = symptomInput.value.trim();
  const chipText = Array.from(selectedSymptoms).join(", ");
  const combinedText = buildSymptomText();

  if (!combinedText) {
    addTranscript("bot", "Please enter symptoms or choose symptom buttons before analysis.");
    return;
  }

  addTranscript("user", `${rawText || "Selected symptoms"}${chipText ? ` (${chipText})` : ""}`);

  const matches = calculateMatches(combinedText);
  setRisk(matches);
  renderConditions(matches);
  const relevantDoctors = renderDoctors(matches[0]);
  renderPatientReport(matches, relevantDoctors[0], rawText, chipText);

  if (!matches.length) {
    addTranscript("bot", "I need more detail before suggesting a care path. Add duration, severity, fever, pain, breathing, vomiting, rash, or dehydration signs.");
    return;
  }

  const top = matches[0];
  const locationText = patientLocation.value.trim() ? ` near ${patientLocation.value.trim()}` : "";
  const message =
    top.id === "emergency"
      ? "Warning signs detected. Please seek urgent care or call an emergency number now."
      : `Most relevant category: ${top.name}. Suggested care: ${top.specialty}${locationText}. See the advice and doctor panel for next steps.`;

  window.setTimeout(() => addTranscript("bot", message), 250);
}

symptomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const symptom = button.dataset.symptom;

    if (selectedSymptoms.has(symptom)) {
      selectedSymptoms.delete(symptom);
      button.classList.remove("selected");
    } else {
      selectedSymptoms.add(symptom);
      button.classList.add("selected");
    }
  });
});

bodyViewTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveBodyView(tab.dataset.bodyView);
  });
});

bodyPartButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    addBodyPartToSymptoms(button.dataset.bodyPart, button);
  });
});

document.querySelectorAll(".body-picture").forEach((image) => {
  image.addEventListener("load", positionBodyHotspots);
});

window.addEventListener("load", () => {
  positionBodyHotspots();
  drawBodyArrows();
});
window.addEventListener("resize", () => {
  positionBodyHotspots();
  window.requestAnimationFrame(drawBodyArrows);
});

agentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  analyzeSymptoms();
});

resetAgent.addEventListener("click", () => {
  selectedSymptoms.clear();
  selectedPainPoints.clear();
  symptomButtons.forEach((button) => button.classList.remove("selected"));
  bodyPartButtons.forEach((button) => {
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
  });
  patientName.value = "";
  patientPhone.value = "";
  patientAge.value = "";
  updateAgeGroup();
  symptomInput.value = "";
  symptomDuration.value = "";
  patientLocation.value = "";
  riskBadge.className = "risk-badge neutral";
  riskBadge.textContent = "Waiting";
  conditionCards.innerHTML = "";
  doctorList.innerHTML = `
    <article>
      <span>Primary care</span>
      <h3>Community Health Centre</h3>
      <p>Use this first for general symptoms, fever, vaccination questions, and referral guidance.</p>
      <a href="tel:+919876543210">+91 98765 43210</a>
    </article>
  `;
  mapSearch.href = "https://www.google.com/maps/search/doctor+near+me";
  renderDigitalReport([
    ["Status", "Complete symptom analysis to generate the patient report."]
  ]);
  setSheetText("reportNo", "AIH-0001");
  setSheetText("reportDate", "Not generated");
  setSheetText("patientName", "Not provided");
  setSheetText("patientPhone", "Not provided");
  setSheetText("patientAge", "Not provided");
  setSheetText("ageGroup", "Not provided");
  setSheetText("duration", "Not provided");
  setSheetText("location", "Not provided");
  setSheetText("risk", "Waiting");
  setSheetText("symptoms", "Complete symptom analysis to generate the report.");
  setSheetText("condition", "Waiting");
  setSheetText("advice", "Analyze symptoms to receive prevention and care guidance.");
  renderPainMaps();
  setSheetText("doctorName", "Community Health Centre");
  setSheetText("doctorType", "Primary care");
  setSheetText("doctorContact", "+91 98765 43210");
  setSheetText("generatedOn", "Not generated");
  setSheetText("footerDate", "AI HealthBot");
  agentTranscript.innerHTML = "";
  addTranscript("bot", "Tell me the patient's age, symptoms, duration, and location. I will calculate the age group and show possible disease categories, warning signs, advice, and doctor options.");
});

patientAge.addEventListener("input", updateAgeGroup);

reportTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveReport(tab.dataset.reportTab);
  });
});

printReport.addEventListener("click", () => {
  setActiveReport("physical");
  window.setTimeout(() => window.print(), 100);
});

downloadReport.addEventListener("click", downloadReportSheet);
downloadDigitalReport.addEventListener("click", downloadDigitalReportFile);

updateAgeGroup();
positionBodyHotspots();
drawBodyArrows();

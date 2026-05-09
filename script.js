const chatWindow = document.querySelector("#chatWindow");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const languageSelect = document.querySelector("#languageSelect");
const quickButtons = document.querySelectorAll(".quick-prompts button");
const alertTicker = document.querySelector("#alertTicker");

const languageContent = {
  en: {
    greeting:
      "Namaste. I can help with symptoms, prevention, vaccine schedules, and local outbreak alerts. What would you like to know?",
    placeholder: "Ask about fever, vaccines, dengue, diarrhea...",
    quick: {
      symptoms: "Symptoms",
      vaccine: "Vaccines",
      outbreak: "Alerts",
      prevention: "Prevention"
    },
    replies: {
      symptoms:
        "For fever, cough, diarrhea, rash, or breathing difficulty, track duration and severity. Seek urgent care for chest pain, confusion, dehydration, blue lips, seizures, or breathing trouble.",
      vaccine:
        "Vaccination depends on age, pregnancy status, and previous doses. For children, keep the immunization card updated and check the nearest health center for due vaccines.",
      outbreak:
        "Demo local alert: higher mosquito-borne illness risk this week. Remove standing water, use mosquito nets or repellents, and visit a clinic for persistent fever.",
      prevention:
        "Key prevention steps: wash hands, drink safe water, keep food covered, use mosquito protection, complete vaccinations, and avoid self-medication with antibiotics.",
      default:
        "I can give education and next steps, but I cannot diagnose. Tell me the symptom, age group, duration, and location so I can guide you better."
    }
  },
  hi: {
    greeting:
      "Namaste. Main lakshan, bachav, vaccine schedule aur local alert ke bare me madad kar sakta hoon. Aap kya jaanna chahte hain?",
    placeholder: "Bukhar, vaccine, dengue, dast ke bare me poochiye...",
    quick: {
      symptoms: "Lakshan",
      vaccine: "Vaccine",
      outbreak: "Alert",
      prevention: "Bachav"
    },
    replies: {
      symptoms:
        "Bukhar, khansi, dast, daane, ya saans lene me dikkat ho to din aur gambhirta note karein. Saans ki dikkat, behoshi, dehydration, ya chest pain ho to turant doctor se sampark karein.",
      vaccine:
        "Vaccine age, pregnancy status, aur purane doses par depend karta hai. Bachchon ka immunization card update rakhein aur najdeeki health center se due vaccine check karein.",
      outbreak:
        "Demo local alert: is hafte machhar se hone wali bimari ka risk badha hai. Ruka hua paani hatayein, mosquito net use karein, aur lagatar bukhar me clinic jayen.",
      prevention:
        "Bachav ke steps: haath dhona, saaf paani peena, khana dhak kar rakhna, mosquito protection, vaccine complete karna, aur antibiotics bina salah ke na lena.",
      default:
        "Main health education de sakta hoon, diagnosis nahi. Kripya lakshan, age group, kitne din se hai, aur location batayein."
    }
  },
  bn: {
    greeting:
      "Nomoskar. Ami lokkhan, protirudh, vaccine schedule, ebong local alert niye sahajjo korte pari. Apni ki jante chan?",
    placeholder: "Jor, vaccine, dengue, pet kharap niye jiggesh korun...",
    quick: {
      symptoms: "Lokkhan",
      vaccine: "Vaccine",
      outbreak: "Alert",
      prevention: "Protirudh"
    },
    replies: {
      symptoms:
        "Jor, kashi, pet kharap, daag, ba shash nite osubidha hole somoy ebong gorutwo note korun. Shash kosto, buk betha, dehydration, ba behosh hole taratari doctor dekhan.",
      vaccine:
        "Vaccine boyosh, pregnancy status, ebong ager dose er upor depend kore. Shishur immunization card update rakhun ebong nearest health center e due vaccine check korun.",
      outbreak:
        "Demo local alert: ei soptaho mosquito-borne illness risk beshi. Jome thaka jol soran, mosquito net use korun, ebong jor thakle clinic e jan.",
      prevention:
        "Protirudh: haath dhowa, safe water, khabar dhaka, mosquito protection, vaccine complete, ebong doctor chara antibiotic na khawa.",
      default:
        "Ami health education dite pari, diagnosis noy. Lokkhan, boyosh group, kotodin dhore, ebong location bolun."
    }
  },
  te: {
    greeting:
      "Namaskaram. Lakshanalu, prevention, vaccine schedule, mariyu local alerts gurinchi sahayam chestanu. Meeru emi telusukovali?",
    placeholder: "Jvaram, vaccine, dengue, diarrhea gurinchi adandi...",
    quick: {
      symptoms: "Lakshanalu",
      vaccine: "Vaccine",
      outbreak: "Alerts",
      prevention: "Prevention"
    },
    replies: {
      symptoms:
        "Jvaram, daggu, diarrhea, rashes, leda shwasalo ibbandi unte duration mariyu severity note cheyandi. Chest pain, confusion, dehydration, seizures, leda breathing trouble unte urgent care teesukondi.",
      vaccine:
        "Vaccination age, pregnancy status, mariyu previous doses meeda depend avutundi. Pillala immunization card update chesi nearest health center lo due vaccines check cheyandi.",
      outbreak:
        "Demo local alert: ee vaaram mosquito-borne illness risk ekkuva. Nilva neellu teesiveyandi, mosquito net vadandi, persistent fever unte clinic ki vellandi.",
      prevention:
        "Prevention steps: hands wash cheyandi, safe water tagandi, food cover cheyandi, mosquito protection vadandi, vaccines complete cheyandi.",
      default:
        "Nenu health education ivvagalanu, diagnosis kadu. Symptom, age group, duration, location cheppandi."
    }
  }
};

const alerts = [
  "Dengue prevention reminder: remove standing water and use mosquito protection.",
  "Heat safety reminder: drink safe water, rest in shade, and check on older adults.",
  "Vaccination reminder: keep child immunization cards updated before seasonal travel.",
  "Water safety reminder: boil or filter drinking water during heavy rain periods."
];

function addMessage(type, text) {
  const bubble = document.createElement("div");
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getLanguage() {
  return languageContent[languageSelect.value] || languageContent.en;
}

function detectIntent(message) {
  const text = message.toLowerCase();

  if (text.includes("vaccine") || text.includes("vaccination") || text.includes("immun") || text.includes("dose")) {
    return "vaccine";
  }

  if (text.includes("alert") || text.includes("outbreak") || text.includes("dengue") || text.includes("malaria") || text.includes("flu")) {
    return "outbreak";
  }

  if (text.includes("prevent") || text.includes("avoid") || text.includes("safe") || text.includes("clean") || text.includes("water")) {
    return "prevention";
  }

  if (text.includes("fever") || text.includes("cough") || text.includes("rash") || text.includes("diarrhea") || text.includes("pain") || text.includes("symptom")) {
    return "symptoms";
  }

  return "default";
}

function replyTo(intent) {
  const content = getLanguage();
  const response = content.replies[intent] || content.replies.default;
  window.setTimeout(() => addMessage("bot", response), 320);
}

function refreshLanguage() {
  const content = getLanguage();
  chatInput.placeholder = content.placeholder;
  quickButtons.forEach((button) => {
    button.textContent = content.quick[button.dataset.intent];
  });
  chatWindow.innerHTML = "";
  addMessage("bot", content.greeting);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = chatInput.value.trim();

  if (!value) {
    return;
  }

  addMessage("user", value);
  chatInput.value = "";
  replyTo(detectIntent(value));
});

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = getLanguage();
    const intent = button.dataset.intent;
    addMessage("user", content.quick[intent]);
    replyTo(intent);
  });
});

languageSelect.addEventListener("change", refreshLanguage);

let alertIndex = 0;
window.setInterval(() => {
  alertIndex = (alertIndex + 1) % alerts.length;
  alertTicker.textContent = alerts[alertIndex];
}, 4200);

const metrics = document.querySelectorAll(".metric");
const metricObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const metric = entry.target;
    const target = Number(metric.dataset.target);
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      metric.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
    observer.unobserve(metric);
  });
}, { threshold: 0.45 });

metrics.forEach((metric) => metricObserver.observe(metric));
refreshLanguage();

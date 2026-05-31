const state = {
  mode: "during",
  currentIndex: findInitialStepIndex()
};

const elements = {
  modeButtons: document.querySelectorAll(".tab-button"),
  duringView: document.querySelector("#duringView"),
  beforeView: document.querySelector("#beforeView"),
  currentStepCard: document.querySelector("#currentStepCard"),
  stepTime: document.querySelector("#stepTime"),
  stepTitle: document.querySelector("#stepTitle"),
  stepPlace: document.querySelector("#stepPlace"),
  stepDescription: document.querySelector("#stepDescription"),
  focusBox: document.querySelector("#focusBox"),
  actionList: document.querySelector("#actionList"),
  linkList: document.querySelector("#linkList"),
  nextSummary: document.querySelector("#nextSummary"),
  prevStep: document.querySelector("#prevStep"),
  nextStep: document.querySelector("#nextStep"),
  openSchedule: document.querySelector("#openSchedule"),
  footerSchedule: document.querySelector("#footerSchedule"),
  scheduleDialog: document.querySelector("#scheduleDialog"),
  scheduleList: document.querySelector("#scheduleList"),
  openHelp: document.querySelector("#openHelp"),
  helpDialog: document.querySelector("#helpDialog")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toDateTime(step, timeKey) {
  return new Date(`${step.date}T${step[timeKey]}:00`);
}

function formatDate(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short"
  }).format(date);
}

function findInitialStepIndex() {
  const now = new Date();
  const activeIndex = steps.findIndex((step) => {
    const start = toDateTime(step, "start");
    const end = toDateTime(step, "end");
    return now >= start && now <= end;
  });

  if (activeIndex >= 0) {
    return activeIndex;
  }

  const nextIndex = steps.findIndex((step) => toDateTime(step, "start") > now);
  return nextIndex >= 0 ? nextIndex : steps.length - 1;
}

function getStepType(step) {
  const text = `${step.title} ${step.description} ${step.miniInfo}`;
  if (text.includes("乗車中") || text.includes("車内")) {
    return "riding";
  }
  if (text.includes("到着") || text.includes("チェックイン")) {
    return "arrival";
  }
  if (text.includes("乗車前") || text.includes("移動") || text.includes("空港")) {
    return "beforeRide";
  }
  return "default";
}

function getFocusMessage(step) {
  const type = getStepType(step);
  if (type === "beforeRide") {
    return {
      label: "乗車前",
      text: "チケット、乗り場、目的地を先に確認。"
    };
  }
  if (type === "riding") {
    return {
      label: "乗車中",
      text: "チケットより、到着後の流れを軽く確認。"
    };
  }
  if (type === "arrival") {
    return {
      label: "到着後",
      text: "目的地名、住所、次の移動を見せられるようにする。"
    };
  }
  return {
    label: "メモ",
    text: step.miniInfo
  };
}

function renderStep() {
  const step = steps[state.currentIndex];
  const focus = getFocusMessage(step);
  const type = getStepType(step);

  elements.currentStepCard.dataset.stepState = type;
  elements.stepTime.textContent = `${formatDate(step.date)} ${step.start}-${step.end}`;
  elements.stepTitle.textContent = step.title;
  elements.stepPlace.textContent = step.place;
  elements.stepDescription.textContent = step.description;
  elements.focusBox.innerHTML = `<span>${escapeHtml(focus.label)}</span><p>${escapeHtml(focus.text)}</p><small>${escapeHtml(step.miniInfo)}</small>`;
  elements.actionList.innerHTML = step.actions
    .map((action) => `<div class="action-item">${escapeHtml(action)}</div>`)
    .join("");
  elements.linkList.innerHTML = renderLinks(step.links, "primary");
  elements.nextSummary.textContent = step.nextSummary;
  elements.prevStep.disabled = state.currentIndex === 0;
  elements.nextStep.disabled = state.currentIndex === steps.length - 1;
}

function renderLinks(links, importance = "secondary") {
  const className = importance === "primary" ? "button button--primary" : "button button--secondary";
  return links
    .map((link) => {
      return `<a class="${className}" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`;
    })
    .join("");
}

function renderBeforeTrip() {
  document.querySelector("#checklist").innerHTML = preTrip.checklist
    .map((item) => `<li><span aria-hidden="true"></span>${escapeHtml(item)}</li>`)
    .join("");
  document.querySelector("#undecidedList").innerHTML = preTrip.undecided
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  document.querySelector("#shareList").innerHTML = preTrip.share
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  document.querySelector("#ticketLinks").innerHTML = renderLinks(preTrip.ticketLinks);
}

function renderSchedule() {
  elements.scheduleList.innerHTML = steps
    .map((step, index) => {
      const activeClass = index === state.currentIndex ? " active" : "";
      return `
        <button class="schedule-item${activeClass}" type="button" data-step-index="${index}">
          <span>${escapeHtml(formatDate(step.date))} ${escapeHtml(step.start)}</span>
          <strong>${escapeHtml(step.title)}</strong>
          <small>${escapeHtml(step.place)}</small>
        </button>
      `;
    })
    .join("");
}

function renderHelp() {
  document.querySelector("#hotelName").textContent = helpInfo.hotel.name;
  document.querySelector("#hotelAddress").textContent = helpInfo.hotel.address;
  document.querySelector("#destinations").innerHTML = helpInfo.koreanDestinations
    .map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.text)}</strong></div>`)
    .join("");
  document.querySelector("#phrases").innerHTML = helpInfo.phrases
    .map((item) => `<div><span>${escapeHtml(item.ja)}</span><strong>${escapeHtml(item.ko)}</strong></div>`)
    .join("");
  document.querySelector("#helpTickets").innerHTML = renderLinks(helpInfo.tickets);
  document.querySelector("#helpMaps").innerHTML = renderLinks(helpInfo.maps);
}

function setMode(mode) {
  state.mode = mode;
  elements.modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  elements.duringView.classList.toggle("active", mode === "during");
  elements.beforeView.classList.toggle("active", mode === "before");
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }
  dialog.setAttribute("open", "");
}

elements.modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

elements.prevStep.addEventListener("click", () => {
  state.currentIndex = Math.max(0, state.currentIndex - 1);
  renderStep();
  renderSchedule();
});

elements.nextStep.addEventListener("click", () => {
  state.currentIndex = Math.min(steps.length - 1, state.currentIndex + 1);
  renderStep();
  renderSchedule();
});

[elements.openSchedule, elements.footerSchedule].forEach((button) => {
  button.addEventListener("click", () => {
    renderSchedule();
    openDialog(elements.scheduleDialog);
  });
});

elements.scheduleList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-step-index]");
  if (!item) {
    return;
  }
  state.currentIndex = Number(item.dataset.stepIndex);
  renderStep();
  elements.scheduleDialog.close();
  setMode("during");
});

elements.openHelp.addEventListener("click", () => {
  renderHelp();
  openDialog(elements.helpDialog);
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.close}`).close();
  });
});

renderStep();
renderBeforeTrip();
renderSchedule();
renderHelp();

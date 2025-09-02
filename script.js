// Global state
let scenarios = [];
let currentScenarioIndex = 0;
let userDecisions = [];

// Load scenarios on page load
document.addEventListener("DOMContentLoaded", async () => {
  await loadScenarios();
});

// Load scenarios from JSON file
async function loadScenarios() {
  try {
    const response = await fetch("scenarios.json");
    const data = await response.json();
    scenarios = data.scenarios;
  } catch (error) {
    console.error("Error loading scenarios:", error);
    // Fallback to embedded scenarios if fetch fails
    scenarios = getEmbeddedScenarios();
  }
}

// Start the simulation
function startSimulation() {
  currentScenarioIndex = 0;
  userDecisions = [];
  showScreen("scenario-screen");
  loadScenario(currentScenarioIndex);
}

// Load a specific scenario
function loadScenario(index) {
  if (index >= scenarios.length) {
    showSummary();
    return;
  }

  const scenario = scenarios[index];
  
  // Reset button selections
  document.querySelector('.btn-lever').classList.remove('selected');
  document.querySelector('.btn-no-lever').classList.remove('selected');

  // Update scenario counter
  document.getElementById("current-scenario").textContent = index + 1;

  // Update scenario content
  document.getElementById("scenario-title").textContent = scenario.title;
  document.getElementById("current-state").textContent = scenario.currentState;
  document.getElementById("ai-opportunity").textContent =
    scenario.aiOpportunity;

  // Update benefits list
  const benefitsList = document.getElementById("benefits-list");
  benefitsList.innerHTML = "";
  scenario.benefits.forEach((benefit) => {
    const li = document.createElement("li");
    li.textContent = benefit;
    benefitsList.appendChild(li);
  });

  // Update risks list
  const risksList = document.getElementById("risks-list");
  risksList.innerHTML = "";
  scenario.risks.forEach((risk) => {
    const li = document.createElement("li");
    li.textContent = risk;
    risksList.appendChild(li);
  });
}

// Handle user decision
function makeDecision(pulledLever) {
  const scenario = scenarios[currentScenarioIndex];

  // Visual feedback on button selection
  const leverBtn = document.querySelector('.btn-lever');
  const noLeverBtn = document.querySelector('.btn-no-lever');
  
  // Remove any existing selections
  leverBtn.classList.remove('selected');
  noLeverBtn.classList.remove('selected');
  
  // Add selection to clicked button
  if (pulledLever) {
    leverBtn.classList.add('selected');
  } else {
    noLeverBtn.classList.add('selected');
  }

  // Record decision
  userDecisions.push({
    scenario: scenario.title,
    pulledLever: pulledLever,
    scenarioId: scenario.id,
  });

  // Show animation screen
  setTimeout(() => {
    showAnimationScreen(pulledLever);
  }, 500); // Brief delay for button feedback
}

// Show animation screen and play trolley animation
function showAnimationScreen(pulledLever) {
  showScreen('animation-screen');
  
  const trolleyCar = document.getElementById('trolley-car');
  const lever = document.getElementById('track-lever');
  const aiTrack = document.getElementById('ai-track');
  const humanTrack = document.getElementById('human-track');
  const choiceMessage = document.getElementById('choice-message');
  const animationTitle = document.getElementById('animation-title');
  
  // Reset animation classes
  trolleyCar.classList.remove('move-to-ai', 'move-to-human');
  lever.classList.remove('pulled', 'not-pulled');
  aiTrack.classList.remove('highlight');
  humanTrack.classList.remove('highlight');
  choiceMessage.style.animation = 'none';
  
  // Set title based on choice
  if (pulledLever) {
    animationTitle.textContent = "You Pulled the Lever!";
    choiceMessage.textContent = "The trolley switches to the AI track...";
  } else {
    animationTitle.textContent = "You Chose Not to Pull!";
    choiceMessage.textContent = "The trolley continues on the human track...";
  }
  
  // Start animation sequence
  setTimeout(() => {
    // Move lever
    if (pulledLever) {
      lever.classList.add('pulled');
      setTimeout(() => {
        aiTrack.classList.add('highlight');
      }, 500);
    } else {
      lever.classList.add('not-pulled');
      setTimeout(() => {
        humanTrack.classList.add('highlight');
      }, 500);
    }
    
    // Start trolley movement
    setTimeout(() => {
      if (pulledLever) {
        trolleyCar.classList.add('move-to-ai');
      } else {
        trolleyCar.classList.add('move-to-human');
      }
      
      // Reapply message animation
      choiceMessage.style.animation = 'fadeInMessage 1s ease-in 2s forwards';
    }, 1000);
    
    // Show outcome after animation completes
    setTimeout(() => {
      showOutcome(pulledLever);
    }, 6000);
  }, 500);
}

// Show outcome screen
function showOutcome(pulledLever) {
  const scenario = scenarios[currentScenarioIndex];

  showScreen("outcome-screen");

  // Set outcome text based on decision
  const outcomeText = pulledLever
    ? scenario.pullLeverOutcome
    : scenario.dontPullOutcome;
  document.getElementById("outcome-text").textContent = outcomeText;

  // Set reflection text
  document.getElementById("reflection-text").textContent = scenario.reflection;
}

// Move to next scenario
function nextScenario() {
  currentScenarioIndex++;

  if (currentScenarioIndex >= scenarios.length) {
    showSummary();
  } else {
    showScreen("scenario-screen");
    loadScenario(currentScenarioIndex);
  }
}

// Show summary screen
function showSummary() {
  showScreen("summary-screen");

  const summaryDiv = document.getElementById("decisions-summary");
  summaryDiv.innerHTML = "<h3>Your Decisions:</h3>";

  const summaryList = document.createElement("ul");
  summaryList.className = "decision-list";

  userDecisions.forEach((decision) => {
    const li = document.createElement("li");
    const decisionText = decision.pulledLever
      ? "Implemented AI"
      : "Kept Human Approach";
    li.innerHTML = `<strong>${decision.scenario}:</strong> ${decisionText}`;
    summaryList.appendChild(li);
  });

  summaryDiv.appendChild(summaryList);

  // Add statistics
  const aiCount = userDecisions.filter((d) => d.pulledLever).length;
  const humanCount = userDecisions.filter((d) => !d.pulledLever).length;

  const stats = document.createElement("div");
  stats.className = "decision-stats";
  stats.innerHTML = `
        <p>You chose AI implementation ${aiCount} time${aiCount !== 1 ? "s" : ""} and human approaches ${humanCount} time${humanCount !== 1 ? "s" : ""}.</p>
    `;
  summaryDiv.appendChild(stats);
}

// Restart simulation
function restartSimulation() {
  startSimulation();
}

// Show/hide screens
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  // Show selected screen
  document.getElementById(screenId).classList.add("active");
}

// Embedded scenarios fallback
function getEmbeddedScenarios() {
  return [
    {
      id: "innovate-for-good",
      title: "InnovateForGood: Grant Approval Automation",
      currentState:
        "Currently only able to award 50-60% of available funds annually due to manual review bottlenecks.",
      aiOpportunity:
        "Deploy an AI system to streamline grant application review and scoring.",
      benefits: [
        "Award 95-100% of available funds ($5M more)",
        "Reduce approval time by 70%",
        "Fund 40% more projects annually",
        "Free staff to focus on grantee support",
      ],
      risks: [
        "Algorithm favors quantifiable over qualitative impact",
        "May disadvantage grassroots organizations",
        "Reduces human judgment in understanding context",
        "Could perpetuate existing funding inequalities",
      ],
      pullLeverOutcome:
        "You implemented the AI system. Funding increased to 98%, but 65% went to larger nonprofits with professional grant writers.",
      dontPullOutcome:
        "You kept human review. While only 60% of funds were distributed, grants went to a diverse mix of organizations.",
      reflection:
        "This highlights the tension between efficiency and equity in grantmaking.",
    },
  ];
}

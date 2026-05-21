const items = [

  {
    key: "trail",
    section: "視覺空間 / 執行功能",
    title: "交替轉換測試",
    max: 1,
    instruction:
      "按 HK-MoCA 題目頁，由開始至完成進行交替連線。",
    scoring:
      "正確完成且沒有未更正錯誤得 1 分。",

    image: "images/trail-making.png"
  },

  {
    key: "cube",
    section: "視覺空間 / 執行功能",
    title: "複製圖形",
    max: 1,
    instruction:
      "請受測者照住題目頁圖形複製。",
    scoring:
      "立體、所有線齊全、沒有額外線、相對線大致平行及長度接近得 1 分。",

    image: "images/cube.png"
  },

  {
    key: "clock",
    section: "視覺空間 / 執行功能",
    title: "畫時鐘：十一點十分",
    max: 3,
    instruction:
      "請畫一個時鐘，要寫晒所有數字，並將時間調校到十一點十分。",
    scoring:
      "輪廓、數字、時分針各 1 分。",

    canvas: true
  },

  {
    key: "naming",
    section: "命名",
    title: "動物命名",
    max: 3,
    instruction:
      "由左至右指出動物圖案，請受測者命名。",
    scoring:
      "獅子、犀牛、駱駝 / 單峰駝各 1 分。",

    animalImages: true
  },

  {
    key: "digits",
    section: "專注力",
    title: "數字順背及倒背",
    max: 2,
    instruction:
      "順背：2 1 8 5 4；倒背：7 4 2。",
    scoring:
      "每一正確數列 1 分；倒背正確答案為 2-4-7。"
  },

  {
    key: "tap",
    section: "專注力",
    title: "警惕性敲桌",
    max: 1,
    instruction:
      "讀出數字列；當數字「1」出現時，受測者須敲桌。",
    scoring:
      "沒有或只有一個錯處得 1 分；兩個或以上錯處得 0 分。"
  },

  {
    key: "serial7",
    section: "專注力",
    title: "連續 7 減算",
    max: 3,
    instruction:
      "由 100 開始連續減 7：93、86、79、72、65。",
    scoring:
      "4-5 個正確得 3 分；2-3 個得 2 分；1 個得 1 分；0 個得 0 分。"
  },

  {
    key: "sentence",
    section: "語言",
    title: "重複句子",
    max: 2,
    instruction:
      "句子一：姨丈買魚腸。句子二：西施四十四歲。",
    scoring:
      "每句完全正確 1 分。"
  },

  {
    key: "fluency",
    section: "語言",
    title: "語言流暢：動物名稱",
    max: 1,
    instruction:
      "一分鐘內盡量說出動物名稱。",
    scoring:
      "正確動物名稱 11 個或以上得 1 分。"
  },

  {
    key: "abstract",
    section: "抽象",
    title: "相似點",
    max: 2,
    instruction:
      "例題：香蕉－橙。計分題：火車－單車；手錶－間尺。",
    scoring:
      "每個抽象類別答案 1 分。"
  },

  {
    key: "delayed",
    section: "延遲記憶",
    title: "五分鐘後回憶詞語",
    max: 5,
    instruction:
      "不可給提示。詞語：面孔、絲絨、教堂、雛菊、紅色。",
    scoring:
      "無提示正確回憶每詞 1 分。"
  },

  {
    key: "orientation",
    section: "定向",
    title: "日期、星期、地點、地區",
    max: 6,
    instruction:
      "日、月、年、星期、地點、地區。",
    scoring:
      "每項正確 1 分。"
  }

];

let scores = {};

items.forEach(item => {
  scores[item.key] = 0;
});

let timerInterval = null;
let seconds = 0;
let chart = null;

/* =========================
   Page Navigation
========================= */

function showPage(id) {

  document
    .querySelectorAll(".page")
    .forEach(page => {
      page.classList.remove("active");
    });

  document
    .getElementById(id)
    .classList.add("active");

  if (id === "result") {
    renderReport();
  }

  if (id === "history") {
    renderHistory();
  }

}

/* =========================
   Assessment Rendering
========================= */

function renderAssessment() {

  const area =
    document.getElementById("assessmentArea");

  area.innerHTML = "";

  items.forEach(item => {

    const div =
      document.createElement("div");

    div.className =
      "assessment-card";

    let buttons = "";

    for (let i = 0; i <= item.max; i++) {

      buttons += `
        <button
          onclick="setScore('${item.key}', ${i})"
          id="${item.key}_${i}"
        >
          ${i}
        </button>
      `;

    }

    let imageHTML = "";

    /* Trail / Cube */

    if (item.image) {

      imageHTML = `
        <img
          src="${item.image}"
          class="assessment-image"
        />
      `;

    }

    /* Animal Images */

    if (item.animalImages) {

      imageHTML = `
        <div class="moca-image-group">

          <img src="images/lion.png" />
          <img src="images/rhino.png" />
          <img src="images/camel.png" />

        </div>
      `;

    }

    /* Drawing Canvas */

    if (item.canvas) {

      imageHTML = `
        <canvas id="clockCanvas"></canvas>

        <button onclick="clearCanvas()">
          清除畫板
        </button>
      `;

    }

    div.innerHTML = `

      <p class="item-title">
        ${item.section}
      </p>

      <h3>
        ${item.title}
        / ${item.max} 分
      </h3>

      <p>
        ${item.instruction}
      </p>

      <p class="note">
        <strong>計分：</strong>
        ${item.scoring}
      </p>

      ${imageHTML}

      <div class="score-options">
        ${buttons}
      </div>

      <textarea
        id="note_${item.key}"
        placeholder="答案 / 錯誤類型 / 提示後反應"
      ></textarea>

    `;

    area.appendChild(div);

  });

  setupCanvas();

}

/* =========================
   Scoring
========================= */

function setScore(key, value) {

  scores[key] = value;

  updateScore();

  autoSave();

  const item =
    items.find(i => i.key === key);

  for (let i = 0; i <= item.max; i++) {

    document
      .getElementById(`${key}_${i}`)
      .classList.remove("selected");

  }

  document
    .getElementById(`${key}_${value}`)
    .classList.add("selected");

}

function getTotal() {

  return Object
    .values(scores)
    .reduce((sum, value) => {
      return sum + Number(value);
    }, 0);

}

function updateScore() {

  const total = getTotal();

  document
    .getElementById("totalScore")
    .innerText = total;

  document
    .getElementById("percentile")
    .innerText =
      getPercentile(total);

}

/* =========================
   Percentile
========================= */

function getPercentile(score) {

  const age =
    Number(document.getElementById("age").value);

  const edu =
    Number(document.getElementById("education").value);

  if (!age && age !== 0) {
    return "請輸入年齡及教育年數";
  }

  if (score <= 20) {
    return "建議跟進（非診斷）";
  }

  if (score <= 25) {
    return "建議觀察";
  }

  return "正常範圍";

}

/* =========================
   Report
========================= */

function renderReport() {

  const total =
    getTotal();

  const report =
    document.getElementById("report");

  report.innerHTML = `

    <h2>
      ${document.getElementById("name").value}
    </h2>

    <p>
      總分：
      <strong>${total}/30</strong>
    </p>

    <p>
      ${getPercentile(total)}
    </p>

    <hr>

    ${items.map(item => `
      <p>
        ${item.title}
        :
        ${scores[item.key]}
        / ${item.max}
      </p>
    `).join("")}

    <div class="warn">

      此結果只作臨床參考，
      不能單獨作為診斷。

    </div>

  `;

  drawChart();

}

/* =========================
   LocalStorage
========================= */

function saveRecord() {

  const records =
    JSON.parse(
      localStorage.getItem("moca_records")
      || "[]"
    );

  records.unshift({

    name:
      document.getElementById("name").value,

    total:
      getTotal(),

    date:
      document.getElementById("date").value,

    scores

  });

  localStorage.setItem(
    "moca_records",
    JSON.stringify(records)
  );

  alert("已儲存紀錄");

}

function renderHistory() {

  const keyword =
    document.getElementById("search")
    ?.value
    ?.toLowerCase()
    || "";

  const records =
    JSON.parse(
      localStorage.getItem("moca_records")
      || "[]"
    );

  const filtered =
    records.filter(record =>
      JSON.stringify(record)
        .toLowerCase()
        .includes(keyword)
    );

  document.getElementById("historyList")
    .innerHTML = filtered.map(record => `

      <div class="history-item">

        <h3>
          ${record.name}
        </h3>

        <p>
          ${record.date}
          ｜ ${record.total}/30
        </p>

      </div>

    `).join("");

}

/* =========================
   Export Word
========================= */

function exportWord() {

  renderReport();

  const content =
    document.getElementById("report")
    .innerHTML;

  const html = `
    <html>
      <body>
        ${content}
      </body>
    </html>
  `;

  const blob =
    new Blob(
      ["\\ufeff", html],
      { type: "application/msword" }
    );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "HK-MoCA_Report.doc";

  link.click();

}

/* =========================
   Timer
========================= */

function toggleTimer() {

  if (timerInterval) {

    clearInterval(timerInterval);

    timerInterval = null;

  } else {

    timerInterval =
      setInterval(() => {

        seconds++;

        const min =
          String(Math.floor(seconds / 60))
          .padStart(2, "0");

        const sec =
          String(seconds % 60)
          .padStart(2, "0");

        document
          .getElementById("timer")
          .innerText =
            `${min}:${sec}`;

      }, 1000);

  }

}

function resetTimer() {

  clearInterval(timerInterval);

  timerInterval = null;

  seconds = 0;

  document
    .getElementById("timer")
    .innerText = "00:00";

}

/* =========================
   Dark Mode
========================= */

function toggleDarkMode() {

  document.body.classList.toggle("dark");

}

/* =========================
   Large Text
========================= */

function toggleLargeText() {

  document.body.classList.toggle("large-text");

}

/* =========================
   Canvas Drawing
========================= */

function setupCanvas() {

  const canvas =
    document.getElementById("clockCanvas");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  canvas.width = 900;
  canvas.height = 400;

  let drawing = false;

  function start(e) {

    drawing = true;

    draw(e);

  }

  function end() {

    drawing = false;

    ctx.beginPath();

  }

  function draw(e) {

    if (!drawing) return;

    const rect =
      canvas.getBoundingClientRect();

    const x =
      (e.clientX || e.touches[0].clientX)
      - rect.left;

    const y =
      (e.clientY || e.touches[0].clientY)
      - rect.top;

    ctx.lineWidth = 3;

    ctx.lineCap = "round";

    ctx.strokeStyle = "#111827";

    ctx.lineTo(x, y);

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(x, y);

  }

  canvas.addEventListener("mousedown", start);

  canvas.addEventListener("mouseup", end);

  canvas.addEventListener("mousemove", draw);

  canvas.addEventListener("touchstart", start);

  canvas.addEventListener("touchend", end);

  canvas.addEventListener("touchmove", draw);

}

function clearCanvas() {

  const canvas =
    document.getElementById("clockCanvas");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

}

/* =========================
   Chart
========================= */

function drawChart() {

  const records =
    JSON.parse(
      localStorage.getItem("moca_records")
      || "[]"
    )
    .reverse();

  const ctx =
    document.getElementById("chart");

  if (!ctx) return;

  if (chart) {
    chart.destroy();
  }

  chart =
    new Chart(ctx, {

      type: "line",

      data: {

        labels:
          records.map(r => r.date),

        datasets: [{

          label: "HK-MoCA 總分",

          data:
            records.map(r => r.total),

          tension: 0.25

        }]

      },

      options: {

        scales: {

          y: {
            min: 0,
            max: 30
          }

        }

      }

    });

}

/* =========================
   Auto Save
========================= */

function autoSave() {

  localStorage.setItem(
    "moca_draft",
    JSON.stringify(scores)
  );

}

/* =========================
   Clear
========================= */

function clearCurrent() {

  if (
    confirm("確定清除目前評估？")
  ) {

    localStorage.removeItem(
      "moca_draft"
    );

    location.reload();

  }

}

/* =========================
   Init
========================= */

document.getElementById("date")
  .valueAsDate = new Date();

renderAssessment();

updateScore();

renderHistory();
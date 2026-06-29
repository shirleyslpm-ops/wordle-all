const MAX_ATTEMPTS = 10;
const COLOR = {
  correct: "correct",
  present: "present",
  absent: "absent",
};

const LEGACY_WORDS = [
  {
    word: "班门弄斧",
    pinyin: ["ban", "men", "nong", "fu"],
    initial: ["b", "m", "n", "f"],
    final: ["an", "en", "ong", "u"],
    tone: [1, 2, 4, 3],
  },
  {
    word: "水落石出",
    pinyin: ["shui", "luo", "shi", "chu"],
    initial: ["sh", "l", "sh", "ch"],
    final: ["ui", "uo", "i", "u"],
    tone: [3, 4, 2, 1],
  },
  {
    word: "巧夺天工",
    pinyin: ["qiao", "duo", "tian", "gong"],
    initial: ["q", "d", "t", "g"],
    final: ["iao", "uo", "ian", "ong"],
    tone: [3, 2, 1, 1],
  },
  {
    word: "武运昌隆",
    pinyin: ["wu", "yun", "chang", "long"],
    initial: ["w", "y", "ch", "l"],
    final: ["u", "un", "ang", "ong"],
    tone: [3, 4, 1, 2],
  },
  {
    word: "画蛇添足",
    pinyin: ["hua", "she", "tian", "zu"],
    initial: ["h", "sh", "t", "z"],
    final: ["ua", "e", "ian", "u"],
    tone: [4, 2, 1, 2],
  },
  {
    word: "井底之蛙",
    pinyin: ["jing", "di", "zhi", "wa"],
    initial: ["j", "d", "zh", "w"],
    final: ["ing", "i", "i", "a"],
    tone: [3, 3, 1, 1],
  },
  {
    word: "亡羊补牢",
    pinyin: ["wang", "yang", "bu", "lao"],
    initial: ["w", "y", "b", "l"],
    final: ["ang", "ang", "u", "ao"],
    tone: [2, 2, 3, 2],
  },
  {
    word: "守株待兔",
    pinyin: ["shou", "zhu", "dai", "tu"],
    initial: ["sh", "zh", "d", "t"],
    final: ["ou", "u", "ai", "u"],
    tone: [3, 1, 4, 4],
  },
  {
    word: "刻舟求剑",
    pinyin: ["ke", "zhou", "qiu", "jian"],
    initial: ["k", "zh", "q", "j"],
    final: ["e", "ou", "iu", "ian"],
    tone: [4, 1, 2, 4],
  },
  {
    word: "胸有成竹",
    pinyin: ["xiong", "you", "cheng", "zhu"],
    initial: ["x", "y", "ch", "zh"],
    final: ["iong", "ou", "eng", "u"],
    tone: [1, 3, 2, 2],
  },
  {
    word: "一箭双雕",
    pinyin: ["yi", "jian", "shuang", "diao"],
    initial: ["y", "j", "sh", "d"],
    final: ["i", "ian", "uang", "iao"],
    tone: [1, 4, 1, 1],
  },
  {
    word: "雪中送炭",
    pinyin: ["xue", "zhong", "song", "tan"],
    initial: ["x", "zh", "s", "t"],
    final: ["ue", "ong", "ong", "an"],
    tone: [3, 1, 4, 4],
  },
  {
    word: "杯弓蛇影",
    pinyin: ["bei", "gong", "she", "ying"],
    initial: ["b", "g", "sh", "y"],
    final: ["ei", "ong", "e", "ing"],
    tone: [1, 1, 2, 3],
  },
  {
    word: "叶公好龙",
    pinyin: ["ye", "gong", "hao", "long"],
    initial: ["y", "g", "h", "l"],
    final: ["e", "ong", "ao", "ong"],
    tone: [4, 1, 4, 2],
  },
  {
    word: "狐假虎威",
    pinyin: ["hu", "jia", "hu", "wei"],
    initial: ["h", "j", "h", "w"],
    final: ["u", "ia", "u", "ei"],
    tone: [2, 3, 3, 1],
  },
  {
    word: "掩耳盗铃",
    pinyin: ["yan", "er", "dao", "ling"],
    initial: ["y", "", "d", "l"],
    final: ["an", "er", "ao", "ing"],
    tone: [3, 3, 4, 2],
  },
  {
    word: "滥竽充数",
    pinyin: ["lan", "yu", "chong", "shu"],
    initial: ["l", "y", "ch", "sh"],
    final: ["an", "u", "ong", "u"],
    tone: [4, 2, 1, 4],
  },
  {
    word: "自相矛盾",
    pinyin: ["zi", "xiang", "mao", "dun"],
    initial: ["z", "x", "m", "d"],
    final: ["i", "iang", "ao", "un"],
    tone: [4, 1, 2, 4],
  },
  {
    word: "东施效颦",
    pinyin: ["dong", "shi", "xiao", "pin"],
    initial: ["d", "sh", "x", "p"],
    final: ["ong", "i", "iao", "in"],
    tone: [1, 1, 4, 2],
  },
  {
    word: "惊弓之鸟",
    pinyin: ["jing", "gong", "zhi", "niao"],
    initial: ["j", "g", "zh", "n"],
    final: ["ing", "ong", "i", "iao"],
    tone: [1, 1, 1, 3],
  },
];

const WORD_BANK = window.WORD_BANK || LEGACY_WORDS.map((entry) => entry.word);
const WORDS = WORD_BANK.map(createWordEntry);

const board = document.querySelector("#board");
const form = document.querySelector("#guessForm");
const input = document.querySelector("#guessInput");
const submitButton = document.querySelector("#submitButton");
const restartButton = document.querySelector("#restartButton");
const attemptStatus = document.querySelector("#attemptStatus");
const message = document.querySelector("#message");
const resultDialog = document.querySelector("#resultDialog");
const resultTitle = document.querySelector("#resultTitle");
const resultAttempts = document.querySelector("#resultAttempts");
const resultSession = document.querySelector("#resultSession");
const meaningBlock = document.querySelector("#meaningBlock");
const meaningText = document.querySelector("#meaningText");
const resultAchievementList = document.querySelector("#resultAchievementList");
const achievementCount = document.querySelector("#achievementCount");
const achievementList = document.querySelector("#achievementList");
const playAgainButton = document.querySelector("#playAgainButton");
const closeResultButton = document.querySelector("#closeResultButton");

const characterIndex = buildCharacterIndex(WORDS);
const sessionStats = {
  startedAt: Date.now(),
  gameStartedAt: Date.now(),
  games: 0,
  inputAnswers: 0,
  losses: 0,
  totalGameSeconds: 0,
  wins: 0,
  currentStreak: 0,
  bestStreak: 0,
  earnedAchievementKeys: new Set(),
};
let answer = null;
let guesses = [];
let gameOver = false;
let previousAnswerWord = "";
let currentResult = null;

function buildCharacterIndex(words) {
  const index = new Map();

  for (const entry of words) {
    [...entry.word].forEach((char, position) => {
      if (!index.has(char)) {
        index.set(char, {
          pinyin: entry.pinyin[position],
          initial: entry.initial[position],
          final: entry.final[position],
          tone: entry.tone[position],
        });
      }
    });
  }

  return index;
}

function startGame() {
  let nextAnswer = WORDS[Math.floor(Math.random() * WORDS.length)];

  if (WORDS.length > 1) {
    while (nextAnswer.word === previousAnswerWord) {
      nextAnswer = WORDS[Math.floor(Math.random() * WORDS.length)];
    }
  }

  answer = nextAnswer;
  previousAnswerWord = answer.word;
  guesses = [];
  gameOver = false;
  currentResult = null;
  sessionStats.gameStartedAt = Date.now();
  input.value = "";
  input.disabled = false;
  submitButton.disabled = false;
  hideResultDialog();
  setMessage("输入一个四字词语开始。");
  renderBoard();
  input.focus();
}

function submitGuess(rawInput) {
  if (gameOver) return;

  const guessWord = extractGuessWord(rawInput);
  const validation = validateGuess(guessWord);

  if (!validation.ok) {
    setMessage(validation.message, true);
    return;
  }

  const guessEntry = makeGuessEntry(guessWord);
  const score = scoreGuess(guessEntry, answer);
  const unknownChars = getUnknownChars(guessWord);

  guesses.push({ entry: guessEntry, score });
  sessionStats.inputAnswers += 1;
  input.value = "";

  const isWin = score.word.every((state) => state === COLOR.correct);
  const isLoss = guesses.length >= MAX_ATTEMPTS && !isWin;

  if (isWin) {
    gameOver = true;
    setMessage(`猜中了，答案是「${answer.word}」。`);
  } else if (isLoss) {
    gameOver = true;
    setMessage("次数用完了，本局结束。");
  } else if (unknownChars.length > 0) {
    const remaining = MAX_ATTEMPTS - guesses.length;
    setMessage(`已记录，本轮还剩 ${remaining} 次机会。未收录「${unknownChars.join("、")}」的读音，拼音提示以 ? 显示。`);
  } else {
    const remaining = MAX_ATTEMPTS - guesses.length;
    setMessage(`已记录，本轮还剩 ${remaining} 次机会。`);
  }

  renderBoard();

  if (isWin || isLoss) {
    finishGame({ won: isWin });
  }
}

function extractGuessWord(value) {
  const chineseChars = value.match(/[\u4e00-\u9fff]/g) || [];
  return chineseChars.slice(0, 4).join("");
}

function validateGuess(value) {
  if ([...value].length !== 4) {
    return { ok: false, message: "请输入至少四个汉字；系统会读取前四个汉字。" };
  }

  return { ok: true };
}

function makeGuessEntry(word) {
  const knownWord = WORDS.find((entry) => entry.word === word);
  if (knownWord) return knownWord;

  const chars = [...word];
  const pronunciations = chars.map(getPronunciation);

  return {
    word,
    pinyin: pronunciations.map((item) => item.pinyin),
    initial: pronunciations.map((item) => item.initial),
    final: pronunciations.map((item) => item.final),
    tone: pronunciations.map((item) => item.tone),
  };
}

function createWordEntry(word) {
  const chars = [...word];
  const pronunciations = chars.map(getPronunciationFromPinyinApi);

  return {
    word,
    pinyin: pronunciations.map((item) => item.pinyin),
    initial: pronunciations.map((item) => item.initial),
    final: pronunciations.map((item) => item.final),
    tone: pronunciations.map((item) => item.tone),
  };
}

function getUnknownChars(word) {
  return [...new Set([...word].filter((char) => !getPronunciation(char).pinyin))];
}

function getPronunciation(char) {
  if (characterIndex.has(char)) return characterIndex.get(char);

  return getPronunciationFromPinyinApi(char);
}

function getPronunciationFromPinyinApi(char) {
  const pinyinApi = globalThis.pinyinPro;
  if (!pinyinApi?.pinyin) {
    return { pinyin: null, initial: null, final: null, tone: null };
  }

  const numbered = pinyinApi.pinyin(char, {
    toneType: "num",
    type: "array",
    nonZh: "removed",
  })[0];

  if (!numbered) {
    return { pinyin: null, initial: null, final: null, tone: null };
  }

  const toneMatch = numbered.match(/[0-5]$/);
  const tone = toneMatch ? Number(toneMatch[0]) : 0;
  const pinyin = numbered.replace(/[0-5]$/, "");
  const initial = pinyinApi.pinyin(char, {
    pattern: "initial",
    toneType: "none",
    type: "array",
    nonZh: "removed",
  })[0] ?? "";
  const final = pinyinApi.pinyin(char, {
    pattern: "final",
    toneType: "none",
    type: "array",
    nonZh: "removed",
  })[0] ?? "";

  return { pinyin, initial, final, tone };
}

function scoreGuess(guessEntry, answerEntry) {
  return {
    word: scoreProperty([...guessEntry.word], [...answerEntry.word]),
    pinyin: scoreProperty(guessEntry.pinyin, answerEntry.pinyin),
    initial: scoreProperty(guessEntry.initial, answerEntry.initial),
    final: scoreProperty(guessEntry.final, answerEntry.final),
    tone: scoreProperty(guessEntry.tone, answerEntry.tone),
  };
}

function scoreProperty(guessValues, answerValues) {
  const result = Array(guessValues.length).fill(COLOR.absent);
  const remaining = new Map();

  answerValues.forEach((value, index) => {
    if (guessValues[index] === value) {
      result[index] = COLOR.correct;
      return;
    }

    remaining.set(value, (remaining.get(value) || 0) + 1);
  });

  guessValues.forEach((value, index) => {
    if (result[index] === COLOR.correct) return;

    const count = remaining.get(value) || 0;
    if (count > 0) {
      result[index] = COLOR.present;
      remaining.set(value, count - 1);
    }
  });

  return result;
}

function renderBoard() {
  attemptStatus.textContent = `${guesses.length} / ${MAX_ATTEMPTS}`;
  board.innerHTML = "";

  guesses.forEach((guess) => {
    board.appendChild(renderGuessRow(guess));
  });

  if (gameOver) {
    input.disabled = true;
    submitButton.disabled = true;
  }
}

function renderGuessRow(guess) {
  const row = document.createElement("div");
  row.className = "guess-row";

  [...guess.entry.word].forEach((char, index) => {
    const tile = document.createElement("div");
    tile.className = `tile ${guess.score.word[index]}`;
    tile.setAttribute("aria-label", buildTileLabel(guess, char, index));

    const hanzi = document.createElement("div");
    hanzi.className = "hanzi";
    hanzi.textContent = char;

    const partLine = document.createElement("div");
    partLine.className = "part-line";
    appendBadgeIfVisible(partLine, displayInitial(guess.entry.initial[index]), guess.score.initial[index]);
    partLine.appendChild(makeBadge(displayValue(guess.entry.final[index]), guess.score.final[index]));
    partLine.appendChild(makeBadge(displayValue(guess.entry.tone[index]), guess.score.tone[index]));

    tile.append(hanzi, partLine);
    row.appendChild(tile);
  });

  return row;
}

function makeBadge(text, state) {
  const badge = document.createElement("span");
  badge.className = `badge ${state}`;
  badge.textContent = text;
  return badge;
}

function appendBadgeIfVisible(parent, text, state) {
  if (text === "") return;
  parent.appendChild(makeBadge(text, state));
}

function buildTileLabel(guess, char, index) {
  return `${char}，拼音 ${displayPinyin(guess.entry.pinyin[index], guess.entry.tone[index])}，声母 ${displayInitialForLabel(
    guess.entry.initial[index],
  )}，韵母 ${displayValue(guess.entry.final[index])}，声调 ${displayValue(guess.entry.tone[index])}`;
}

function displayPinyin(pinyin, tone) {
  if (pinyin === null || tone === null) return "?";
  return `${pinyin}${tone}`;
}

function displayValue(value) {
  return value === null ? "?" : String(value);
}

function displayInitial(initial) {
  if (initial === null) return "?";
  return initial || "";
}

function displayInitialForLabel(initial) {
  if (initial === null) return "?";
  return initial || "无声母";
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function finishGame({ won }) {
  const answerContent = getIdiomContent(answer.word);
  const encounterAchievement = won && isEncounterContent(answerContent) ? getEncounterAchievement(answer.word) : null;
  sessionStats.games += 1;
  sessionStats.totalGameSeconds += getCurrentGameElapsedSeconds();

  if (won) {
    sessionStats.wins += 1;
    sessionStats.currentStreak += 1;
    sessionStats.bestStreak = Math.max(sessionStats.bestStreak, sessionStats.currentStreak);
  } else {
    sessionStats.losses += 1;
    sessionStats.currentStreak = 0;
  }

  const achievements = getAchievements();
  if (encounterAchievement) {
    achievements.unshift(encounterAchievement);
  }
  const newAchievements = achievements.filter((achievement) => !sessionStats.earnedAchievementKeys.has(achievement.key));
  achievements.forEach((achievement) => sessionStats.earnedAchievementKeys.add(achievement.key));

  currentResult = {
    won,
    answer: answer.word,
    attempts: guesses.length,
    achievements,
    newAchievements,
    elapsedSeconds: getSessionElapsedSeconds(),
    metrics: getSessionMetrics(),
  };

  renderAchievementPanel();
  showResultDialog(currentResult);
}

function getAchievements() {
  const metrics = getSessionMetrics();
  const rules = [
    ["quietOperator", metrics.sessionMinutes <= 20 && metrics.wins >= 4 && metrics.caseCost !== null && metrics.caseCost <= 2.5],
    ["paidLinguist", metrics.sessionMinutes >= 60 && metrics.wins >= 10 && metrics.caseCost !== null && metrics.caseCost <= 5],
    ["slackingWriter", metrics.sessionMinutes >= 120 && metrics.wins >= 8 && metrics.caseCost !== null && metrics.caseCost >= 4 && metrics.caseCost <= 7],
    ["deskGollum", metrics.sessionMinutes >= 60 && metrics.inputAnswers <= 8],
    ["stubbornRookie", metrics.inputAnswers >= 40 && metrics.wins <= 3],
    ["desertPioneer", metrics.games >= 3 && metrics.wins === 0],
    ["bossBehind", metrics.sessionMinutes <= 8 && metrics.inputAnswers >= 8],
    ["preciseSlacker", metrics.sessionMinutes >= 10 && metrics.sessionMinutes <= 45 && metrics.wins >= 3 && metrics.caseCost !== null && metrics.caseCost <= 3.5],
    ["streakSlacker", metrics.bestStreak >= 5],
    ["idiomGuard", metrics.losses >= 5 && metrics.inputAnswers >= 35],
    ["tempWorker", metrics.wins >= 1 && metrics.wins <= 2 && metrics.caseCost !== null && metrics.caseCost >= 6],
    ["checkinSlacker", metrics.games >= 5 && metrics.successRate >= 0.3 && metrics.successRate <= 0.6],
  ];
  const matched = rules.filter(([, passed]) => passed).map(([key]) => getAchievementContent(key));

  return matched.length > 0 ? matched : [getAchievementContent("normalWorker")];
}

function getAchievementContent(key) {
  if (key.startsWith("encounter:")) {
    return {
      key,
      title: `奇遇！${key.slice("encounter:".length) || "奇遇名字占位"}`,
      description: "",
    };
  }

  const contents = globalThis.ACHIEVEMENT_CONTENTS || {};
  return {
    key,
    title: contents[key]?.title || key,
    description: contents[key]?.description || "成就描述待补充。",
  };
}

function getEncounterAchievement(word) {
  return {
    key: `encounter:${word}`,
    title: `奇遇！${word}`,
    description: "",
  };
}

function isEncounterContent(content) {
  return content.type === "encounter";
}

function getSessionElapsedSeconds() {
  return Math.floor((Date.now() - sessionStats.startedAt) / 1000);
}

function getCurrentGameElapsedSeconds() {
  return Math.max(0, Math.floor((Date.now() - sessionStats.gameStartedAt) / 1000));
}

function getSessionMetrics() {
  const games = sessionStats.games;
  const wins = sessionStats.wins;
  const inputAnswers = sessionStats.inputAnswers;

  return {
    averageAttempts: games > 0 ? inputAnswers / games : 0,
    averageGameSeconds: games > 0 ? sessionStats.totalGameSeconds / games : 0,
    bestStreak: sessionStats.bestStreak,
    caseCost: wins > 0 ? inputAnswers / wins : null,
    currentStreak: sessionStats.currentStreak,
    games,
    inputAnswers,
    losses: sessionStats.losses,
    sessionMinutes: getSessionElapsedSeconds() / 60,
    sessionSeconds: getSessionElapsedSeconds(),
    successRate: games > 0 ? wins / games : 0,
    totalGameSeconds: sessionStats.totalGameSeconds,
    wins,
  };
}

function showResultDialog(result) {
  const content = getIdiomContent(result.answer);
  const modalAchievements = result.newAchievements.length > 0 ? result.newAchievements : result.achievements;

  resultTitle.textContent = getResultTitle(result, content);
  resultAttempts.textContent = `${result.attempts} / ${MAX_ATTEMPTS}`;
  resultSession.textContent = `本次会话 ${sessionStats.wins} 胜 / ${sessionStats.games} 局`;
  renderAchievementItems(resultAchievementList, modalAchievements);

  if (result.won) {
    const meaning = content.meaning || (isEncounterContent(content) ? "" : "释义待补充");
    meaningBlock.hidden = meaning === "";
    meaningText.textContent = meaning;
  } else {
    meaningBlock.hidden = true;
    meaningText.textContent = "";
  }

  resultDialog.hidden = false;
}

function getResultTitle(result, content) {
  if (!result.won) return "很遗憾，机会用光了";
  if (isEncounterContent(content)) return `触发奇遇【${result.answer}】`;
  return "猜中了";
}

function renderAchievementPanel() {
  const achievements = [...sessionStats.earnedAchievementKeys].map(getAchievementContent);
  achievementCount.textContent = String(achievements.length);

  if (achievements.length === 0) {
    achievementList.innerHTML = '<p class="empty-achievement">本次会话的称号会显示在这里。</p>';
    return;
  }

  renderAchievementItems(achievementList, achievements);
}

function renderAchievementItems(container, achievements) {
  container.innerHTML = "";

  achievements.forEach((achievement) => {
    const item = document.createElement("div");
    item.className = "achievement-item";

    const title = document.createElement("strong");
    title.textContent = achievement.title;

    const description = document.createElement("p");
    description.textContent = achievement.description;

    item.appendChild(title);
    if (achievement.description) {
      item.appendChild(description);
    }
    container.appendChild(item);
  });
}

function hideResultDialog() {
  if (!resultDialog) return;
  resultDialog.hidden = true;
}

function getIdiomContent(word) {
  return (globalThis.IDIOM_CONTENTS || {})[word] || {};
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitGuess(input.value);
});

restartButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
closeResultButton.addEventListener("click", hideResultDialog);
resultDialog.addEventListener("click", (event) => {
  if (event.target === resultDialog) {
    hideResultDialog();
  }
});

window.HanziWordle = {
  WORDS,
  getAchievements,
  getSessionMetrics,
  scoreGuess,
  scoreProperty,
  sessionStats,
  startGame,
  submitGuess,
};

startGame();

// DOM要素の取得
const topPage = document.getElementById('top-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');

const startButton = document.getElementById('start-button');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const retryButton = document.getElementById('retry-button');
const shareButton = document.getElementById('share-button');

const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');

const resultType = document.getElementById('result-type');
const resultPersonality = document.getElementById('result-personality');
const resultStrengths = document.getElementById('result-strengths');
const resultWeaknesses = document.getElementById('result-weaknesses');
const resultGoodMatch = document.getElementById('result-good-match');
const resultBadMatch = document.getElementById('result-bad-match');
const resultWorkAdvice = document.getElementById('result-work-advice');

// --- データセクション ---
// 診断の質問 (20問)
// 各質問は、どの指標(E/I, S/N, T/F, J/P)を測るか、
// 「はい」がどちらの特性に対応するかを定義します。
const questions = [
    // E(外向) / I(内向)
    { text: "初対面の人と話すのが好きだ", trait: "EI", yes: "E" },
    { text: "一人で過ごす時間よりも、大勢でいる方がエネルギーが湧く", trait: "EI", yes: "E" },
    { text: "週末は家で静かに過ごしたい", trait: "EI", yes: "I" },
    { text: "注目を浴びるのは苦手だ", trait: "EI", yes: "I" },
    { text: "考える前にまず行動することが多い", trait: "EI", yes: "E" },
    // S(感覚) / N(直観)
    { text: "現実的で具体的な事実に焦点を当てる", trait: "SN", yes: "S" },
    { text: "未来の可能性や抽象的なアイデアについて考えるのが好きだ", trait: "SN", yes: "N" },
    { text: "物事の細かい部分に気づきやすい", trait: "SN", yes: "S" },
    { text: "理論や概念的な話に興味がある", trait: "SN", yes: "N" },
    { text: "経験から学ぶことを重視する", trait: "SN", yes: "S" },
    // T(思考) / F(感情)
    { text: "決断を下すときは、論理と客観性を重視する", trait: "TF", yes: "T" },
    { text: "他人の感情に共感し、調和を大切にする", trait: "TF", yes: "F" },
    { text: "批判や議論を個人的に受け止めない", trait: "TF", yes: "T" },
    { text: "人助けをすることに喜びを感じる", trait: "TF", yes: "F" },
    { text: "効率性を人の気持ちより優先することがある", trait: "TF", yes: "T" },
    // J(判断) / P(知覚)
    { text: "計画を立てて、それに従うのが好きだ", trait: "JP", yes: "J" },
    { text: "柔軟で、新しい選択肢が出てくることを歓迎する", trait: "JP", yes: "P" },
    { text: "物事を早めに終わらせて、安心したい", trait: "JP", yes: "J" },
    { text: "締め切り間近にならないと、やる気が出ないことが多い", trait: "JP", yes: "P" },
    { text: "整理整頓された環境を好む", trait: "JP", yes: "J" },
];

// 診断結果のデータ (プレースホルダー)
// ここに各MBTIタイプごとの詳細な説明を追加します。
const results = {
    "ISTJ": { personality: "【管理者】現実的で責任感が強く、一度決めたことは最後までやり遂げる真面目な努力家です。", strengths: "誠実、計画的、責任感が強い、事実を重視する", weaknesses: "頑固、変化に弱い、他人の感情に鈍感なことがある", goodMatch: "ESFP, ESTP", badMatch: "INFP, ENFP", workAdvice: "ルールや手順が明確な環境で力を発揮します。細部への注意力を活かせる仕事が向いています。" },
    "ISFJ": { personality: "【擁護者】献身的で心温かく、周りの人々を支えることに喜びを感じる縁の下の力持ちです。", strengths: "献身的、忠実、思いやりがある、観察力が鋭い", weaknesses: "自己主張が苦手、変化を嫌う、過度に内向的になることがある", goodMatch: "ESTP, ESFP", badMatch: "INTP, ENTP", workAdvice: "人をサポートする役割や、安定した環境での仕事で安心感を得られます。感謝されるとモチベーションが上がります。" },
    "INFJ": { personality: "【提唱者】理想主義で神秘的。強い信念と共感力を持ち、世界をより良い場所にしたいと願っています。", strengths: "洞察力が鋭い、共感力が高い、理想主義、創造的", weaknesses: "完璧主義、燃え尽きやすい、批判に敏感", goodMatch: "ENFP, ENTP", badMatch: "ESTJ, ISTJ", workAdvice: "自分の価値観に合った仕事や、人の成長を助ける分野でやりがいを感じます。一人で深く考える時間も大切に。" },
    "INTJ": { personality: "【建築家】戦略的で想像力豊か。複雑な問題解決を得意とし、常に知識を追い求める野心家です。", strengths: "戦略的、独立的、知的好奇心が強い、決断力がある", weaknesses: "傲慢に見られがち、感情表現が苦手、非現実的な期待を持つことがある", goodMatch: "ENFP, ENTP", badMatch: "ESFJ, ISFJ", workAdvice: "複雑な問題を解決する能力や、長期的な視点を活かせる仕事が向いています。自律性が尊重される環境を求めます。" },
    "ISTP": { personality: "【巨匠】大胆で実践的な探求者。好奇心旺盛で、手と目を使って物事を探求し、理解することを楽しみます。", strengths: "論理的、実践的、冷静、危機管理能力が高い", weaknesses: "衝動的、長期的な計画が苦手、感情を軽視しがち", goodMatch: "ESFJ, ESTJ", badMatch: "INFJ, ENFJ", workAdvice: "手を動かして物事を解決する仕事や、自由度の高い環境で能力を発揮します。ルーティンワークは苦手かもしれません。" },
    "ISFP": { personality: "【冒険家】柔軟で魅力的な芸術家。常に新しい体験を求め、五感で世界を感じることを楽しみます。", strengths: "芸術的センス、好奇心旺盛、柔軟、今を生きる", weaknesses: "計画性がない、対立を避ける、飽きっぽい", goodMatch: "ENFJ, ESFJ, ESTJ", badMatch: "INTJ, ENTJ", workAdvice: "自分のペースで働ける、創造性を発揮できる仕事が向いています。美的センスを活かせる分野で輝きます。" },
    "INFP": { personality: "【仲介者】詩的で親切な利他主義者。自分の価値観と信念に忠実で、人々の中にある善意を信じています。", strengths: "共感力が高い、創造的、理想主義、忠実", weaknesses: "非現実的、自己批判的、感情に流されやすい", goodMatch: "ENFJ, ENTJ", badMatch: "ISTJ, ESTJ", workAdvice: "人の役に立つ仕事や、自分の価値観を表現できるクリエイティブな分野でやりがいを感じます。" },
    "INTP": { personality: "【論理学者】貪欲な知識を持つ革新家。独自の視点からパターンを見つけ出し、論理的な分析を得意とします。", strengths: "分析力が高い、独創的、知的好奇心が強い、客観的", weaknesses: "社会的な交流が苦手、規則や締め切りを無視しがち、感情に鈍感", goodMatch: "ENTJ, ESTJ", badMatch: "ISFJ, ESFJ", workAdvice: "専門知識を深められる研究職や、複雑なシステムを扱う仕事で能力を発揮します。アイデアを自由に探求できる環境が理想です。" },
    "ESTP": { personality: "【起業家】賢く、エネルギッシュで鋭い知覚を持つ。リスクを恐れず、行動することで学ぶ実践者です。", strengths: "行動力がある、社交的、現実的、問題解決能力が高い", weaknesses: "衝動的、忍耐力がない、ルールを軽視しがち", goodMatch: "ISFJ, ISTJ", badMatch: "INFP, INFJ", workAdvice: "スピード感があり、変化に富んだ環境で輝きます。交渉や営業など、人と直接関わる仕事で力を発揮します。" },
    "ESFP": { personality: "【エンターテイナー】自発的でエネルギッシュな熱狂家。人々を楽しませ、その場の中心になることが大好きです。", strengths: "社交的、楽観的、美的センスがある、実践的", weaknesses: "計画性がない、集中力が続かない、対立を嫌う", goodMatch: "ISTJ, ISFJ", badMatch: "INTP, INTJ", workAdvice: "人を楽しませる仕事や、活気のある職場でやりがいを感じます。単調な作業よりも、変化のある仕事が向いています。" },
    "ENFP": { personality: "【広報運動家】熱心で創造的な社交家。自由な精神を持ち、人々と感情的なつながりを築くことを楽しみます。", strengths: "情熱的、コミュニケーション能力が高い、創造的、好奇心旺盛", weaknesses: "飽きっぽい、集中力が散漫になりがち、ストレスに弱い", goodMatch: "INFJ, INTJ", badMatch: "ISTJ, ISFJ", workAdvice: "新しいアイデアを生み出したり、人と協力して何かを成し遂げる仕事で輝きます。自由な発想が歓迎される環境が理想です。" },
    "ENTP": { personality: "【討論者】賢く好奇心旺盛な思想家。知的な挑戦を好み、常識に疑問を投げかけることを恐れません。", strengths: "頭の回転が速い、カリスマ性がある、議論が好き、独創的", weaknesses: "無神経なことがある、飽きっぽい、細かい作業が苦手", goodMatch: "INFJ, INTJ", badMatch: "ISFJ, ESFJ", workAdvice: "新しい戦略を立てたり、ブレインストーミングでアイデアを出す場面で力を発揮します。常に知的な刺激がある環境を求めます。" },
    "ESTJ": { personality: "【幹部】優れた管理者。物事を組織し、秩序を重んじる、生まれながらのリーダーです。", strengths: "リーダーシップ、決断力がある、責任感が強い、組織力がある", weaknesses: "頑固、他人の意見を聞かないことがある、感情表現が苦手", goodMatch: "ISTP, INTP", badMatch: "INFP, ISFP", workAdvice: "管理職やリーダーとして、組織をまとめ、目標達成に導く役割で能力を発揮します。明確な階層構造のある環境を好みます。" },
    "ESFJ": { personality: "【領事官】非常に思いやりがあり、社交的。人々を助け、コミュニティに貢献することに喜びを感じます。", strengths: "協調性が高い、責任感が強い、社交的、世話好き", weaknesses: "批判に弱い、自分の意見を抑えがち、承認欲求が強い", goodMatch: "ISFP, INTP", badMatch: "ENTP, INFP", workAdvice: "チームで協力する仕事や、人と直接関わるサービス業などで力を発揮します。感謝されることで大きな満足感を得られます。" },
    "ENFJ": { personality: "【主人公】カリスマ性があり、人々を鼓舞するリーダー。他人の可能性を引き出し、導くことに情熱を注ぎます。", strengths: "リーダーシップ、共感力が高い、社交的、人々を鼓舞する", weaknesses: "おせっかい、理想主義すぎる、自己犠牲的になりがち", goodMatch: "INFP, ISFP", badMatch: "ISTP, ESTP", workAdvice: "教育、カウンセリング、人事など、人の成長や幸福に貢献する分野で輝きます。チームをまとめる役割も得意です。" },
    "ENTJ": { personality: "【指揮官】大胆で想像力豊かな、強い意志を持つリーダー。困難な課題にも果敢に挑戦し、道を切り開きます。", strengths: "リーダーシップ、決断力がある、戦略的、自信家", weaknesses: "傲慢、忍耐力がない、他人の感情に鈍感", goodMatch: "INFP, INTP", badMatch: "ISFP, ESFP", workAdvice: "目標達成のためにチームを率いる管理職や、新しい事業を立ち上げる起業家に向いています。効率性と結果を重視します。" }
};

// --- 状態管理 ---
let currentQuestionIndex = 0;
let scores = {};
let finalResultType = '';

/**
 * 診断の状態を初期化する
 */
function initialize() {
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    finalResultType = '';
    
    // TOPページを表示し、他を非表示に
    topPage.classList.remove('hidden');
    questionPage.classList.add('hidden');
    resultPage.classList.add('hidden');
}

/**
 * 診断を開始する
 */
function startDiagnosis() {
    topPage.classList.add('hidden');
    questionPage.classList.remove('hidden');
    showQuestion();
}

/**
 * 現在の質問を表示する
 */
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionNumber.textContent = `質問 ${currentQuestionIndex + 1} / ${questions.length}`;
    questionText.textContent = question.text;
}

/**
 * 回答を処理する
 * @param {string} answer 'yes' または 'no'
 */
function handleAnswer(answer) {
    const question = questions[currentQuestionIndex];
    const trait = question[answer]; // 'E', 'I', 'S', 'N', 'T', 'F', 'J', 'P' のいずれか
    scores[trait]++;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateResult();
    }
}

/**
 * 最終的なMBTIタイプを計算し、結果を表示する
 */
function calculateResult() {
    const result = [
        scores.E > scores.I ? 'E' : 'I',
        scores.S > scores.N ? 'S' : 'N',
        scores.T > scores.F ? 'T' : 'F',
        scores.J > scores.P ? 'P' : 'P',
    ].join('');

    finalResultType = result;
    showResult(result);
}

/**
 * 診断結果をページに表示する
 * @param {string} type MBTIタイプ (例: "INFP")
 */
function showResult(type) {
    questionPage.classList.add('hidden');
    resultPage.classList.remove('hidden');

    const resultData = results[type];
    resultType.textContent = `${type} (${resultData.personality.split('【')[1].split('】')[0]})`;
    resultPersonality.textContent = resultData.personality;
    resultStrengths.textContent = resultData.strengths;
    resultWeaknesses.textContent = resultData.weaknesses;
    resultGoodMatch.textContent = resultData.goodMatch;
    resultBadMatch.textContent = resultData.badMatch;
    resultWorkAdvice.textContent = resultData.workAdvice;
}

/**
 * 結果をX(Twitter)でシェアする
 */
function shareResult() {
    const text = `私のMBTI診断結果は【${finalResultType}】でした！\nあなたも診断してみませんか？\n`;
    const url = window.location.href;
    const hashtags = "MBTI診断";
    
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    
    window.open(shareUrl, '_blank');
}


// --- イベントリスナーの設定 ---
startButton.addEventListener('click', startDiagnosis);
yesButton.addEventListener('click', () => handleAnswer('yes'));
noButton.addEventListener('click', () => handleAnswer('no'));
retryButton.addEventListener('click', initialize);
shareButton.addEventListener('click', shareResult);

// 初期化処理を実行
initialize();
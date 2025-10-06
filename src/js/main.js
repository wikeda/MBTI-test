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
const resultImage = document.getElementById('result-image');

// --- データセクション ---
// 診断の質問 (20問)
// 各質問は、どの指標(E/I, S/N, T/F, J/P)を測るか、
// 「はい」がどちらの特性に対応するかを定義します。
const questions = [
    // E(外向) / I(内向)
    { text: "友人の誕生日パーティー。多くの知らない人がいるが、積極的に話しかけにいく方だ", trait: "EI", yes: "E" },
    { text: "忙しい一週間が終わった。週末は友人と集まってワイワイ過ごしたい", trait: "EI", yes: "E" },
    { text: "休日は、家で本を読んだり映画を観たりして、一人の時間を満喫したい", trait: "EI", yes: "I" },
    { text: "会議で発言するより、他の人の意見を聞いている方が心地よい", trait: "EI", yes: "I" },
    { text: "新しいレストランを見つけたら、評判を調べる前に入ってみることが多い", trait: "EI", yes: "E" },
    // S(感覚) / N(直観)
    { text: "旅行の計画を立てるなら、具体的なスケジュールや予算をきっちり決めたい", trait: "SN", yes: "S" },
    { text: "「もし空を飛べたら？」といった、現実離れした空想をすることが楽しい", trait: "SN", yes: "N" },
    { text: "映画を観るとき、ストーリーだけでなく、背景の小物や衣装の細部にも目が行く", trait: "SN", yes: "S" },
    { text: "物事の「なぜ？」を考え、その裏にある根本的な原理や理論を探求するのが好きだ", trait: "SN", yes: "N" },
    { text: "新しいスキルを学ぶなら、まず実践してみて、体で覚えるタイプだ", trait: "SN", yes: "S" },
    // T(思考) / F(感情)
    { text: "友人が悩みを相談してきた。まずは共感するよりも、問題解決のための具体的なアドバイスを考える", trait: "TF", yes: "T" },
    { text: "チームで何かを決めるとき、全体の調和を保つことを最も大切にしたい", trait: "TF", yes: "F" },
    { text: "たとえ相手を傷つける可能性があっても、客観的な事実は正直に伝えるべきだ", trait: "TF", yes: "T" },
    { text: "誰かが困っているのを見ると、自分のことを後回しにしてでも助けたくなる", trait: "TF", yes: "F" },
    { text: "何かを選ぶとき、自分の感情よりも、メリット・デメリットを比較して合理的に判断する", trait: "TF", yes: "T" },
    // J(判断) / P(知覚)
    { text: "旅行に行くなら、分刻みのスケジュールを立てて、その通りに行動したい", trait: "JP", yes: "J" },
    { text: "急な予定変更やサプライズは、むしろワクワクする方だ", trait: "JP", yes: "P" },
    { text: "部屋は常に整理整頓されていないと、落ち着かない", trait: "JP", yes: "J" },
    { text: "休日の予定は、その日の気分で決めたい", trait: "JP", yes: "P" },
    { text: "タスクは締め切りギリギリよりも、早めに終わらせておきたい", trait: "JP", yes: "J" },
];

// 診断結果のデータ
const results = {
    "ISTJ": { image: "assets/type-images/ISTJ.svg", imageAlt: "MBTIタイプ ISTJ のイメージ", personality: "【管理者】あなたは、一度決めたことは最後までやり遂げる、非常に真面目で責任感の強い努力家です。現実的で具体的な事実を重んじ、伝統や秩序を大切にします。その誠実さから、周りの人々に深く信頼される存在です。", strengths: "誠実、計画的、責任感が強い、事実を重視する", weaknesses: "頑固、変化に弱い、他人の感情に鈍感なことがある", goodMatch: "ESFP, ESTP\n彼らの楽観性と行動力が、あなたの慎重さを補い、新しい楽しみを教えてくれます。彼らの自由な発想を尊重することが、良い関係の秘訣です。", badMatch: "INFP, ENFP\n彼らの理想主義や抽象的な話は、あなたにとって非現実的に感じられるかもしれません。彼らの感情や価値観に耳を傾け、理解しようと努めることが大切です。", workAdvice: "ルールや手順が明確な環境で、あなたの几帳面さと注意力を最大限に活かせます。会計、法務、データ管理などの分野で高い能力を発揮します。" },
    "ISFJ": { image: "assets/type-images/ISFJ.svg", imageAlt: "MBTIタイプ ISFJ のイメージ", personality: "【擁護者】あなたは、周りの人々を支えることに喜びを感じる、心優しく献身的なサポーターです。人の感情やニーズに敏感で、大切な人を守るためにはどんな努力も惜しみません。その温かさと思いやりで、多くの人に安らぎを与えます。", strengths: "献身的、忠実、思いやりがある、観察力が鋭い", weaknesses: "自己主張が苦手、変化を嫌う、過度に内向的になることがある", goodMatch: "ESTP, ESFP\n彼らのエネルギッシュな魅力に惹かれ、一緒にいると自然と笑顔になれます。あなたのサポートが、彼らの行動を支える力になります。", badMatch: "INTP, ENTP\n彼らの論理的で客観的な態度は、あなたにとって冷たく感じられるかもしれません。感情だけでなく、論理的な視点も受け入れることで、新たな発見があります。", workAdvice: "医療、教育、人事など、人を直接サポートする役割でやりがいを感じます。安定した環境で、感謝の言葉を励みにコツコツと努力できます。" },
    "INFJ": { image: "assets/type-images/INFJ.svg", imageAlt: "MBTIタイプ INFJ のイメージ", personality: "【提唱者】あなたは、強い信念と深い洞察力を持つ、静かな理想主義者です。人々の可能性を信じ、世界をより良い場所にしたいという強い願いを持っています。その共感力と神秘的な雰囲気で、人々を自然と惹きつけます。", strengths: "洞察力が鋭い、共感力が高い、理想主義、創造的", weaknesses: "完璧主義、燃え尽きやすい、批判に敏感", goodMatch: "ENFP, ENTP\n彼らの持つ無限の可能性やアイデアに刺激を受け、一緒にいると世界が広がります。あなたの深い洞察が、彼らのアイデアを現実にする手助けとなります。", badMatch: "ESTJ, ISTJ\n彼らの現実主義や規則を重んじる態度は、あなたの理想と衝突することがあります。お互いの視点の違いを尊重し、現実的な着地点を探ることが大切です。", workAdvice: "カウンセリング、執筆、芸術など、自分の価値観を表現し、人の成長を助ける分野で輝きます。一人で深く思索する時間を確保することが重要です。" },
    "INTJ": { image: "assets/type-images/INTJ.svg", imageAlt: "MBTIタイプ INTJ のイメージ", personality: "【建築家】あなたは、独創的なアイデアと戦略的な思考力で未来を設計する、知的な野心家です。あらゆる物事の改善点を見つけ出し、複雑な問題を解決することに長けています。その独立心と自信に満ちた姿は、周りに大きな影響を与えます。", strengths: "戦略的、独立的、知的好奇心が強い、決断力がある", weaknesses: "傲慢に見られがち、感情表現が苦手、非現実的な期待を持つことがある", goodMatch: "ENFP, ENTP\n彼らの柔軟な発想とエネルギーは、あなたの計画に新たな視点と活気をもたらします。知的な会話を共に楽しめる、最高のパートナーです。", badMatch: "ESFJ, ISFJ\n彼らの感情や伝統を重んじる姿勢は、あなたにとって非合理的に見えるかもしれません。彼らの「人の和」を大切にする気持ちを理解することが、良好な関係の鍵です。", workAdvice: "研究開発、IT、経営戦略など、複雑なシステムを分析し、長期的な視点で計画を立てる仕事で能力を発揮します。自律性が尊重される環境が不可欠です。" },
    "ISTP": { image: "assets/type-images/ISTP.svg", imageAlt: "MBTIタイプ ISTP のイメージ", personality: "【巨匠】あなたは、冷静な観察眼と優れた実践能力を持つ、生まれながらの職人です。好奇心旺盛で、手と頭脳を使って物事の仕組みを探求し、問題を解決することに喜びを感じます。危機的な状況でも動じない、頼れる存在です。", strengths: "論理的、実践的、冷静、危機管理能力が高い", weaknesses: "衝動的、長期的な計画が苦手、感情を軽視しがち", goodMatch: "ESFJ, ESTJ\n彼らの計画性や社交性が、あなたの自由な探求心を社会と結びつけてくれます。あなたの技術力が、彼らの目標達成を助けるでしょう。", badMatch: "INFJ, ENFJ\n彼らの感情豊かで理想主義的な世界観は、あなたにとって理解しがたいかもしれません。言葉の裏にある感情や意図を汲み取ろうとすることが大切です。 ", workAdvice: "エンジニア、パイロット、外科医など、実践的なスキルと冷静な判断力が求められる分野で輝きます。自由度が高く、自分の手で物事を解決できる環境を好みます。" },
    "ISFP": { image: "assets/type-images/ISFP.svg", imageAlt: "MBTIタイプ ISFP のイメージ", personality: "【冒険家】あなたは、五感で世界を感じ、今この瞬間を生きる、自由で魅力的な芸術家です。新しい体験や美しいものを求め、その感受性を独自の形で表現します。その穏やかで柔軟な人柄は、周りの人々を和ませます。", strengths: "芸術的センス、好奇心旺盛、柔軟、今を生きる", weaknesses: "計画性がない、対立を避ける、飽きっぽい", goodMatch: "ENFJ, ESFJ, ESTJ\n彼らの計画性や外向性が、あなたの芸術的な才能を世に出す手助けをしてくれます。あなたの感性が、彼らの日常に彩りを与えます。", badMatch: "INTJ, ENTJ\n彼らの論理的で目標志向な態度は、あなたの自由な精神を束縛するように感じられるかもしれません。お互いのペースを尊重し、干渉しすぎない距離感が大切です。 ", workAdvice: "デザイナー、音楽家、料理人など、美的センスと創造性を発揮できる仕事が向いています。自分のペースで、楽しみながら働ける環境が理想です。" },
    "INFP": { image: "assets/type-images/INFP.svg", imageAlt: "MBTIタイプ INFP のイメージ", personality: "【仲介者】あなたは、心の中に揺るぎない理想と価値観を持つ、優しく詩的な思想家です。人々の中にある善意を信じ、世界が調和に満ちることを願っています。その深い共感力と純粋さで、人々の心を癒す存在です。", strengths: "共感力が高い、創造的、理想主義、忠実", weaknesses: "非現実的、自己批判的、感情に流されやすい", goodMatch: "ENFJ, ENTJ\n彼らのリーダーシップと決断力が、あなたの理想を現実世界で形にするための力になります。あなたの持つ優しさが、彼らの心を支えます。", badMatch: "ISTJ, ESTJ\n彼らの現実主義と規則を重んじる姿勢は、あなたの価値観と相容れないことが多いかもしれません。感情的に反発せず、お互いの「正義」の違いを認め合うことが重要です。", workAdvice: "作家、カウンセラー、NPO活動など、人の役に立ち、自分の価値観を表現できる分野で深いやりがいを感じます。商業主義よりも理念を重視します。" },
    "INTP": { image: "assets/type-images/INTP.svg", imageAlt: "MBTIタイプ INTP のイメージ", personality: "【論理学者】あなたは、尽きることのない知的好奇心と、鋭い分析力を持つ革新的な探求者です。独自の視点から世界の法則やパターンを見つけ出し、知的な探求を楽しむことに情熱を注ぎます。そのユニークな発想は、新しい時代を切り開きます。", strengths: "分析力が高い、独創的、知的好奇心が強い、客観的", weaknesses: "社会的な交流が苦手、規則や締め切りを無視しがち、感情に鈍感", goodMatch: "ENTJ, ESTJ\n彼らの実行力と組織力が、あなたの素晴らしいアイデアを社会で実現可能な形にしてくれます。あなたの分析力が、彼らの戦略をより強固なものにします。", badMatch: "ISFJ, ESFJ\n彼らの感情的なつながりや慣習を重んじる態度は、あなたにとって非論理的に感じられるかもしれません。彼らの持つ「優しさ」の価値を認めることが、関係改善の第一歩です。", workAdvice: "研究者、プログラマー、大学教授など、専門知識を深く探求し、複雑な問題を解決する仕事で能力を発揮します。知的な自由が保証される環境が不可欠です。" },
    "ESTP": { image: "assets/type-images/ESTP.svg", imageAlt: "MBTIタイプ ESTP のイメージ", personality: "【起業家】あなたは、鋭い観察眼と抜群の行動力で、常にスリルと刺激を求めるエネルギッシュな実践者です。リスクを恐れず、その場の状況に即座に対応する能力に長けています。そのカリスマ性と度胸で、人々を率いていきます。", strengths: "行動力がある、社交的、現実的、問題解決能力が高い", weaknesses: "衝動的、忍耐力がない、ルールを軽視しがち", goodMatch: "ISFJ, ISTJ\n彼らの堅実さや計画性が、あなたの衝動的な行動にブレーキをかけ、安定感をもたらしてくれます。あなたの行動力が、彼らの日常に刺激を与えます。", badMatch: "INFP, INFJ\n彼らの内向的で理想主義的な態度は、あなたにとって退屈に感じられるかもしれません。彼らの持つ深い内面世界や価値観に興味を持つことが、関係を深める鍵です。", workAdvice: "起業家、営業、救急救命士など、変化に富み、即座の判断と行動が求められる現場で輝きます。退屈なルーティンワークは最も苦手とするところです。" },
    "ESFP": { image: "assets/type-images/ESFP.svg", imageAlt: "MBTIタイプ ESFP のイメージ", personality: "【エンターテイナー】あなたは、その場の雰囲気を明るくし、人々を楽しませることが大好きな、生まれながらのスターです。自発的でエネルギッシュ、その場の主役になることを心から楽しみます。あなたの周りには、いつも笑顔と活気が溢れています。", strengths: "社交的、楽観的、美的センスがある、実践的", weaknesses: "計画性がない、集中力が続かない、対立を嫌う", goodMatch: "ISTJ, ISFJ\n彼らの計画性や真面目さが、あなたの自由なエネルギーを支え、現実的な成功へと導いてくれます。あなたの明るさが、彼らの心を和ませます。", badMatch: "INTP, INTJ\n彼らの理論的で内省的な態度は、あなたにとって堅苦しく感じられるかもしれません。一緒に体を動かしたり、五感で楽しめる体験を共有することから始めると良いでしょう。", workAdvice: "俳優、イベントプランナー、販売員など、人前に立ち、人々を楽しませる仕事が天職です。活気のある職場で、その場の雰囲気を盛り上げるムードメーカーになります。" },
    "ENFP": { image: "assets/type-images/ENFP.svg", imageAlt: "MBTIタイプ ENFP のイメージ", personality: "【広報運動家】あなたは、情熱的で創造力に富み、常に新しい可能性を追い求める自由な精神の持ち主です。人と人との感情的なつながりを大切にし、その持ち前のコミュニケーション能力で多くの友人を魅了します。あなたの存在は、周りにインスピレーションを与えます。", strengths: "情熱的、コミュニケーション能力が高い、創造的、好奇心旺盛", weaknesses: "飽きっぽい、集中力が散漫になりがち、ストレスに弱い", goodMatch: "INFJ, INTJ\n彼らの深い洞察力や計画性が、あなたの次々と湧き出るアイデアに形を与えてくれます。お互いの創造性を刺激し合える、最高のパートナーです。", badMatch: "ISTJ, ISFJ\n彼らの伝統や規則を重んじる姿勢は、あなたの自由な発想を妨げるように感じられるかもしれません。彼らの持つ堅実さや誠実さの価値を認めることが大切です。 ", workAdvice: "広告、ジャーナリスト、コンサルタントなど、新しいアイデアを生み出し、人と関わる仕事で輝きます。変化と刺激に満ちた、自由な社風の環境が理想です。" },
    "ENTP": { image: "assets/type-images/ENTP.svg", imageAlt: "MBTIタイプ ENTP のイメージ", personality: "【討論者】あなたは、頭の回転が速く、知的な挑戦をこよなく愛する、カリスマ的な思想家です。常識に疑問を投げかけ、あらゆる可能性を議論することを楽しみます。その鋭い知性とユーモアで、どんな場でも議論の中心になります。", strengths: "頭の回転が速い、カリスマ性がある、議論が好き、独創的", weaknesses: "無神経なことがある、飽きっぽい、細かい作業が苦手", goodMatch: "INFJ, INTJ\n彼らの深い洞察力と長期的な視点が、あなたのアイデアをより洗練されたものにしてくれます。知的なスパーリングを楽しめる、かけがえのない相手です。", badMatch: "ISFJ, ESFJ\n彼らの調和や感情を重んじる態度は、あなたにとって非効率的に見えるかもしれません。「正しさ」だけでなく「優しさ」も大切にする彼らの視点を学ぶことが重要です。", workAdvice: "弁護士、起業家、マーケターなど、既存の枠組みに捉われず、新しい戦略やアイデアで勝負する仕事で能力を発揮します。常に知的な刺激を求めます。" },
    "ESTJ": { image: "assets/type-images/ESTJ.svg", imageAlt: "MBTIタイプ ESTJ のイメージ", personality: "【幹部】あなたは、物事を効率的に組織し、人々をまとめ、目標達成へと導く、生まれながらのリーダーです。現実的で決断力があり、その強い責任感でコミュニティを支えます。あなたの存在は、組織に秩序と安定をもたらします。", strengths: "リーダーシップ、決断力がある、責任感が強い、組織力がある", weaknesses: "頑固、他人の意見を聞かないことがある、感情表現が苦手", goodMatch: "ISTP, INTP\n彼らの独創的なアイデアや分析力が、あなたの計画をより革新的なものにします。あなたの実行力が、彼らの才能を現実世界で活かす手助けをします。", badMatch: "INFP, ISFP\n彼らの感情豊かで自由なスタイルは、あなたの秩序ある世界とは相容れないかもしれません。効率だけでなく、個人の感情や創造性の価値も認める広い視野が大切です。", workAdvice: "経営者、管理者、プロデューサーなど、組織を率いてプロジェクトを管理する役割で輝きます。明確な階層とルールのある環境で、その手腕を存分に発揮します。" },
    "ESFJ": { image: "assets/type-images/ESFJ.svg", imageAlt: "MBTIタイプ ESFJ のイメージ", personality: "【領事官】あなたは、非常に思いやり深く、人々が幸せであることを何よりも願う、社交的な世話役です。コミュニティの調和を大切にし、人々を助けることに大きな喜びを感じます。その温かい人柄で、いつも人の輪の中心にいます。", strengths: "協調性が高い、責任感が強い、社交的、世話好き", weaknesses: "批判に弱い、自分の意見を抑えがち、承認欲求が強い", goodMatch: "ISFP, INTP\nあなたのサポートが、彼らの持つユニークな才能やアイデアを開花させるきっかけになります。彼らの独創的な世界観が、あなたの日常に新しい発見をもたらします。", badMatch: "ENTP, INFP\n彼らの個人主義的で理想を追求する姿勢は、あなたの「みんなのために」という価値観と衝突するかもしれません。異なる価値観を尊重し、議論を恐れないことが大切です。", workAdvice: "教師、看護師、人事など、チームで協力し、人と直接関わるサービス業で力を発揮します。人から感謝されることで、大きな満足感とやりがいを得られます。" },
    "ENFJ": { image: "assets/type-images/ENFJ.svg", imageAlt: "MBTIタイプ ENFJ のイメージ", personality: "【主人公】あなたは、人々を鼓舞し、その可能性を最大限に引き出すことに情熱を燃やす、カリスマ的なリーダーです。強い共感力とコミュニケーション能力で、人々の心を掴み、共通の目標へと導きます。あなたの周りには、いつも希望と活気が満ち溢れています。", strengths: "リーダーシップ、共感力が高い、社交的、人々を鼓舞する", weaknesses: "おせっかい、理想主義すぎる、自己犠牲的になりがち", goodMatch: "INFP, ISFP\n彼らの持つ豊かな感性や創造性が、あなたの理想に彩りを与えてくれます。あなたのリーダーシップが、彼らの才能を世に広める手助けとなるでしょう。", badMatch: "ISTP, ESTP\n彼らの現実的で個人主義的な態度は、あなたにとって協調性がないように見えるかもしれません。言葉だけでなく、行動で示す彼らのスタイルを理解することが重要です。", workAdvice: "教師、政治家、広報など、人々をまとめ、導き、インスピレーションを与える仕事が天職です。人の成長や幸福に貢献できる分野で、大きなやりがいを感じます。" },
    "ENTJ": { image: "assets/type-images/ENTJ.svg", imageAlt: "MBTIタイプ ENTJ のイメージ", personality: "【指揮官】あなたは、大胆なビジョンと強い意志で、困難な目標さえも達成してしまう、生まれながらの指揮官です。戦略的思考に長け、常に効率性と結果を重視します。その圧倒的なリーダーシップで、どんな組織でも頂点へと導く力を持っています。", strengths: "リーダーシップ、決断力がある、戦略的、自信家", weaknesses: "傲慢、忍耐力がない、他人の感情に鈍感", goodMatch: "INFP, INTP\n彼らの独創的なアイデアや深い洞察力が、あなたの戦略に新たな次元を加えます。あなたの決断力が、彼らの才能を現実の成功へと結びつけます。", badMatch: "ISFP, ESFP\n彼らの「今を楽しむ」というスタイルは、常に未来を見据えるあなたにとって非効率的に映るかもしれません。時には肩の力を抜き、彼らと「今」を楽しむ余裕を持つことが大切です。", workAdvice: "CEO、起業家、コンサルタントなど、大きな目標を掲げ、チームを率いてそれを達成する役割で輝きます。挑戦的で、結果が正当に評価される環境を好みます。" }
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
    if (resultData.image) {
        resultImage.src = resultData.image;
        resultImage.alt = resultData.imageAlt || `MBTIタイプ ${type} のイメージ`;
    } else {
        resultImage.removeAttribute('src');
        resultImage.alt = '';
    }

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

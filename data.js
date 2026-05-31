const steps = [
  {
    id: "preflight",
    date: "2026-06-15",
    start: "07:30",
    end: "09:00",
    title: "出発前チェック",
    place: "自宅",
    description: "パスポート、財布、スマホ、充電器を確認して空港へ向かう。",
    actions: ["パスポートを手元に置く", "モバイルバッテリーを入れる", "空港行きの経路を開く"],
    links: [
      { label: "空港アクセス", url: "https://www.google.com/maps/search/?api=1&query=Haneda+Airport" }
    ],
    nextSummary: "空港で搭乗手続きと保安検査へ。",
    miniInfo: "荷物は軽く。すぐ出せる場所にパスポート。"
  },
  {
    id: "airport-to-hotel",
    date: "2026-06-15",
    start: "13:30",
    end: "15:00",
    title: "空港からホテルへ",
    place: "仁川国際空港",
    description: "AREXまたは空港バスでソウル市内へ移動する。",
    actions: ["交通カードを準備", "ホテル住所を表示", "乗り場を確認"],
    links: [
      { label: "ホテル周辺地図", url: "https://www.google.com/maps/search/?api=1&query=Myeongdong+Seoul" },
      { label: "空港鉄道", url: "https://www.arex.or.kr/" }
    ],
    nextSummary: "ホテルに荷物を預けるかチェックイン。",
    miniInfo: "乗車前: 乗り場とチケット種別を先に確認。"
  },
  {
    id: "hotel-checkin",
    date: "2026-06-15",
    start: "15:00",
    end: "16:00",
    title: "ホテルチェックイン",
    place: "明洞エリアのホテル",
    description: "フロントでチェックイン。荷物を置いて少し休む。",
    actions: ["ホテル名を見せる", "チェックイン時間を確認", "次の移動時間を決める"],
    links: [
      { label: "ホテル地図", url: "https://www.google.com/maps/search/?api=1&query=Myeongdong+hotel+Seoul" }
    ],
    nextSummary: "ソウル駅へ移動してKTXの乗車準備。",
    miniInfo: "到着後: Wi-Fi、コンセント、翌朝の集合時間を確認。"
  },
  {
    id: "to-seoul-station",
    date: "2026-06-16",
    start: "08:30",
    end: "09:20",
    title: "ソウル駅へ移動",
    place: "明洞 → ソウル駅",
    description: "地下鉄またはタクシーでソウル駅へ。KTX乗車に余裕を持つ。",
    actions: ["KTX時刻を確認", "駅の入口を確認", "同行者と集合場所を確認"],
    links: [
      { label: "ソウル駅地図", url: "https://www.google.com/maps/search/?api=1&query=Seoul+Station" }
    ],
    nextSummary: "KTX乗車前。ホームとチケットを確認。",
    miniInfo: "乗車前: 10分以上余裕を作る。"
  },
  {
    id: "ktx-before",
    date: "2026-06-16",
    start: "09:20",
    end: "10:00",
    title: "KTX乗車前",
    place: "ソウル駅",
    description: "チケット、列車番号、ホーム、座席を確認する。",
    actions: ["チケットを開く", "列車番号を見る", "ホーム表示を確認"],
    links: [
      { label: "KTXチケット", url: "https://www.letskorail.com/" },
      { label: "ソウル駅地図", url: "https://www.google.com/maps/search/?api=1&query=Seoul+Station+KTX" }
    ],
    nextSummary: "KTXで原州方面へ移動。",
    miniInfo: "乗車前: チケットと乗り場が最重要。"
  },
  {
    id: "ktx-riding",
    date: "2026-06-16",
    start: "10:00",
    end: "11:05",
    title: "KTX乗車中",
    place: "KTX車内",
    description: "到着後の移動だけ軽く確認。チケット確認は必要な時だけ。",
    actions: ["到着駅を確認", "降車後の地図を開く", "荷物をまとめる"],
    links: [
      { label: "原州駅地図", url: "https://www.google.com/maps/search/?api=1&query=Wonju+Station" }
    ],
    nextSummary: "原州駅到着後、ミュージアムSAN方面へ。",
    miniInfo: "乗車中: 到着後の流れだけ見ればOK。"
  },
  {
    id: "wonju-arrival",
    date: "2026-06-16",
    start: "11:05",
    end: "11:30",
    title: "原州駅到着",
    place: "원주역",
    description: "駅を出て、タクシーまたはバスで目的地へ向かう。",
    actions: ["目的地名を韓国語で見せる", "タクシー乗り場へ", "帰りの時刻も軽く確認"],
    links: [
      { label: "原州駅地図", url: "https://www.google.com/maps/search/?api=1&query=Wonju+Station" },
      { label: "目的地地図", url: "https://www.google.com/maps/search/?api=1&query=Museum+SAN" }
    ],
    nextSummary: "ミュージアムSANへ移動。",
    miniInfo: "到着後: 目的地名と地図を見せるのが早い。"
  },
  {
    id: "to-museum-san",
    date: "2026-06-16",
    start: "11:30",
    end: "12:20",
    title: "ミュージアムSANへ移動",
    place: "원주역 → 뮤지엄 산",
    description: "移動中はチケットより到着後の入口と営業時間を確認する。",
    actions: ["目的地名を表示", "到着口を確認", "見学開始時間を見る"],
    links: [
      { label: "ミュージアムSAN", url: "https://www.museumsan.org/" },
      { label: "地図", url: "https://www.google.com/maps/search/?api=1&query=Museum+SAN" }
    ],
    nextSummary: "到着したらチケットを出して見学開始。",
    miniInfo: "韓国語名: 뮤지엄 산"
  },
  {
    id: "museum-san",
    date: "2026-06-16",
    start: "12:20",
    end: "15:30",
    title: "ミュージアムSAN見学",
    place: "뮤지엄 산",
    description: "展示と建築をゆっくり見る。帰りの移動時間だけ忘れない。",
    actions: ["チケットを開く", "帰りの出発時刻を確認", "集合場所を決める"],
    links: [
      { label: "公式サイト", url: "https://www.museumsan.org/" },
      { label: "帰りの地図", url: "https://www.google.com/maps/search/?api=1&query=Wonju+Station" }
    ],
    nextSummary: "原州駅へ戻り、ソウル方面へ。",
    miniInfo: "見学中: 写真より移動時間だけ忘れない。"
  },
  {
    id: "back-to-seoul",
    date: "2026-06-16",
    start: "15:30",
    end: "18:30",
    title: "ソウルへ戻る",
    place: "原州 → ソウル",
    description: "原州駅へ戻り、KTXまたは高速バスでソウルへ戻る。",
    actions: ["帰りのチケット確認", "ソウル到着後の予定を見る", "夕食候補を開く"],
    links: [
      { label: "KTX確認", url: "https://www.letskorail.com/" },
      { label: "ソウル駅地図", url: "https://www.google.com/maps/search/?api=1&query=Seoul+Station" }
    ],
    nextSummary: "ホテルに戻るか、夕食へ。",
    miniInfo: "帰り: 疲れている前提で、乗り換えは少なく。"
  }
];

const preTrip = {
  checklist: [
    "パスポート",
    "財布とクレジットカード",
    "スマホと充電器",
    "モバイルバッテリー",
    "海外通信の確認",
    "常備薬"
  ],
  undecided: [
    "1日目の夕食候補",
    "雨の日の代替ルート",
    "ミュージアムSANから原州駅への帰り方"
  ],
  share: [
    "集合時間と集合場所",
    "ホテル名と最寄り駅",
    "KTXに乗る日と大まかな時間",
    "緊急時の連絡方法"
  ],
  ticketLinks: [
    { label: "航空券メモ", url: "#" },
    { label: "ホテル予約メモ", url: "#" },
    { label: "KTX公式", url: "https://www.letskorail.com/" },
    { label: "ミュージアムSAN公式", url: "https://www.museumsan.org/" }
  ]
};

const helpInfo = {
  hotel: {
    name: "明洞エリアのホテル（サンプル）",
    address: "서울특별시 중구 명동길 00"
  },
  koreanDestinations: [
    { label: "ソウル駅", text: "서울역" },
    { label: "原州駅", text: "원주역" },
    { label: "ミュージアムSAN", text: "뮤지엄 산" },
    { label: "明洞", text: "명동" }
  ],
  phrases: [
    { ja: "ここへ行きたいです", ko: "여기로 가고 싶어요." },
    { ja: "この住所までお願いします", ko: "이 주소로 가 주세요." },
    { ja: "いくらですか？", ko: "얼마예요?" },
    { ja: "日本語はできますか？", ko: "일본어 가능하세요?" }
  ],
  tickets: [
    { label: "KTX公式", url: "https://www.letskorail.com/" },
    { label: "ミュージアムSAN公式", url: "https://www.museumsan.org/" }
  ],
  maps: [
    { label: "ホテル周辺", url: "https://www.google.com/maps/search/?api=1&query=Myeongdong+Seoul" },
    { label: "ソウル駅", url: "https://www.google.com/maps/search/?api=1&query=Seoul+Station" },
    { label: "原州駅", url: "https://www.google.com/maps/search/?api=1&query=Wonju+Station" },
    { label: "ミュージアムSAN", url: "https://www.google.com/maps/search/?api=1&query=Museum+SAN" }
  ]
};

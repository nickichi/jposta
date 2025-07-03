export const postalCodeTestCases = [
  // 秋田県
  { zipCode: "0100000", expected: "秋田県秋田市" },
  { zipCode: "0100001", expected: "秋田県秋田市中通" },
  { zipCode: "010-0833", expected: "秋田県秋田市旭川新藤田東町" },
  { zipCode: "0100400", expected: "秋田県南秋田郡大潟村" },
  { zipCode: "0100500", expected: "秋田県男鹿市" },

  // 湯沢市
  { zipCode: "0120000", expected: "秋田県湯沢市" },
  { zipCode: "0120001", expected: "秋田県湯沢市角間" },

  // 横手市
  { zipCode: "0130000", expected: "秋田県横手市" },
  { zipCode: "0130001", expected: "秋田県横手市杉沢" },

  // 大仙市
  { zipCode: "0140000", expected: "秋田県大仙市" },
  { zipCode: "0140001", expected: "秋田県大仙市花館" },

  // 由利本荘市
  { zipCode: "0150000", expected: "秋田県由利本荘市" },
  { zipCode: "0150011", expected: "秋田県由利本荘市石脇" },

  // 能代市
  { zipCode: "0160000", expected: "秋田県能代市" },
  { zipCode: "0160001", expected: "秋田県能代市外荒巻" },

  // 大館市
  { zipCode: "0170000", expected: "秋田県大館市" },
  { zipCode: "0170001", expected: "秋田県大館市長走" },

  // にかほ市
  { zipCode: "0180101", expected: "秋田県にかほ市象潟町浜山" },
  { zipCode: "0180102", expected: "秋田県にかほ市象潟町木戸口" },

  // existing test cases
  { zipCode: "0700973", expected: "北海道旭川市４区３条" },
  { zipCode: "004-0021", expected: "北海道札幌市厚別区青葉町" },
  { zipCode: "039-2189", expected: "青森県上北郡おいらせ町青葉" },
  { zipCode: "029-4504", expected: "岩手県胆沢郡金ケ崎町永沢" },
  { zipCode: "981-2173", expected: "宮城県伊具郡丸森町天炉" },
  { zipCode: "999-8315", expected: "山形県飽海郡遊佐町大蕨岡" },
  { zipCode: "965-0031", expected: "福島県会津若松市相生町" },
  { zipCode: "100-6810", expected: "東京都千代田区大手町ＪＡビル" },
  { zipCode: "100-0001", expected: "東京都千代田区千代田" },
  {
    zipCode: "150-6208",
    expected:
      "東京都渋谷区桜丘町渋谷サクラステージＳＨＩＢＵＹＡサイドＳＨＩＢＵＹＡタワー",
  },
  { zipCode: "100-1701", expected: "東京都青ヶ島村青ヶ島村一円" },
  { zipCode: "300-1414", expected: "茨城県稲敷市戌渡" },
  { zipCode: "213-0014", expected: "神奈川県川崎市高津区新作" },
  { zipCode: "326-0808", expected: "栃木県足利市本城" },
  { zipCode: "270-1100", expected: "千葉県我孫子市" },
  { zipCode: "370-3571", expected: "群馬県前橋市池端町" },
  { zipCode: "401-0013", expected: "山梨県大月市大月" },
  { zipCode: "333-0865", expected: "埼玉県川口市伊刈" },
  { zipCode: "949-0112", expected: "新潟県糸魚川市上路" },
  { zipCode: "381-0042", expected: "長野県長野市稲田" },
  { zipCode: "939-0321", expected: "富山県射水市青井谷" },
  { zipCode: "928-0008", expected: "石川県輪島市マリンタウン" },
  { zipCode: "916-0262", expected: "福井県丹生郡越前町宇須尾" },
  { zipCode: "410-2103", expected: "静岡県伊豆の国市エメラルドタウン" },
  { zipCode: "501-0438", expected: "岐阜県本巣郡北方町平成" },
  { zipCode: "458-0818", expected: "愛知県名古屋市緑区鳴海町" },
  { zipCode: "518-0859", expected: "三重県伊賀市上野相生町" },
  { zipCode: "525-0068", expected: "滋賀県草津市南草津プリムタウン" },
  { zipCode: "602-0848", expected: "京都府京都市上京区扇町" },
  { zipCode: "671-1136", expected: "兵庫県姫路市大津区恵美酒町" },
  { zipCode: "557-0013", expected: "大阪府大阪市西成区天神ノ森" },
  { zipCode: "630-8037", expected: "奈良県奈良市中町" },
  { zipCode: "640-1363", expected: "和歌山県海草郡紀美野町田" },
  { zipCode: "682-0721", expected: "鳥取県東伯郡湯梨浜町田後" },
  { zipCode: "699-0763", expected: "島根県出雲市大社町日御碕" },
  { zipCode: "701-2623", expected: "岡山県美作市英田青野" },
  { zipCode: "736-0053", expected: "広島県安芸郡海田町寿町" },
  { zipCode: "744-0000", expected: "山口県下松市" },
  { zipCode: "769-0401", expected: "香川県三豊市財田町財田上" },
  { zipCode: "797-1603", expected: "愛媛県大洲市河辺町横山" },
  { zipCode: "779-1404", expected: "徳島県阿南市阿瀬比町" },
  { zipCode: "784-0034", expected: "高知県安芸市赤野乙" },
  { zipCode: "822-1324", expected: "福岡県田川郡糸田町旭ケ丘" },
  { zipCode: "843-0304", expected: "佐賀県嬉野市嬉野町岩屋川内" },
  { zipCode: "811-5301", expected: "長崎県壱岐市芦辺町芦辺浦" },
  { zipCode: "869-5561", expected: "熊本県葦北郡芦北町芦北" },
  { zipCode: "879-1138", expected: "大分県宇佐市青森" },
  { zipCode: "889-4303", expected: "宮崎県えびの市池島" },
  { zipCode: "893-2503", expected: "鹿児島県肝属郡南大隅町根占横別府" },
  { zipCode: "907-1801", expected: "沖縄県八重山郡与那国町与那国" },
];

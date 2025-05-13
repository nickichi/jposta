const a = (o, s, p) => {
  const i = o[s];
  return i ? typeof i == "function" ? i() : Promise.resolve(i) : new Promise((z, t) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(t.bind(null, new Error("Unknown variable dynamic import: " + s + (s.split("/").length !== p ? ". Note that variables only represent file names one level deep." : ""))));
  });
}, j = {
  host: ""
}, n = j, e = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県"
], f = async (o) => {
  if (o.length !== 7 && o.length !== 8)
    throw new Error(`Zip code must be 7 or 8 characters: ${o}`);
  if (o.length === 8 && !/^\d{3}-\d{4}$/.test(o))
    throw new Error(`Invalid zip code: ${o}`);
  if (o.length === 7 && !/^\d{7}$/.test(o))
    throw new Error(`Invalid zip code: ${o}`);
  const s = o.replace("-", ""), p = s.slice(0, 2), i = await c(p);
  if (!i || !i[s])
    return null;
  const [z, t, r] = i[s], m = e[z - 1];
  if (typeof z != "number" || typeof t != "string" || typeof r != "string" || typeof m != "string")
    throw new Error(`Internal error data broken: ${i[s]}`);
  return {
    pref: m,
    prefNum: z,
    city: t,
    area: r || void 0
  };
}, c = async (o) => {
  if (n.host !== "") {
    const { default: p } = await import(`${n.host}/z${o}.json`);
    return p;
  }
  const { default: s } = await a(/* @__PURE__ */ Object.assign({ "./zips/z00.json": () => import("./z00-DXktW3NJ.js"), "./zips/z01.json": () => import("./z01-B44LTnDq.js"), "./zips/z02.json": () => import("./z02-DDTQujDn.js"), "./zips/z03.json": () => import("./z03-8_QPrile.js"), "./zips/z04.json": () => import("./z04-DWCMp0q3.js"), "./zips/z05.json": () => import("./z05-BqbgwBoV.js"), "./zips/z06.json": () => import("./z06-CShPhk56.js"), "./zips/z07.json": () => import("./z07-DtotadkB.js"), "./zips/z08.json": () => import("./z08-C55jQ9wx.js"), "./zips/z09.json": () => import("./z09-C_OoEo3y.js"), "./zips/z10.json": () => import("./z10-eXY0nnaQ.js"), "./zips/z11.json": () => import("./z11-nic1O4vt.js"), "./zips/z12.json": () => import("./z12-CPsgy9G4.js"), "./zips/z13.json": () => import("./z13-BhlGx_IM.js"), "./zips/z14.json": () => import("./z14-CHy9g6WM.js"), "./zips/z15.json": () => import("./z15-3I3uEVry.js"), "./zips/z16.json": () => import("./z16-CE8bQ8Ez.js"), "./zips/z17.json": () => import("./z17-BhplFsts.js"), "./zips/z18.json": () => import("./z18-BapyRu4s.js"), "./zips/z19.json": () => import("./z19-rnlQag7g.js"), "./zips/z20.json": () => import("./z20-TNCuR5Vf.js"), "./zips/z21.json": () => import("./z21-C8oiUY1W.js"), "./zips/z22.json": () => import("./z22-B-160A75.js"), "./zips/z23.json": () => import("./z23-D90b57ue.js"), "./zips/z24.json": () => import("./z24-BtviAqW4.js"), "./zips/z25.json": () => import("./z25-DgyXUjAk.js"), "./zips/z26.json": () => import("./z26-JJ7BtXKw.js"), "./zips/z27.json": () => import("./z27-BijJWivT.js"), "./zips/z28.json": () => import("./z28-Cf_RX22O.js"), "./zips/z29.json": () => import("./z29-CVPdXf8S.js"), "./zips/z30.json": () => import("./z30-CEONMuBb.js"), "./zips/z31.json": () => import("./z31-BiAQuBur.js"), "./zips/z32.json": () => import("./z32-XoscwZkY.js"), "./zips/z33.json": () => import("./z33-DVbRtZT0.js"), "./zips/z34.json": () => import("./z34-BqDIpf2y.js"), "./zips/z35.json": () => import("./z35-Brj8-gne.js"), "./zips/z36.json": () => import("./z36-6TWbHXhw.js"), "./zips/z37.json": () => import("./z37-Byj7h3ES.js"), "./zips/z38.json": () => import("./z38-BI3OO9CD.js"), "./zips/z39.json": () => import("./z39-BBp2M-vl.js"), "./zips/z40.json": () => import("./z40-QQM92GAb.js"), "./zips/z41.json": () => import("./z41-CUKW0Jz7.js"), "./zips/z42.json": () => import("./z42-bReW_818.js"), "./zips/z43.json": () => import("./z43-CFSg5z59.js"), "./zips/z44.json": () => import("./z44-D_vEOoiJ.js"), "./zips/z45.json": () => import("./z45-Dpech6-h.js"), "./zips/z46.json": () => import("./z46-CdSJQTaf.js"), "./zips/z47.json": () => import("./z47-ChFeaMC_.js"), "./zips/z48.json": () => import("./z48-BoDWhBRO.js"), "./zips/z49.json": () => import("./z49-Bm26SWfp.js"), "./zips/z50.json": () => import("./z50-CTS-i5kb.js"), "./zips/z51.json": () => import("./z51-ClI2eqL8.js"), "./zips/z52.json": () => import("./z52-CRt2Rq-l.js"), "./zips/z53.json": () => import("./z53-m3tfdFw_.js"), "./zips/z54.json": () => import("./z54-WryQjkFO.js"), "./zips/z55.json": () => import("./z55-DLHxqhUx.js"), "./zips/z56.json": () => import("./z56-0qHapeyt.js"), "./zips/z57.json": () => import("./z57-DGgO8H3G.js"), "./zips/z58.json": () => import("./z58-B6_-aFeK.js"), "./zips/z59.json": () => import("./z59-C0hUz-JN.js"), "./zips/z60.json": () => import("./z60-34YubQWJ.js"), "./zips/z61.json": () => import("./z61-z-SLTsB-.js"), "./zips/z62.json": () => import("./z62-6I2I73FR.js"), "./zips/z63.json": () => import("./z63-CKSeQfns.js"), "./zips/z64.json": () => import("./z64-BpOab9TP.js"), "./zips/z65.json": () => import("./z65-D43Y8Ke2.js"), "./zips/z66.json": () => import("./z66-DVqcVGyn.js"), "./zips/z67.json": () => import("./z67-CkBYuUac.js"), "./zips/z68.json": () => import("./z68-CNhjEv_1.js"), "./zips/z69.json": () => import("./z69-Bb0sQUg-.js"), "./zips/z70.json": () => import("./z70-C3bLvvAv.js"), "./zips/z71.json": () => import("./z71-BOhafqCr.js"), "./zips/z72.json": () => import("./z72-4O3RbZAy.js"), "./zips/z73.json": () => import("./z73-D22SlQj3.js"), "./zips/z74.json": () => import("./z74-Szr3jGPV.js"), "./zips/z75.json": () => import("./z75-C-tOG4iC.js"), "./zips/z76.json": () => import("./z76-cUW23-fH.js"), "./zips/z77.json": () => import("./z77-T5fRkRpD.js"), "./zips/z78.json": () => import("./z78-CZBY62gV.js"), "./zips/z79.json": () => import("./z79-Da2ZQNiT.js"), "./zips/z80.json": () => import("./z80-knbeqTz4.js"), "./zips/z81.json": () => import("./z81-DzsrZSaJ.js"), "./zips/z82.json": () => import("./z82-CK1-saWU.js"), "./zips/z83.json": () => import("./z83-NCyjIBIz.js"), "./zips/z84.json": () => import("./z84-CUQ67_Ob.js"), "./zips/z85.json": () => import("./z85-CG2Kj7iq.js"), "./zips/z86.json": () => import("./z86-fFJQskOR.js"), "./zips/z87.json": () => import("./z87-D0-YboP6.js"), "./zips/z88.json": () => import("./z88-Dxdu7fID.js"), "./zips/z89.json": () => import("./z89-BxHsYiFo.js"), "./zips/z90.json": () => import("./z90-DuoGq_hZ.js"), "./zips/z91.json": () => import("./z91-D59XCWvJ.js"), "./zips/z92.json": () => import("./z92-C0_eOVM7.js"), "./zips/z93.json": () => import("./z93-DdcYlzo0.js"), "./zips/z94.json": () => import("./z94-BwEaQv09.js"), "./zips/z95.json": () => import("./z95-CF6_muOD.js"), "./zips/z96.json": () => import("./z96-CuBFgxoo.js"), "./zips/z97.json": () => import("./z97-BeruJGvc.js"), "./zips/z98.json": () => import("./z98-Qgk61Pz6.js"), "./zips/z99.json": () => import("./z99-D0dETOpp.js") }), `./zips/z${o}.json`, 3);
  return s;
}, l = (o) => {
  n.host = o.host || j.host;
}, u = () => e;
export {
  l as configureJposta,
  f as getAddress,
  u as getPrefs
};

const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const menu = require("./lib/menu.js");
const donate = require("./lib/donate.js");
const info = require("./lib/info.js");
//
const BotName = 'OMEGA BOT'; // Nama Bot Whatsapp
const instagramlu = 'instagram.com/omegabarbar'; // Nama Instagramlu cok
const whatsapplu = 'wa.me/62895605971726'; // Nomor whatsapplu cok
const kapanbotaktif = 'Di Usahakan 24 Jam'; // Kapan bot lu aktif
const grupch1 = 'Segera'; // OFFICIAL GRUP LU 1
const grupch2 = 'Segera'; // OFFICIAL GRUP LU 2
//
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr mu!`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @omegabarbar`))
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @omegabarbar`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


// Groups

if (text.includes("!buatgrup"))
   {
var nama = text.split("!buatgrup")[1].split("-nomor")[0];
var nom = text.split("-nomor")[1];
var numArray = nom.split(",");
for ( var i = 0; i < numArray.length; i++ ) {
    numArray[i] = numArray[i] +"@s.whatsapp.net";
}
var str = numArray.join("");
console.log(str)
const group = await conn.groupCreate (nama, str)
console.log ("Grup telah dibuat dengan id: " + group.gid)
conn.sendMessage(group.gid, "Halo semua!!!", MessageType.extendedText) // say hello to everyone on the group
}

// FF
if(text.includes("!cek")){
var num = text.replace(/!cek/ , "")
var idn = num.replace("0","+62");

console.log(id);
const gg = idn+'@s.whatsapp.net'

const exists = await conn.isOnWhatsApp (gg)
console.log(exists);
conn.sendMessage(id ,`${gg} ${exists ? " exists " : " does not exist"} on WhatsApp`, MessageType.text)
}

if (text.includes("!tts")){
const teks = text.replace(/!tts /, "")
const gtts = (`https://rest.farzain.com/api/tts.php?id=${teks}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
    conn.sendMessage(id, gtts ,MessageType.text);
}

if (text.includes("!say")){
  const teks = text.replace(/!say /, "")
conn.sendMessage(id, teks, MessageType.text);
}

if (text.includes("!spamcall")){
conn.sendMessage(id,'[ ! ] Perintah ini hanya khusus owner OMEGA BOT', MessageType.text);
}

if (text.includes('!nulis')){
  var teks = text.replace(/!nulis /, '')
    axios.get('https://bangandre.herokuapp.com/nulis?teks='+teks)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[WAIT]...❗', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes("!ytmp3")){
const teks = text.replace(/!ytmp3 /, "")
axios.get(`https://alfians-api.herokuapp.com/api/yta?url=${teks}`).then((res) => {
    let hasil = `Judul : ${res.data.title}\nSize: ${res.data.filesize}\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!cerpen")){
const teks = text.replace(/!cerpen /, "")
                 axios.get(`https://arugaz.herokuapp.com/api/cerpen`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!puisi1")){
const teks = text.replace(/!puisi1 /, "")
                 axios.get(`https://arugaz.herokuapp.com/api/puisi1`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!puisi3")){
const teks = text.replace(/!puisi3 /, "")
                 axios.get(`https://arugaz.herokuapp.com/api/puisi3`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!quotes")){
const teks = text.replace(/!quotes /, "")
                 axios.get(`https://arugaz.herokuapp.com/api/randomquotes`).then((res) =>{
let hasil = `${res.data.quotes} \n\n _*${res.data.author}*_`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!infogempa")){
  const teks = text.replace(/!infogempa /, "")
  axios.get(`https://arugaz.herokuapp.com/api/infogempa`).then ((res) =>{
  conn.sendMessage(id, '[WAIT]...⏳', MessageType.text)
  let hasil = ` *INFO GEMPA* \n\ *Lokasi* : _${res.data.lokasi}_ \n *Kedalaman* : _${res.data.kedalaman}_ \n *Koordinat* : _${res.data.koordinat}_ \n *Magnitude* : _${res.data.magnitude}_ \n *Map* : _${res.data.map}_ \n *Potensi* : _${res.data.potensi}_ \n *Waktu* : _${res.data.waktu}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!nama")){
  const teks = text.replace(/!nama /, "")
  axios.get(`https://arugaz.herokuapp.com/api/artinama?nama=${teks}`).then ((res) =>{
  let hasil = `*Arti Nama ${teks}* \n\n ${res.data.result}`;
  conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("Buaya")){

let err = fs.readFileSync('png/' + 'buaya' + '.webp')

 conn.sendMessage(id, err, MessageType.sticker, { quoted: m })

 }
 
if (text.includes("!chord")){
const teks = text.replace(/!chord /, "")
axios.get(`https://arugaz.herokuapp.com/api/chord?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Searching...⏳', MessageType.text)
    let hasil = `*Chord Lagu ${teks}* \n\nCord: _${res.data.result}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}


if (text.includes("!tiktok")) {
const tictoc = text.replace(/!tiktok /, "")
axios.get(`https://st4rz.herokuapp.com/api/tiktok?url=${tictoc}`).then((res) => {
     let titoe = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\n\nJudul: ${res.data.deskripsi} \n\nDurasi: ${res.data.durasi}\n\nNama: ${res.data.nama}\n\nUrl: ${res.data.urlvideo}`;
conn.sendMessage(id, titoe, MessageType.text);
})
}

if (text.includes("!yt")){
const teks = text.replace(/!yt /, "")
axios.get(`https://alfians-api.herokuapp.com/api/ytv?url=${teks}`).then((res) => {
    let hasil = `Judul : ${res.data.title}\nResolusi : ${res.data.resolution}\nSize: ${res.data.filesize}\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m });
})
}

if (text.includes("!fb")){
const teks = text.replace(/!fb /, "")
axios.get(`https://arugaz.herokuapp.com/api/fb?url=${teks}`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nJudul: ${res.data.title}\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
if (text.includes("!igstalk")){
const teks = text.replace(/!igstalk /, "")
axios.get(`https://alfians-api.herokuapp.com/api/stalk?username=${teks}`).then ((res) =>{
let hasil = `_*STALK IG*_\n*➸Username* : ${res.data.Username}\n*➸Nama* : ${res.data.Name}\n*➸Follower* : ${res.data.Jumlah_Followers}\n*➸Followed* : ${res.data.Jumlah_Following}\n*➸Jumlah_Postingan* : ${res.data.Jumlah_Post}\n*➸Biodata* : ${res.data.Biodata}\n*_________________________________________*\n\n*➸Profile* : ${res.data.Profile_pic}`;
conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!cuaca ")){
const teks = text.replace(/!cuaca /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/cuaca?q=${teks}&apiKey=IsDssiTLL9hE7ofCV1Ot`).then ((res) =>{
conn.sendMessage(id, `Permintaan anda sedang di proses, ditunggu aja gan.` ,MessageType.text)
let hasil =`➸Tempat : ${res.data.result.tempat}\n\n➸Angin : ${res.data.result.angin}\n➸Cuaca : ${res.data.result.cuaca}\n➸Deskripsi : ${res.data.result.desk}\n➸Kelembapan : ${res.data.result.kelembapan}\n➸Suhu : ${res.data.result.suhu}\n➸Udara : ${res.data.result.udara}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!fakta")){
const fetch = require("node-fetch");
fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-fakta-unik.txt').then(res =>                             res.text()).then(body => {
  let brpr = body.split("\n");
  let hgq = brpr[Math.floor(Math.random() * brpr.length)];
  conn.sendMessage(id, hgq , MessageType.text);
  });
}

if (text.includes("!bapakfont")){
const teks = text.replace(/!bapakfont /, "")
axios.get(`https://arugaz.herokuapp.com/api/bapakfont?kata=${teks}`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!seberapagay")){
const teks = text.replace(/!seberapagay /, "")
axios.get(`https://arugaz.herokuapp.com/api/howgay`).then((res) =>{
let hasil = `Pertanyaan :seberapagay ${teks}\n\n*➸Jawaban* : ${res.data.persen}%`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!simi")){
const teks = text.replace(/!simi /, "")
axios.get(`https://arugaz.herokuapp.com/api/simisimi?kata=${teks}&apikey=ArdT5hFBplW97AOn5CGwDlYGUGbDaH1o-EncrMrI`).then((res) =>{
let hasil = `[!] Fitur ini hanya khusus owner`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!sim")){
const teks = text.replace(/!sim /, "")
axios.get(`https://arugaz.herokuapp.com/api/simisimi?kata=${teks}&apikey=KbrUW2zN8o3KOnWflNFla3S~QULSz22cVA5AOxYG`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!jadwaltvnow")){
const teks = text.replace(/!jadwaltvnow /, "")
axios.get(`https://api.haipbis.xyz/jadwaltvnow`).then((res) =>{
let hasil = `*JAM* : ${res.data.jam}\n*JadwalTV* :\n*______________________________________________________* \n${res.data.jadwalTV}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!bitly")){
const teks = text.replace(/!bitly /, "")
axios.get(`https://api.haipbis.xyz/bitly?url=${teks}`).then((res) => {
let hasil = `*Hasil* : ${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!spamcaIl")){
const teks = text.replace(/!spamcaIl /, "")
axios.get(`https://arugaz.herokuapp.com/api/spamcall?no=${teks}`).then((res) =>{
let hasil = `*➸Status* : ${res.data.logs}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!spamsms")){
const teks = text.replace(/!spamsms /, "")
axios.get(`https://arugaz.herokuapp.com/api/spamsms?no=${teks}&jum=10`).then((res) =>{
let hasil = `*➸Status* : ${res.data.logs}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!spamgmail")){
const teks = text.replace(/!spamgmail /, "")
axios.get(`https://arugaz.herokuapp.com/api/spamgmail?target=${teks}&jum=3`).then((res) =>{
let hasil = `*➸Status* : ${res.data.logs}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!covidcountry")){
const teks = text.replace(/!Covidcountry /, "")
axios.get(`https://arugaz.herokuapp.com/api/corona?country=${teks}`).then((res) =>{
let hasil = `*➸Country* : ${res.data.result.country}\n\n*➸Active* : ${res.data.result.active}\n*➸Critical* : ${res.data.result.critical}\n*➸Recovered* : ${res.data.result.recovered}\n*➸Today Cases* : ${res.data.result.todayCases}\n*➸Today Death* : ${res.data.result.todayDeath}\n*➸Total Cases* : ${res.data.result.totalCases}\n*➸Total Death* : ${res.data.result.totalDeath}\n*➸Total Test* : ${res.data.result.totalTest}\n*➸Test PerOne Milion* : ${res.data.result.testPerOneMillion}\n*➸Deaths Per One Milion* : ${res.data.result.deathsPerOneMillion}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!zodiak")){
const teks = text.replace(/!zodiak /, "")
axios.get(`https://arugaz.herokuapp.com/api/getzodiak?nama=aruga&tgl-bln-thn=${teks}`).then((res) => {
let hasil = `*Lahir* : ${res.data.lahir}\n*Ulang Tahun* : ${res.data.ultah}\n*Usia* : ${res.data.usia}\n*Zodiak* : ${res.data.zodiak}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!textimage")){
const teks = text.replace(/!textimage /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/text2image?text=${teks}&apiKey=IsDssiTLL9hE7ofCV1Ot`).then((res) => {
let hasil = `Teks image telah tersedia klik link dibawah\n\n*HASIL* : ${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!seberapabucin")){     
const teks = text.replace(/!seberapabucin /, "")
axios.get(`https://arugaz.herokuapp.com/api/howbucins`).then((res) =>{
let hasil = `*➸Persen* : ${res.data.persen}%\n*➸Deskripsi* : ${res.data.desc}`
conn.sendMessage(id, hasil, MessageType.text); 
})
}

if (text.includes("!ig")){
const teks = text.replace(/!ig /, "")
axios.get(`https://st4rz.herokuapp.com/api/ig?url=${teks}`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!twt")){
const teks = text.replace(/!twt /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nJudul: ${res.data.title}\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!wiki")){
const teks = text.replace(/!wiki /, "")
axios.get(`https://arugaz.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
    let hasil = `Menurut Wikipedia:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!wikiEn")){
const teks = text.replace(/!wikiEn/, "")
axios.get(`https://arugaz.herokuapp.com/api/wikien?q=${teks}`).then((res) => {
    let hasil = `According to Wikipedia:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!namaninja")){
const teks = text.replace(/!namaninja /, "")
axios.get(`https://api.terhambar.com/ninja?nama=${teks}`).then((res) => {
    let hasil = `Nama Ninja:\n\n ${res.data.result.ninja}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!sholat")){
  const teks = text.replace(/!sholat /, "")
  axios.get(`https://mhankbarbar.herokuapp.com/api/jadwalshalat?daerah=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then ((res) =>{
  let hasil = `*Jadwal Sholat di ${teks} Hari Ini :*\n\n┌   *Imsyak :* _${res.data.Imsyak} WIB_\n├   *Subuh :* _${res.data.Subuh} WIB_\n├   *Dzuhur :* _${res.data.Dzuhur} WIB_\n├   *Ashar :* _${res.data.Ashar} WIB_\n├   *Maghrib :* _${res.data.Maghrib} WIB_\n├   *Isya :* _${res.data.Isya} WIB_\n└   *Tengah malam :* _${res.data.Dhuha} WIB_`;
  conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text == '!help'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
if (text == '!menu'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '!quran'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
else if (text == 'assalamualaikum'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == '@OMEGA BOT'){
conn.sendMessage(id, 'ada apa ngetag?' ,MessageType.text);
}
else if (text == 'salam'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'asalamualaikum'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'Assalamualaikum'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'p'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'P'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'halo'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'hai'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'woi'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'woy'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == '#help'){
conn.sendMessage(id, 'command tidak tersedia, ketik !menu untuk menampilkan menu' ,MessageType.text);
}
else if (text == 'Kontol'){
conn.sendMessage(id, 'Kata kasar Terdeteksi❗ Jangan bilang kasar bro ntar pacar nya gak suka dan besok nya putus terus pacaran deh sama aku xixixi' ,MessageType.text);
}
else if (text == 'hi'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'gan'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'sis'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'Ajg'){
conn.sendMessage(id, 'KASAR GOBLOK' ,MessageType.text);
}
else if (text == 'Anjing'){
conn.sendMessage(id, 'Kata kasar Terdeteksi❗ Jangan bilang kasar bro ntar pacar nya gak suka dan besok nya putus terus pacaran deh sama aku xixixi' ,MessageType.text);
}
else if (text == 'anjing'){
conn.sendMessage(id, 'Kata kasar Terdeteksi❗ Jangan bilang kasar bro ntar pacar nya gak suka dan besok nya putus terus pacaran deh sama aku xixixi' ,MessageType.text);
}
else if (text == 'i love you'){
conn.sendMessage(id, 'love you too besok aku tunggu ya di depan rumah kamu ntar aku bawain martabak buat keluarga kamu' ,MessageType.text);
}
else if (text == 'mas'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'Bangsat'){
conn.sendMessage(id, 'Kata kasar Terdeteksi❗ Jangan bilang kasar bro ntar pacar nya gak suka dan besok nya putus terus pacaran deh sama aku xixixi' ,MessageType.text);
}
else if (text == 'bre'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik !help' ,MessageType.text);
}
else if (text == 'Asw'){
conn.sendMessage(id, 'Kata kasar Terdeteksi❗ Jangan bilang kasar bro ntar pacar nya gak suka dan besok nya putus terus pacaran deh sama aku xixixi' ,MessageType.text);
}
else if (text == 'Asu'){
conn.sendMessage(id, 'Kata kasar Terdeteksi❗ Jangan bilang kasar bro ntar pacar nya gak suka dan besok nya putus terus pacaran deh sama aku xixixi' ,MessageType.text);
}
else if (text == 'makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == `!hentai`){
conn.sendMessage(id , `*Selamat datang Di fitur hentai*\n\n*-------------------------------------------------*\n ⃝⃔Nekopoi\nhttp://nekopoi.care\n\n ⃝⃔Animeidhentai\nhttp://animeidhentai.com\n\n ⃝⃔kisshentai\nhttp://kisshentai.com\n\n ⃝⃔h-anime\nhttp://h-anime.com\n\n ⃝⃔Hentaipulse\nhttp://hentaipulse.com\n\n ⃝⃔hentaimama\nhttp://hentaimama.com\n\n ⃝⃔miniopai\nhttp://minioppai.org\n\n ⃝⃔yandex\nhttps://yandex.com\n\nJika Mau Memakai salah satu website silahkan Gunakan *VPN* terlebih dahulu` ,MessageType.text)
conn.sendMessage(id, `*Ingat Dosa Lu Udah Banyak Jangan Nambah Lagi Ingat Kiamat Sudah Dekat Gan*` ,MessageType.text);
}
else if (text == 'makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'thank'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Thank'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == '!donate'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '!donasi'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '!DONATE'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '!DONASI'){
  const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '!info'){
  const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, info.info(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '!ptl'){
conn.sendMessage(id, 'kirim !ptl cewek/cowok\n\nContoh: !ptl cewek' ,MessageType.text);
}

  // Optical Character Recognition
  if (messageType == 'imageMessage')
   {
       let caption = imageMessage.caption.toLocaleLowerCase()
       if (caption == '!ocr')
       {
           const img = await conn.downloadAndSaveMediaMessage(m)
           readTextInImage(img)
               .then(data => {
                   console.log(data)
                   conn.sendMessage(id, `*Read Data Text in Image* \n\nHasil: \n\n${data}`, MessageType.text);
               })
               .catch(err => {
                   console.log(err)
               })
       }
   }

   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '!sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }

   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '!stiker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }

   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '!pantun')
      {

         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text)
            });
      }

   }
     if (text.includes("!yt"))
   {
      const url = text.replace(/!yt/, "");
      const exec = require('child_process').exec;

      var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

      const ytdl = require("ytdl-core")
      if (videoid != null)
      {
         console.log("video id = ", videoid[1]);
      }
      else
      {
         conn.sendMessage(id, "gavalid", MessageType.text)
      }
      ytdl.getInfo(videoid[1]).then(info =>
      {
         if (info.length_seconds > 1000)
         {
            conn.sendMessage(id, " videonya kepanjangan", MessageType.text)
         }
         else
         {

            console.log(info.length_seconds)

            function os_func()
            {
               this.execCommand = function (cmd)
               {
                  return new Promise((resolve, reject) =>
                  {
                     exec(cmd, (error, stdout, stderr) =>
                     {
                        if (error)
                        {
                           reject(error);
                           return;
                        }
                        resolve(stdout)
                     });
                  })
               }
            }
            var os = new os_func();

            os.execCommand('ytdl ' + url + ' -q highest -o mp4/' + videoid[1] + '.mp4').then(res =>
            {
		const buffer = fs.readFileSync("mp4/"+ videoid[1] +".mp4")
               conn.sendMessage(id, buffer, MessageType.video)
            }).catch(err =>
            {
               console.log("os >>>", err);
            })

         }
      });

   }

   if (text.includes("!quo.tes"))
   {
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
            let $ = cheerio.load(result.data);
            var author = $('a[class="auteurfbnaam"]').contents().first().text();
            var kata = $('q[class="fbquote"]').contents().first().text();

            conn.sendMessage(
               id,
               `
     _${kata}_
        
    
	*~${author}*
         `, MessageType.text
            );

         });
   }

   if (text.includes("!randomhentai"))
   {
    var items = ["nsfwneko","anime hentai"];
    var anim = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.vhtear.com/randomhentai?apikey=PREMIUMKEY";
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var anim =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(anim) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }


   if (text.includes("!loli"))
   {
    var items = ["anime loli","anime loli sange","anime loli fackgirll","anime loli i love you"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

if (text.includes("!pokemon"))
   {
    var items = ["anime pokemon"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }


  else if (text.includes("!pasangan ")) {
    const request = require('request');
    var gh = text.split("!pasangan ")[1];
    var namamu = gh.split("&")[0];
    var pasangan = gh.split("&")[1];
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+',

    },function(error, response, body){
        let $ = cheerio.load(body);
      var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
        var t = y.split('.<br><br>')[1];
        var f = y.replace(t ," ");
        var x = f.replace(/<br\s*[\/]?>/gi, "\n");
        var h  = x.replace(/<[^>]*>?/gm, '');
        var d = h.replace("&amp;", '&')
      console.log(""+ d);
      conn.sendMessage(id, `

************************************

 *Kecocokan berdasarkan nama*


 ${d}

************************************
    `, MessageType.text);
  });
  }
   if (text.includes("!ptl cewek"))
   {
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

   if (text.includes("!ptl cowok"))
   {
    var items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
  var buf = Buffer.from(response, 'base64'); // Ta-da 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

if (text.includes("!randomanime"))
   {
    var items = ["anime girl", "anime cantik", "anime", "anime aesthetic"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

  if (text.includes("!scdl")){
const fs = require("fs");
const scdl = require("./lib/scdl");
scdl.setClientID("iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX");
scdl("https://m.soundcloud.com/abdul-muttaqin-701361735/lucid-dreams-gustixa-ft-vict-molina")
    .pipe(fs.createWriteStream("mp3/song.mp3"));
}
 else if (text.includes("!tts")) {
  var teks = text.split("!ttsid ")[1];
  var path = require('path');
  var text1 = teks.slice(6);
  text1 = suara;
  var suara = text.replace(/!ttsid/g, text1);
  var filepath = 'mp3/bacot.wav';
  
  
/*
 * save audio file
 */

  gtts.save(filepath, suara, function() {
  console.log(`${filepath} MP3 SAVED!`)
});
await new Promise(resolve => setTimeout(resolve, 500));

	if(suara.length > 200){ // check longness of text, because otherways google translate will give me a empty file
  msg.reply("Text kepanjangan bro!")
}else{
const buffer = fs.readFileSync(filepath)
	conn.sendMessage(id , buffer , MessageType.audio);
};
}
if (text.includes("!lirik")){
	const teks = text.split("!lirik")[1]
	axios.get(`https://arugaz.herokuapp.com/api/lirik?judul=${teks}`).then ((res) => {
	 	let hasil = `Lirik Lagu${teks}\n\n\n ${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text)
	})
}
if (text.includes("!sfilm")){
	const teks = text.split("!sfilm")[1]
	axios.get(`https://arugaz.herokuapp.com/api/sdmovie?film=${teks}`).then ((res) => {
	 	let hasil = `Judul : ${res.data.result.title}\n Sinopsis : ${res.data.result.sinopsis}\n Rating : ${res.data.result.rating}\n Video : ${res.data.result.video}\n`
	conn.sendMessage(id, hasil, MessageType.text)
	})
}
if (text.includes("!cinema21comingsoon")){
const teks = text.replace(/!cinema21comingsoon /, "")
axios.get(`https://api.haipbis.xyz/cinema21/comingsoon`).then((res) =>{
let hasil = `*Judul :* ${res.data.title} \n *Dimensi :* ${res.data.dimensi} \n *Rating :* ${res.data.rating} \n *Sinopsis :* ${res.data.sinopsis} \n *Produser :* ${res.data.producer} \n *Director :* ${res.data.director} \n *Penulis :* ${res.data.writer} \n *Pemeran :* ${res.data.cast} /n/n *Link :* ${res.data.link}` 
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("!alay")){
	const alay = text.split("!alay")[1]
	axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then ((res) =>
		{ let hasil = `${res.data.text}`
		conn.sendMessage(id, hasil, MessageType.text)
	})
}



   // end of file


})

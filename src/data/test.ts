export type Correction = {
  correct: string[];
  explanation: string;
};

export type Sample = {
  original: string;
  corrections: {
    [index: number]: Correction;
  };
};

export type Difficulty = "mudah" | "menengah" | "sulit" | "challenge";

export const sampleBank: Record<Difficulty, Sample[]> = {
  mudah: [
    {
      original:
        "Keluarga kami pergi ke danau minggu lalu untuk berpiknik. Kami membawa makanan ringan, tikar dan bola untuk bermain. Saat tiba disana, kami mencari tempat yang nyaman dekat air. Ayah menyiapkan peralatan sementara ibu menghamparkan tikar. adik saya langsung berlarian ke arah danau dengan semangat.",

      corrections: {
        5: {
          correct: ["Minggu"],
          explanation:
            "Kata 'minggu' dalam kalimat ini merujuk pada 'nama hari', yaitu 'hari Minggu', bukan satuan waktu. Menurut PUEBI, nama hari dan bulan harus diawali dengan huruf kapital. Oleh karena itu, penulisan yang benar adalah 'Minggu lalu', bukan 'minggu lalu'.",
        },
        20: {
          correct: ["di", "sana"],
          explanation:
            "Kata 'disana' salah karena menggabungkan kata depan 'di' dan kata keterangan tempat 'sana'. Menurut PUEBI, jika 'di' berfungsi sebagai kata depan (penunjuk tempat), maka harus ditulis terpisah dari kata yang mengikutinya. Penulisan yang benar adalah 'di sana'.",
        },
        32: {
          correct: ["Ibu"],
          explanation:
            "Kata 'Ibu' harus diawali huruf kapital karena berfungsi sebagai sapaan atau pengganti nama orang tua, bukan sebagai kata umum. Sesuai PUEBI, sapaan seperti 'Ibu', 'Ayah', dan 'Adik' ditulis dengan huruf besar jika merujuk pada orang tertentu.",
        },
        35: {
          correct: ["Adik"],
          explanation:
            "Kata 'adik' berada di awal kalimat dan merujuk pada 'anggota keluarga tertentu' yang sedang dibicarakan. Pertama, menurut PUEBI, **setiap kalimat harus dimulai dengan huruf kapital**. Kedua, karena 'Adik' juga digunakan sebagai sapaan atau pengganti nama, maka penulisannya memang harus diawali dengan huruf kapital. Penulisan yang tepat adalah: 'Adik saya langsung berlarian...'",
        },
      },
    },
    {
      original:
        "pagi ini sekolah kami mengadakan upacara bendera untuk memperingati hari kemerdekaan. Semua siswa berkumpul dilapangan dengan memakai seragam lengkap. Kepala sekolah memberikan pidato tentang pentingnya cintah tanah air. Setelah itu, para siswa di arahkan untuk mengikuti lomba-lomba yang telah disiapkan panitia",

      corrections: {
        0: {
          correct: ["Pagi"],
          explanation:
            "Kalimat awal harus dimulai dengan huruf kapital. 'pagi ini...' seharusnya ditulis 'Pagi ini...'. Menurut PUEBI, huruf kapital digunakan sebagai huruf pertama kalimat.",
        },
        14: {
          correct: ["di", "lapangan"],
          explanation:
            "'Dilapangan' salah karena menggabungkan kata depan 'di' dan kata benda 'lapangan'. Kata depan 'di' harus **dipisahkan** dari kata yang mengikutinya jika menunjukkan tempat, sesuai PUEBI.",
        },
        25: {
          correct: ["cinta"],
          explanation:
            "Penulisan 'cintah' salah eja. Bentuk baku menurut KBBI adalah 'cinta', tanpa huruf 'h' di akhir.",
        },
        32: {
          correct: ["diarahkan"],
          explanation:
            "Penulisan 'di arahkan' salah karena **kata kerja pasif** yang menggunakan awalan 'di-' harus ditulis **serangkai** jika bukan kata depan. Karena 'diarahkan' adalah bentuk verba pasif, penulisan yang benar adalah satu kata.",
        },
        33: {
          correct: [""],
          explanation:
            "Penulisan 'di arahkan' salah karena **kata kerja pasif** yang menggunakan awalan 'di-' harus ditulis **serangkai** jika bukan kata depan. Karena 'diarahkan' adalah bentuk verba pasif, penulisan yang benar adalah satu kata.",
        },
        40: {
          correct: ["panitia."],
          explanation:
            "Kalimat terakhir tidak diakhiri tanda baca. Semua kalimat **harus diakhiri tanda titik (.)**, tanda tanya (?), atau tanda seru (!) sesuai konteks. Tambahkan titik setelah 'panitia'.",
        },
      },
    },
    {
      original:
        "pada saat liburan sekolah kemarin, kami pergi kerumah nenek dikampung. kami sangat senang karena bisa bermain dan membatu nenek memasak. selain itu, kami juga belajar mengenal tumbuhan dan hewan di sekitar rumahnya. Sepulang dari sana, kami merasa lelah, tetapi bahagia.",

      corrections: {
        0: {
          correct: ["Pada"],
          explanation:
            "Awal kalimat harus menggunakan huruf kapital, sesuai dengan kaidah PUEBI: 'Huruf kapital dipakai sebagai huruf pertama kata pada awal kalimat.' Oleh karena itu, 'pada saat liburan...' harus ditulis sebagai 'Pada saat liburan...'",
        },
        7: {
          correct: ["ke", "rumah"],
          explanation:
            "Gabungan kata 'kerumah' salah karena 'ke' di sini adalah kata depan yang menunjukkan arah atau tempat. Menurut PUEBI, kata depan seperti 'ke', 'di', 'dari' harus ditulis terpisah dari kata benda yang mengikutinya. Jadi, penulisan yang benar adalah 'ke rumah'.",
        },
        9: {
          correct: ["di", "kampung"],
          explanation:
            "Sama seperti 'ke rumah', kata 'dikampung' salah penulisan karena 'di' adalah kata depan lokasi. Kata depan harus dipisah dari kata yang mengikutinya. Maka bentuk bakunya adalah 'di kampung'.",
        },
        10: {
          correct: ["Kami"],
          explanation:
            "Kata 'kami' muncul setelah titik dan mengawali kalimat baru, sehingga harus diawali dengan huruf kapital. Ini mengikuti aturan PUEBI",
        },
        17: {
          correct: ["membantu"],
          explanation:
            "'membatu' adalah bentuk yang salah eja dari 'membantu'. Menurut KBBI, 'membatu' berarti menjadi keras seperti batu, sedangkan maksud kalimat ini adalah menolong nenek memasak. Maka, kata yang benar adalah 'membantu'.",
        },
      },
    },
  ],

  //// Level menengah ////

  menengah: [
    {
      original:
        "Dalam rangka memperingati hari bumi, sekolah kami mengadakan kegiatan bersih-bersih lingkungan dan menanam pohon. seluruh siswa diminta membawakantumbuhan yang akan ditanam disekitar halaman sekolah. sebagian dari mereka membelikan bibit di toko tanaman, sementara yang lain membawanya dari rumah masing-masing. kegiatan ini bertujuan untuk menumbuhkan kepedulian terhadap lingkungan sejak dini. guru-guru juga menyiapkan materi edukasi tentang dampak kerusakan alam dan cara-cara mencegahnya.",
      corrections: {
        "4": {
          correct: ["Bumi,"],
          explanation:
            "Istilah 'Hari Bumi' adalah nama peringatan resmi, sehingga menurut PUEBI Bab II Pasal 1.c, setiap unsur nama peristiwa resmi ditulis dengan huruf kapital.",
        },
        "14": {
          correct: ["Seluruh"],
          explanation:
            "'Seluruh' berada di awal kalimat setelah titik, sehingga harus diawali huruf kapital.",
        },
        "17": {
          correct: ["membawakan", "tumbuhan"],
          explanation:
            "'membawakantumbuhan' tidak memiliki spasi. Harus ditulis sebagai dua kata yang tepat: 'membawakan tumbuhan'. Ini termasuk kesalahan spasi dan ejaan.",
        },
        "21": {
          correct: ["di", "sekitar"],
          explanation:
            "'disekitar' salah karena 'di' sebagai kata depan harus dipisah dari kata benda yang mengikutinya. Penulisan benar: 'di sekitar'.",
        },
        "24": {
          correct: ["Sebagian"],
          explanation:
            "'Sebagian' berada di awal kalimat baru setelah titik, maka harus ditulis dengan huruf kapital.",
        },
        "27": {
          correct: ["membeli"],
          explanation:
            "'membelikan' kurang tepat secara makna karena kata tersebut biasanya berarti 'membeli untuk orang lain'. Dalam konteks ini, siswa membeli untuk diri sendiri. Maka kata yang tepat adalah 'membeli'.",
        },
        "49": {
          correct: ["Guru-guru"],
          explanation:
            "'guru-guru' berada di awal kalimat setelah titik. Maka harus ditulis 'Guru-guru' dengan huruf kapital.",
        },
        "53": {
          correct: ["edukatif"],
          explanation:
            "'materi edukasi' sebenarnya tidak baku dalam Bahasa Indonesia. Kata yang tepat dan sesuai KBBI adalah 'materi edukatif' untuk menjelaskan materi bersifat pendidikan.",
        },
      },
    },
  ],

  //// Level suli ////

  sulit: [],
  challenge: [],
};
